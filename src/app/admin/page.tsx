'use client';

import * as React from 'react';
import { addDays, format, startOfDay, endOfDay, formatISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, Eye } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import Image from 'next/image';
import { collection, onSnapshot, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';


const chartConfig = {
  clicks: {
    label: 'Cliques',
  },
  whatsapp: {
    label: 'WhatsApp',
    color: 'hsl(var(--chart-1))',
  },
  instagram: {
    label: 'Instagram',
    color: 'hsl(var(--chart-2))',
  },
  tiktok: {
    label: 'TikTok',
    color: 'hsl(var(--chart-3))',
  },
  youtube: {
    label: 'YouTube',
    color: 'hsl(var(--chart-4))',
  },
  discord: {
    label: 'Discord',
    color: 'hsl(var(--chart-5))',
  },
  'gerente-inteligente': {
    label: 'Gerente Inteligente',
    color: 'hsl(var(--chart-1))',
  },
  'gerente-inteligente-ia': {
    label: 'Gerente Inteligente IA',
    color: 'hsl(var(--chart-2))',
  },
  'lucrando-lci': {
    label: 'Lucrando com Influenciadores',
    color: 'hsl(var(--chart-3))',
  },
  'deposito-aguas-brancas': {
    label: 'Depósito Águas Brancas',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
    <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

type Click = {
  id: string;
  linkId: string;
  createdAt: Timestamp;
};

type Visit = {
    id: string;
    createdAt: Timestamp;
};

type ChartDataPoint = {
  date: string;
  [key: string]: any;
};

export default function AdminDashboard() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const [allVisits, setAllVisits] = React.useState<Visit[]>([]);
  const [allClicks, setAllClicks] = React.useState<Click[]>([]);
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);

  // Effect to fetch visits and clicks from Firestore
  React.useEffect(() => {
    try {
      const fromDate = date?.from ? startOfDay(date.from) : undefined;
      const toDate = date?.to ? endOfDay(date.to) : undefined;

      // Fetch Visits
      const visitsQuery = fromDate
        ? query(collection(db, 'visits'), where('createdAt', '>=', fromDate), where('createdAt', '<=', toDate || new Date()))
        : query(collection(db, 'visits'), orderBy('createdAt', 'desc'));
      
      const unsubscribeVisits = onSnapshot(visitsQuery, (snapshot) => {
        const visitsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Visit));
        setAllVisits(visitsData);
      }, (error) => {
        console.error("Failed to fetch visits:", error);
      });

      // Fetch Clicks
      const clicksQuery = fromDate
        ? query(collection(db, 'clicks'), where('createdAt', '>=', fromDate), where('createdAt', '<=', toDate || new Date()))
        : query(collection(db, 'clicks'), orderBy('createdAt', 'desc'));

      const unsubscribeClicks = onSnapshot(clicksQuery, (snapshot) => {
        const clicksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Click));
        setAllClicks(clicksData);
      }, (error) => {
        console.error("Failed to fetch clicks:", error);
      });

      return () => {
        unsubscribeVisits();
        unsubscribeClicks();
      };
    } catch (error) {
      console.error("Error setting up Firestore listener:", error);
    }
  }, [date]);

  // Process data for charts
  React.useEffect(() => {
    const dataByDate: { [date: string]: ChartDataPoint } = {};

    allClicks.forEach(click => {
        if (click.createdAt) {
            const clickDate = formatISO(click.createdAt.toDate(), { representation: 'date' });
            if (!dataByDate[clickDate]) {
                dataByDate[clickDate] = { date: clickDate };
            }
            if (!dataByDate[clickDate][click.linkId]) {
                dataByDate[clickDate][click.linkId] = 0;
            }
            dataByDate[clickDate][click.linkId]++;
        }
    });

    const sortedData = Object.values(dataByDate).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setChartData(sortedData);

  }, [allClicks]);

  const ClicksChart = ({ data, title, description, dataKeys }: { data: any[], title: string, description: string, dataKeys: string[] }) => {
    const chartId = React.useId().replace(/:/g, '');

    return (
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-gray-400">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart data={data} accessibilityLayer>
              <defs>
                 {Object.keys(chartConfig).map((key) => {
                    const color = chartConfig[key as keyof typeof chartConfig]?.color;
                    if (color) {
                       return (
                         <linearGradient key={key} id={`${chartId}-${key}`} x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                           <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                         </linearGradient>
                       );
                    }
                    return null;
                 })}
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                stroke="rgba(255,255,255,0.7)"
                tickFormatter={(value) => format(new Date(value), 'dd/MM', { timeZone: 'UTC' })}
              />
              <YAxis stroke="rgba(255,255,255,0.7)" hide />
              <ChartTooltip content={<ChartTooltipContent className="bg-black/80 backdrop-blur-md border-white/10 text-white" />} />
              {dataKeys.map((key) => {
                 const color = chartConfig[key as keyof typeof chartConfig]?.color;
                 return (
                    <Area
                      key={key}
                      dataKey={key}
                      type="monotone"
                      stroke={color}
                      fill={`url(#${chartId}-${key})`}
                      strokeWidth={2}
                      dot={false}
                      stackId="1"
                    />
                 )
              })}
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="dark flex min-h-screen w-full flex-col text-white">
       <Image
        src="https://i.imgur.com/KKZfDtk.jpeg"
        alt="Fundo"
        fill
        className="object-cover -z-10 brightness-50"
        data-ai-hint="abstract background"
      />
      <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Dashboard de Cliques</h1>
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-[300px] justify-start text-left font-normal bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white hover:text-white',
                    !date && 'text-gray-400'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'PPP', { locale: ptBR })} -{' '}
                        {format(date.to, 'PPP', { locale: ptBR })}
                      </>
                    ) : (
                      format(date.from, 'PPP', { locale: ptBR })
                    )
                  ) : (
                    <span>Escolha um período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl text-white" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  locale={ptBR}
                  className="bg-transparent"
                  classNames={{
                    day: "text-white hover:bg-white/10",
                    day_selected: "bg-purple-600 text-white hover:bg-purple-700",
                    day_today: "bg-white/20 text-white",
                    day_outside: "text-white/40",
                    head_cell: "text-white/60",
                    nav_button: "text-white hover:bg-white/10",
                    caption_label: "text-white",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Visitas no Período" value={allVisits.length} icon={<Eye className="h-4 w-4 text-purple-400" />} />
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
           <ClicksChart 
             data={chartData}
             title="Cliques nas Redes Sociais"
             description="Total de cliques por dia nos links de redes sociais."
             dataKeys={['whatsapp', 'instagram', 'tiktok', 'youtube', 'discord']}
           />
           <ClicksChart 
             data={chartData}
             title="Cliques nos Projetos"
             description="Total de cliques por dia nos links dos projetos."
             dataKeys={['gerente-inteligente', 'gerente-inteligente-ia', 'lucrando-lci', 'deposito-aguas-brancas']}
           />
        </div>
      </main>
    </div>
  );
}

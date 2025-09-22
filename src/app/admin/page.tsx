'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import Image from 'next/image';

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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

// Mock data - replace with your actual data fetching logic
const mockData = [
  { date: '2024-07-01', whatsapp: 12, instagram: 20, 'gerente-inteligente': 8 },
  { date: '2024-07-02', whatsapp: 15, instagram: 25, 'lucrando-lci': 10 },
  { date: '2024-07-03', whatsapp: 8, tiktok: 30, 'deposito-aguas-brancas': 5 },
  { date: '2024-07-04', instagram: 22, youtube: 18, 'gerente-inteligente': 12 },
  { date: '2024-07-05', whatsapp: 18, discord: 5, 'lucrando-lci': 15 },
];

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

export default function AdminDashboard() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  // This will hold the filtered data based on the date range picker
  const [filteredData, setFilteredData] = React.useState(mockData);

  React.useEffect(() => {
    // TODO: Fetch data from your backend based on the date range
    // For now, we'll just filter the mock data
    if (date?.from && date?.to) {
      const filtered = mockData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= date.from! && itemDate <= date.to!;
      });
      setFilteredData(filtered);
    }
  }, [date]);

  const ClicksChart = ({ data, title, description, dataKeys }: { data: any[], title: string, description: string, dataKeys: string[] }) => (
    <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="rgba(255,255,255,0.7)"
              tickFormatter={(value) => format(new Date(value), 'dd/MM')}
            />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <ChartTooltip content={<ChartTooltipContent className="bg-black/80 backdrop-blur-md border-white/10 text-white" />} />
            {dataKeys.map((key) => (
               <Bar key={key} dataKey={key} fill={chartConfig[key as keyof typeof chartConfig]?.color} radius={4} />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );

  return (
    <div className="dark flex min-h-screen w-full flex-col text-white">
       <Image
        src="https://i.imgur.com/pjSQoR5.gif"
        alt="Fundo animado"
        fill
        className="object-cover -z-10 brightness-50"
        data-ai-hint="animated background"
        unoptimized
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
                    'w-[300px] justify-start text-left font-normal bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:text-white',
                    !date && 'text-gray-400'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Escolha um período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
           <ClicksChart 
             data={filteredData}
             title="Cliques nas Redes Sociais"
             description="Total de cliques por dia nos links de redes sociais."
             dataKeys={['whatsapp', 'instagram', 'tiktok', 'youtube', 'discord']}
           />
           <ClicksChart 
             data={filteredData}
             title="Cliques nos Projetos"
             description="Total de cliques por dia nos links dos projetos."
             dataKeys={['gerente-inteligente', 'gerente-inteligente-ia', 'lucrando-lci', 'deposito-aguas-brancas']}
           />
        </div>
      </main>
    </div>
  );
}

'use client';

import * as React from 'react';
import {
  format,
  formatISO,
  eachDayOfInterval,
  subDays,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Eye,
  Trash2,
  Hand,
  Users,
  Clock,
} from 'lucide-react';
import Image from 'next/image';
import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  getDocs,
  writeBatch,
  orderBy,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import type { DateRange } from 'react-day-picker';

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

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
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

type TrafficSource = {
  id: string;
  source: string;
  createdAt: Timestamp;
}

type ChartDataPoint = {
  date: string;
  [key: string]: any;
};

const linkIdLabels: { [key: string]: string } = {
    'whatsapp': 'WhatsApp',
    'instagram': 'Instagram',
    'tiktok': 'TikTok',
    'youtube': 'YouTube',
    'discord': 'Discord',
    'gerente-inteligente': 'Gerente Inteligente',
    'gerente-inteligente-ia': 'Gerente Inteligente IA',
    'lucrando-lci': 'Lucrando com Influenciadores',
    'deposito-aguas-brancas': 'Depósito Águas Brancas',
};

const trafficSourceLabels: { [key: string]: string } = {
    'WhatsApp': 'WhatsApp',
    'Instagram': 'Instagram',
    'TikTok': 'TikTok',
};

export default function AdminDashboard() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });
  const [visits, setVisits] = React.useState<Visit[]>([]);
  const [clicks, setClicks] = React.useState<Click[]>([]);
  const [trafficSources, setTrafficSources] = React.useState<TrafficSource[]>([]);
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);
  const [trafficChartData, setTrafficChartData] = React.useState<ChartDataPoint[]>([]);

  // Effect to fetch data from Firestore
  React.useEffect(() => {
    const fetchFirestoreData = (collectionName: string, setData: (data: any[]) => void) => {
      let dataQuery = query(collection(db, collectionName));
      
      if (dateRange?.from) {
        dataQuery = query(dataQuery, where('createdAt', '>=', startOfDay(dateRange.from)));
      }
      if (dateRange?.to) {
        dataQuery = query(dataQuery, where('createdAt', '<=', endOfDay(dateRange.to)));
      }

      dataQuery = query(dataQuery, orderBy('createdAt', 'desc'));


      const unsubscribe = onSnapshot(
        dataQuery,
        (snapshot) => {
          const data = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() })
          );
          setData(data);
        },
        (error) => {
          console.error(`Failed to fetch ${collectionName}:`, error);
        }
      );
      return unsubscribe;
    };

    const unsubscribeVisits = fetchFirestoreData('visits', setVisits);
    const unsubscribeClicks = fetchFirestoreData('clicks', setClicks);
    const unsubscribeTraffic = fetchFirestoreData('traffic_sources', setTrafficSources);

    return () => {
      unsubscribeVisits();
      unsubscribeClicks();
      unsubscribeTraffic();
    };
  }, [dateRange]);

  // Process data for charts
  React.useEffect(() => {
    const processDataForChart = (
      sourceData: Array<Click | TrafficSource>,
      keyField: 'linkId' | 'source',
      dataKeys: string[]
    ) => {
      const now = new Date();
      const from = dateRange?.from || subDays(now, 6);
      const to = dateRange?.to || now;
      let interval;
      try {
        interval = eachDayOfInterval({ start: from, end: to });
      } catch (error) {
        interval = [from];
      }
      
      const dataByDate: { [date: string]: ChartDataPoint } = {};

      // Initialize all days in the interval with 0 for all keys
      interval.forEach(day => {
          const itemDate = formatISO(day, { representation: 'date' });
          dataByDate[itemDate] = { date: itemDate };
          dataKeys.forEach(key => {
            dataByDate[itemDate][key] = 0;
          });
      });

      // Populate with existing data
      sourceData.forEach((item) => {
        if (item.createdAt) {
          const itemDate = formatISO(item.createdAt.toDate(), {
            representation: 'date',
          });
          if (dataByDate[itemDate]) {
            const key = item[keyField as keyof typeof item] as string;
            if (dataByDate[itemDate][key] !== undefined) {
               dataByDate[itemDate][key]++;
            }
          }
        }
      });
      return Object.values(dataByDate).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    };

    const projectKeys = [
      'gerente-inteligente',
      'gerente-inteligente-ia',
      'lucrando-lci',
      'deposito-aguas-brancas',
    ];
    const socialKeys = ['whatsapp', 'instagram', 'tiktok', 'youtube', 'discord'];
    const trafficKeys = ['WhatsApp', 'Instagram', 'TikTok'];

    const allClickKeys = [...projectKeys, ...socialKeys];

    setChartData(processDataForChart(clicks, 'linkId', allClickKeys));
    setTrafficChartData(processDataForChart(trafficSources, 'source', trafficKeys));
  }, [clicks, trafficSources, dateRange]);


  const GenericChart = ({
    data,
    title,
    description,
    dataKeys,
    chartConfig,
  }: {
    data: any[];
    title: string;
    description: string;
    dataKeys: string[];
    chartConfig: ChartConfig;
  }) => {
    const chartId = React.useId().replace(/:/g, '');

    return (
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart data={data} accessibilityLayer margin={{ left: 12, right: 12 }}>
              <defs>
                {Object.keys(chartConfig).map((key) => {
                  const color =
                    chartConfig[key as keyof typeof chartConfig]?.color;
                  if (color) {
                    return (
                      <linearGradient
                        key={key}
                        id={`${chartId}-${key}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                      </linearGradient>
                    );
                  }
                  return null;
                })}
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                stroke="rgba(255,255,255,0.7)"
                tickMargin={8}
                interval={Math.floor((data.length -1) / 7)}
                tickFormatter={(value, index) => {
                    const date = new Date(value);
                    const formattedDate = format(new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000), 'dd/MM');
                    return formattedDate;
                }}
                tick={(props) => {
                    const { x, y, payload, index } = props;
                    let textAnchor = "middle";
                    let dx = 0;
                    if (index === 0 && data.length > 1) {
                        textAnchor = "start";
                    }
                    if (index === data.length - 1 && data.length > 1) {
                        textAnchor = "end";
                    }

                    return (
                        <g transform={`translate(${x},${y})`}>
                            <text x={0} y={0} dy={16} dx={dx} textAnchor={textAnchor} fill="rgba(255,255,255,0.7)" fontSize={12}>
                               {format(new Date(payload.value.replace(/-/g, '/')), 'dd/MM')}
                            </text>
                        </g>
                    );
                }}
              />
              <YAxis stroke="rgba(255,255,255,0.7)" hide />
              <ChartTooltip
                content={
                  <ChartTooltipContent className="bg-black/80 backdrop-blur-md border-white/10 text-white" />
                }
              />
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
                );
              })}
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  };
  
  const ClickLog = () => {
    return (
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
            <CardHeader>
                <CardTitle>Log de Cliques</CardTitle>
                <CardDescription className="text-gray-400">
                    Todos os cliques registrados em ordem cronológica.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {clicks.length > 0 ? clicks.map((click) => (
                        <li key={click.id} className="flex justify-between items-center text-sm font-medium">
                            <span className="text-gray-300">{linkIdLabels[click.linkId] || click.linkId}</span>
                            <span className="text-gray-500 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {click.createdAt ? format(click.createdAt.toDate(), 'HH:mm dd/MM/yyyy', { locale: ptBR }) : '...'}
                            </span>
                        </li>
                    )) : (
                        <p className="text-gray-400">Nenhum clique registrado ainda.</p>
                    )}
                </ul>
            </CardContent>
        </Card>
    );
  }

  const TrafficLog = () => {
    return (
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
            <CardHeader>
                <CardTitle>Log de Fontes de Tráfego</CardTitle>
                <CardDescription className="text-gray-400">
                    Todas as fontes de tráfego registradas em ordem cronológica.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {trafficSources.length > 0 ? trafficSources.map((source) => (
                        <li key={source.id} className="flex justify-between items-center text-sm font-medium">
                            <span className="text-gray-300">{trafficSourceLabels[source.source] || source.source}</span>
                            <span className="text-gray-500 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {source.createdAt ? format(source.createdAt.toDate(), 'HH:mm dd/MM/yyyy', { locale: ptBR }) : '...'}
                            </span>
                        </li>
                    )) : (
                        <p className="text-gray-400">Nenhuma fonte de tráfego registrada ainda.</p>
                    )}
                </ul>
            </CardContent>
        </Card>
    );
  }

  const DangerousActions = () => {
    const { toast } = useToast();
    const [isPending, startTransition] = React.useTransition();

    const clearAllData = async (): Promise<{ success: boolean, error?: string }> => {
        try {
            const collectionsToDelete = ['visits', 'clicks', 'traffic_sources'];
            const batch = writeBatch(db);

            for (const col of collectionsToDelete) {
                const collectionRef = collection(db, col);
                const snapshot = await getDocs(collectionRef);
                if (!snapshot.empty) {
                    snapshot.docs.forEach(doc => {
                        batch.delete(doc.ref);
                    });
                }
            }
            
            await batch.commit();
            
            return { success: true };

        } catch (error) {
            console.error("Failed to clear all data:", error);
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
            return { success: false, error: 'An unknown error occurred.' };
        }
    }


    const handleClearData = () => {
        startTransition(async () => {
            const result = await clearAllData();
            if (result.success) {
                toast({
                    title: "Sucesso!",
                    description: "Todos os dados de visitas, cliques e fontes de tráfego foram removidos.",
                    variant: "default",
                });
            } else {
                toast({
                    title: "Erro!",
                    description: `Não foi possível limpar os dados: ${result.error}`,
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <Card className="bg-transparent border-red-500/50 text-white rounded-2xl">
            <CardHeader>
                <CardTitle className="text-red-400">Ações Perigosas</CardTitle>
                <CardDescription className="text-gray-400">
                    Essas ações são irreversíveis. Use com cuidado.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 text-white text-base">
                            <Trash2 className="mr-2 h-5 w-5" />
                            Limpar Todos os Dados
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black/80 backdrop-blur-md border-white/10 text-white rounded-2xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                                Esta ação não pode ser desfeita. Isso removerá permanentemente todos os dados
                                das coleções 'visits', 'clicks' e 'traffic_sources'.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-transparent hover:bg-white/10 border-white/20">Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleClearData} className="bg-red-600 hover:bg-red-700" disabled={isPending}>
                                {isPending ? "Limpando..." : "Sim, limpar tudo"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                 <p className="text-xs text-center text-gray-500">
                    Esta operação removerá todos os dados das coleções de análise.
                </p>
            </CardContent>
        </Card>
    )
  }

  const trafficChartConfig = {
    ...chartConfig, // Reuse existing colors
    'WhatsApp': { label: 'WhatsApp', color: 'hsl(var(--chart-1))' },
    'Instagram': { label: 'Instagram', color: 'hsl(var(--chart-2))' },
    'TikTok': { label: 'TikTok', color: 'hsl(var(--chart-3))' },
  };
  
  const projectChartData = chartData.map(item => {
    const projectKeys = [
      'gerente-inteligente',
      'gerente-inteligente-ia',
      'lucrando-lci',
      'deposito-aguas-brancas',
    ];
    const newItem: ChartDataPoint = { date: item.date };
    projectKeys.forEach(key => {
      newItem[key] = item[key] ?? 0;
    });
    return newItem;
  });

  const socialChartData = chartData.map(item => {
    const socialKeys = ['whatsapp', 'instagram', 'tiktok', 'youtube', 'discord'];
    const newItem: ChartDataPoint = { date: item.date };
    socialKeys.forEach(key => {
      newItem[key] = item[key] ?? 0;
    });
    return newItem;
  });

  return (
    <div className="dark relative flex min-h-screen w-full flex-col text-white">
      <Image
        src="https://i.imgur.com/KKZfDtk.jpeg"
        alt="Fundo"
        fill
        className="object-cover -z-10 brightness-50"
        data-ai-hint="abstract background"
      />
      <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold flex-shrink-0">
            Dashboard de Análise
          </h1>
          <DatePickerWithRange
            date={dateRange}
            onDateChange={setDateRange}
            className="w-full sm:w-auto"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total de Visitas"
            value={visits.length}
            icon={<Eye className="h-4 w-4 text-purple-400" />}
          />
           <StatCard
            title="Total de Cliques"
            value={clicks.length}
            icon={<Hand className="h-4 w-4 text-green-400" />}
          />
           <StatCard
            title="Fontes de Tráfego"
            value={trafficSources.length}
            icon={<Users className="h-4 w-4 text-blue-400" />}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <GenericChart
            data={socialChartData}
            title="Cliques nas Redes Sociais"
            description="Total de cliques por dia nos links de redes sociais."
            dataKeys={['whatsapp', 'instagram', 'tiktok', 'youtube', 'discord']}
            chartConfig={chartConfig}
          />
          <GenericChart
            data={projectChartData}
            title="Cliques nos Projetos"
            description="Total de cliques por dia nos links dos projetos."
            dataKeys={[
              'gerente-inteligente',
              'gerente-inteligente-ia',
              'lucrando-lci',
              'deposito-aguas-brancas',
            ]}
            chartConfig={chartConfig}
          />
        </div>
         <div className="grid grid-cols-1 gap-6">
            <GenericChart
              data={trafficChartData}
              title="Fontes de Tráfego"
              description="Total de visitas por dia de cada fonte de tráfego."
              dataKeys={['WhatsApp', 'Instagram', 'TikTok']}
              chartConfig={trafficChartConfig}
            />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ClickLog />
          <TrafficLog />
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <DangerousActions />
        </div>
      </main>
    </div>
  );
}

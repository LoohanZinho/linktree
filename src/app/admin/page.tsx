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
  MapPin,
  Building,
  MousePointerClick,
  Copy
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
import { useIsMobile } from '@/hooks/use-mobile';
import { FaWhatsapp, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';


import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import type { DateRange } from 'react-day-picker';

const chartConfig = {
  clicks: {
    label: 'Cliques',
  },
  whatsapp: {
    label: 'WhatsApp',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  instagram: {
    label: 'Instagram',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tiktok: {
    label: 'TikTok',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  youtube: {
    label: 'YouTube',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  discord: {
    label: 'Discord',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  'gerente-inteligente': {
    label: 'Gerente Inteligente',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  'gerente-inteligente-ia': {
    label: 'Gerente Inteligente IA',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  'lucrando-lci': {
    label: 'Lucrando com Influenciadores',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  'deposito-aguas-brancas': {
    label: 'Depósito Águas Brancas',
    color: 'rgba(255, 255, 255, 0.9)',
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
  city?: string;
  region?: string;
  ip?: string;
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

type TopCity = {
    city: string;
    count: number;
}

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
    'YouTube': 'YouTube',
};

const trafficSourceIcons: { [key: string]: React.ElementType } = {
    'WhatsApp': FaWhatsapp,
    'Instagram': FaInstagram,
    'TikTok': FaTiktok,
    'YouTube': FaYoutube,
};

export default function AdminDashboard() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
  const [visits, setVisits] = React.useState<Visit[]>([]);
  const [clicks, setClicks] = React.useState<Click[]>([]);
  const [trafficSources, setTrafficSources] = React.useState<TrafficSource[]>([]);
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);
  const [trafficChartData, setTrafficChartData] = React.useState<ChartDataPoint[]>([]);
  const [topCities, setTopCities] = React.useState<TopCity[]>([]);
  const [uniqueCitiesCount, setUniqueCitiesCount] = React.useState(0);
  const [selectedVisitIp, setSelectedVisitIp] = React.useState<string | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  React.useEffect(() => {
    // Set initial date range on client to avoid hydration mismatch
    setDateRange({
        from: subDays(new Date(), 6),
        to: new Date(),
    });
  }, []);

  // Effect to fetch data from Firestore
  React.useEffect(() => {
    if (!dateRange?.from) return;

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

  // Process data for charts and city stats
  React.useEffect(() => {
    const processDataForChart = (
      sourceData: Array<Click | TrafficSource>,
      keyField: 'linkId' | 'source',
      dataKeys: string[]
    ) => {
      const from = dateRange?.from;
      const to = dateRange?.to;

      if (!from || !to || from > to) {
        return [];
      }

      let interval: Date[];
      try {
        interval = eachDayOfInterval({ start: from, end: to });
      } catch (error) {
        console.error("Error creating date interval:", error);
        return [];
      }
      
      const dataByDate: { [date: string]: ChartDataPoint } = {};

      interval.forEach(day => {
          const itemDate = formatISO(day, { representation: 'date' });
          dataByDate[itemDate] = { date: itemDate };
          dataKeys.forEach(key => {
            dataByDate[itemDate][key] = 0;
          });
      });

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

    const processCityData = (visitData: Visit[]) => {
        const cityCounts: { [city: string]: number } = {};
        visitData.forEach(visit => {
            const city = visit.city || 'Desconhecida';
            const region = visit.region && visit.region !== 'N/A' ? visit.region : '';
            const location = city === 'Desconhecida' ? 'Desconhecida' : (region ? `${city}, ${region}` : city);
            cityCounts[location] = (cityCounts[location] || 0) + 1;
        });

        const sortedCities = Object.entries(cityCounts)
            .map(([city, count]) => ({ city, count }))
            .sort((a, b) => b.count - a.count);
        
        setUniqueCitiesCount(sortedCities.length);
        setTopCities(sortedCities.slice(0, 5));
    }

    const projectKeys = [
      'gerente-inteligente',
      'gerente-inteligente-ia',
      'lucrando-lci',
      'deposito-aguas-brancas',
    ];
    const socialKeys = ['whatsapp', 'instagram', 'tiktok', 'youtube', 'discord'];
    const trafficKeys = ['WhatsApp', 'Instagram', 'TikTok', 'YouTube'];

    const allClickKeys = [...projectKeys, ...socialKeys];

    setChartData(processDataForChart(clicks, 'linkId', allClickKeys));
    setTrafficChartData(processDataForChart(trafficSources, 'source', trafficKeys));
    processCityData(visits);
  }, [clicks, trafficSources, visits, dateRange]);


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
    const headerClass = "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2";

    if (data.length < 2) {
      return (
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
          <CardHeader className={headerClass}>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="text-gray-400">{description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-2 pt-4 pb-6 sm:px-4 h-[180px] sm:h-[220px] md:h-[250px] flex items-center justify-center">
             <p className="text-gray-400">Não há dados suficientes para exibir o gráfico.</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
        <CardHeader className={headerClass}>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="text-gray-400">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 pb-6 sm:px-4">
          <ChartContainer
            config={chartConfig}
            className="w-full h-[180px] sm:h-[220px] md:h-[250px]"
          >
            <AreaChart data={data} accessibilityLayer>
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
                interval={isMobile ? 0 : Math.max(0, Math.floor((data.length -1) / 7))}
                tickFormatter={(value) => {
                    const date = new Date(value);
                    const formattedDate = format(new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000), 'dd/MM');
                    return formattedDate;
                }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.7)"
                hide={isMobile}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent className="bg-black/80 backdrop-blur-md border-white/10 text-white" indicator="dot" />
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
  
  const VisitLog = () => {
    return (
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
        <CardHeader>
          <CardTitle>Log de Visitas</CardTitle>
          <CardDescription className="text-gray-400">
            Todas as visitas ao site em ordem cronológica.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full">
            <ul className="space-y-4 pr-4">
              {visits.length > 0 ? (
                visits.map((visit) => {
                  const city = visit.city || 'Desconhecida';
                  const region = visit.region && visit.region !== 'N/A' ? visit.region : null;
                  const location = city === 'Desconhecida' ? 'Desconhecida' : (region ? `${city}, ${region}` : city);
                  
                  return (
                    <li
                      key={visit.id}
                      className="flex flex-wrap justify-between items-center text-sm font-medium gap-2 cursor-pointer hover:bg-white/5 p-2 rounded-md transition-colors"
                      onClick={() => setSelectedVisitIp(visit.ip ?? null)}
                    >
                      <span className="text-gray-300 flex items-center gap-2 truncate">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {location}
                        </span>
                      </span>
                      <span className="text-gray-500 flex items-center gap-2 text-xs">
                        <Clock className="h-4 w-4" />
                        {visit.createdAt
                          ? format(
                              visit.createdAt.toDate(),
                              'HH:mm dd/MM/yyyy',
                              { locale: ptBR }
                            )
                          : '...'}
                      </span>
                    </li>
                  );
                })
              ) : (
                <p className="text-gray-400 text-center pt-8">
                  Nenhuma visita registrada ainda.
                </p>
              )}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

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
          <ScrollArea className="h-[300px] w-full">
            <ul className="space-y-4 pr-4">
              {clicks.length > 0 ? (
                clicks.map((click) => (
                  <li
                    key={click.id}
                    className="flex flex-wrap justify-between items-center text-sm font-medium gap-2"
                  >
                    <span className="text-gray-300 flex items-center gap-2 truncate">
                      <MousePointerClick className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {linkIdLabels[click.linkId] || click.linkId}
                      </span>
                    </span>
                    <span className="text-gray-500 flex items-center gap-2 text-xs">
                      <Clock className="h-4 w-4" />
                      {click.createdAt
                        ? format(
                            click.createdAt.toDate(),
                            'HH:mm dd/MM/yyyy',
                            { locale: ptBR }
                          )
                        : '...'}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-400 text-center pt-8">
                  Nenhum clique registrado ainda.
                </p>
              )}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  const TopCitiesCard = () => {
    return (
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
        <CardHeader>
          <CardTitle>Top Cidades por Visitas</CardTitle>
          <CardDescription className="text-gray-400">
            As cidades que mais visitaram seu site.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {topCities.length > 0 ? (
                 <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-white">Localização</TableHead>
                        <TableHead className="text-right text-white">Visitas</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topCities.map(({ city, count }) => (
                        <TableRow key={city} className="border-white/10 hover:bg-white/5">
                            <TableCell className="font-medium truncate">{city}</TableCell>
                            <TableCell className="text-right">{count}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-gray-400 text-center py-8">Nenhuma visita registrada ainda.</p>
            )}
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
          <ScrollArea className="h-[300px] w-full">
            <ul className="space-y-4 pr-4">
              {trafficSources.length > 0 ? (
                trafficSources.map((source) => {
                  const Icon = trafficSourceIcons[source.source];
                  return (
                    <li
                      key={source.id}
                      className="flex flex-wrap justify-between items-center text-sm font-medium gap-2"
                    >
                      <span className="text-gray-300 flex items-center gap-2 truncate">
                        {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                        <span className="truncate">
                          {trafficSourceLabels[source.source] || source.source}
                        </span>
                      </span>
                      <span className="text-gray-500 flex items-center gap-2 text-xs">
                        <Clock className="h-4 w-4" />
                        {source.createdAt
                          ? format(
                              source.createdAt.toDate(),
                              'HH:mm dd/MM/yyyy',
                              { locale: ptBR }
                            )
                          : '...'}
                      </span>
                    </li>
                  );
                })
              ) : (
                <p className="text-gray-400 text-center pt-8">
                  Nenhuma fonte de tráfego registrada ainda.
                </p>
              )}
            </ul>
          </ScrollArea>
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

    const copyIpToClipboard = (ip: string) => {
        navigator.clipboard.writeText(ip);
        toast({
            title: 'Copiado!',
            description: 'Endereço de IP copiado para a área de transferência.',
        });
    };

  const trafficChartConfig = {
    ...chartConfig,
    'WhatsApp': { label: 'WhatsApp', color: 'rgba(255, 255, 255, 0.9)' },
    'Instagram': { label: 'Instagram', color: 'rgba(255, 255, 255, 0.9)' },
    'TikTok': { label: 'TikTok', color: 'rgba(255, 255, 255, 0.9)' },
    'YouTube': { label: 'YouTube', color: 'rgba(255, 255, 255, 0.9)' },
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
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold flex-shrink-0">
            Dashboard de Análise
          </h1>
          <DatePickerWithRange
            date={dateRange}
            onDateChange={setDateRange}
            className="w-full sm:w-auto"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          <StatCard
            title="Cidades Únicas"
            value={uniqueCitiesCount}
            icon={<Building className="h-4 w-4 text-orange-400" />}
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
              dataKeys={['WhatsApp', 'Instagram', 'TikTok', 'YouTube']}
              chartConfig={trafficChartConfig}
            />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <VisitLog />
          <TopCitiesCard />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TrafficLog />
          <ClickLog />
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <DangerousActions />
        </div>
      </main>

        <Dialog open={!!selectedVisitIp} onOpenChange={() => setSelectedVisitIp(null)}>
            <DialogContent className="sm:max-w-md bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Endereço de IP</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Este é o endereço de IP do visitante.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Input
                        id="ip-address"
                        readOnly
                        defaultValue={selectedVisitIp || ''}
                        className="flex-1 bg-black/20 border-white/10"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyIpToClipboard(selectedVisitIp!)}
                        className="bg-black/20 border-white/10 hover:bg-black/40"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="bg-transparent hover:bg-white/10 border-white/20">
                            Fechar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}

'use client';

import * as React from 'react';
import {
  format,
  formatISO,
} from 'date-fns';
import {
  Eye,
  Trash2,
  Hand,
} from 'lucide-react';
import Image from 'next/image';
import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  getDocs,
  writeBatch,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast"

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

export default function AdminDashboard() {
  const [allVisits, setAllVisits] = React.useState<Visit[]>([]);
  const [allClicks, setAllClicks] = React.useState<Click[]>([]);
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);

  // Effect to fetch visits and clicks from Firestore
  React.useEffect(() => {
    try {
      // Fetch Visits
      const visitsQuery = query(collection(db, 'visits'));

      const unsubscribeVisits = onSnapshot(
        visitsQuery,
        (snapshot) => {
          const visitsData = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Visit)
          );
          setAllVisits(visitsData);
        },
        (error) => {
          console.error('Failed to fetch visits:', error);
        }
      );

      // Fetch Clicks for Charts
      const clicksQuery = query(collection(db, 'clicks'));

      const unsubscribeClicks = onSnapshot(
        clicksQuery,
        (snapshot) => {
          const clicksData = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Click)
          );
          setAllClicks(clicksData);
        },
        (error) => {
          console.error('Failed to fetch clicks:', error);
        }
      );

      return () => {
        unsubscribeVisits();
        unsubscribeClicks();
      };
    } catch (error) {
      console.error('Error setting up Firestore listener:', error);
    }
  }, []);

  // Process data for charts
  React.useEffect(() => {
    const dataByDate: { [date: string]: ChartDataPoint } = {};

    allClicks.forEach((click) => {
      if (click.createdAt) {
        const clickDate = formatISO(click.createdAt.toDate(), {
          representation: 'date',
        });
        if (!dataByDate[clickDate]) {
          dataByDate[clickDate] = { date: clickDate };
        }
        if (!dataByDate[clickDate][click.linkId]) {
          dataByDate[clickDate][click.linkId] = 0;
        }
        dataByDate[clickDate][click.linkId]++;
      }
    });

    const sortedData = Object.values(dataByDate).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setChartData(sortedData);
  }, [allClicks]);

  const ClicksChart = ({
    data,
    title,
    description,
    dataKeys,
  }: {
    data: any[];
    title: string;
    description: string;
    dataKeys: string[];
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
                tickMargin={10}
                axisLine={false}
                stroke="rgba(255,255,255,0.7)"
                tickFormatter={(value) =>
                  format(new Date(value), 'dd/MM', { timeZone: 'UTC' })
                }
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
  
  const ClickCountList = ({ clicks }: { clicks: Click[] }) => {
    const clicksByLink = React.useMemo(() => {
        const counts: { [key: string]: number } = {};
        for (const linkId in linkIdLabels) {
            counts[linkId] = 0;
        }
        clicks.forEach(click => {
            if (counts.hasOwnProperty(click.linkId)) {
                counts[click.linkId]++;
            }
        });
        return Object.entries(counts).sort(([, a], [, b]) => b - a);
    }, [clicks]);

    return (
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
            <CardHeader>
                <CardTitle>Contagem de Cliques por Link</CardTitle>
                <CardDescription className="text-gray-400">
                    Total de cliques registrados para cada botão.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {clicksByLink.length > 0 ? clicksByLink.map(([linkId, count]) => (
                        <li key={linkId} className="flex justify-between items-center text-sm font-medium">
                            <span className="text-gray-300">{linkIdLabels[linkId] || linkId}</span>
                            <div className="flex items-center gap-2">
                                <Hand className="h-4 w-4 text-gray-500" />
                                <span className="font-bold text-red-500 w-6 text-right">{count}</span>
                            </div>
                        </li>
                    )) : (
                        <p className="text-gray-400">Nenhum clique registrado.</p>
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
            const collectionsToDelete = ['visits', 'clicks'];
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
            
            // The UI will update automatically via onSnapshot listeners.
            
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
                    description: "Todos os dados de visitas e cliques foram removidos.",
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
                                das coleções 'visits' e 'clicks'.
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
                    Esta operação removerá todos os dados das coleções 'visits' e 'clicks'.
                </p>
            </CardContent>
        </Card>
    )
  }

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
            Dashboard de Cliques
          </h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de Visitas"
            value={allVisits.length}
            icon={<Eye className="h-4 w-4 text-purple-400" />}
          />
           <StatCard
            title="Total de Cliques"
            value={allClicks.length}
            icon={<Hand className="h-4 w-4 text-green-400" />}
          />
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
            dataKeys={[
              'gerente-inteligente',
              'gerente-inteligente-ia',
              'lucrando-lci',
              'deposito-aguas-brancas',
            ]}
          />
        </div>
         <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <ClickCountList clicks={allClicks} />
            <DangerousActions />
        </div>
      </main>
    </div>
  );
}

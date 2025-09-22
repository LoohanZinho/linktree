"use client"

import * as React from "react"
import { addDays, format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerWithPresetsProps = {
    onDateChange: (date: DateRange | undefined) => void;
    className?: string;
    initialDate?: DateRange;
}

export function DatePickerWithPresets({ className, onDateChange, initialDate }: DatePickerWithPresetsProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(initialDate);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if(date !== initialDate) {
        onDateChange(date);
    }
  }, [date, onDateChange, initialDate]);
  
  React.useEffect(() => {
    if(initialDate !== date) {
      setDate(initialDate)
    }
  }, [initialDate, date])


  const setPreset = (preset: 'today' | 'yesterday' | 'this-week' | 'last-7-days' | 'this-month' | 'last-30-days' | 'all-time') => {
    const now = new Date();
    switch (preset) {
        case 'today':
            setDate({ from: now, to: now });
            break;
        case 'yesterday':
            const yesterday = subDays(now, 1);
            setDate({ from: yesterday, to: yesterday });
            break;
        case 'this-week':
            setDate({ from: startOfWeek(now, { locale: ptBR }), to: endOfWeek(now, { locale: ptBR }) });
            break;
        case 'last-7-days':
            setDate({ from: subDays(now, 6), to: now });
            break;
        case 'this-month':
             setDate({ from: startOfMonth(now), to: endOfMonth(now) });
            break;
        case 'last-30-days':
            setDate({ from: subDays(now, 29), to: now });
            break;
        case 'all-time':
            setDate(undefined); // undefined signifies "all time"
            break;
    }
    setOpen(false);
  }

  const Presets = () => (
    <div className="flex flex-col space-y-2 pr-4 border-r border-white/10">
        <Button variant="ghost" className="justify-start" onClick={() => setPreset('today')}>Hoje</Button>
        <Button variant="ghost" className="justify-start" onClick={() => setPreset('yesterday')}>Ontem</Button>
        <Button variant="ghost" className="justify-start" onClick={() => setPreset('last-7-days')}>Últimos 7 dias</Button>
        <Button variant="ghost" className="justify-start" onClick={() => setPreset('last-30-days')}>Últimos 30 dias</Button>
        <Button variant="ghost" className="justify-start" onClick={() => setPreset('this-month')}>Este mês</Button>
        <Button variant="ghost" className="justify-start" onClick={() => setPreset('all-time')}>Máximo</Button>
    </div>
  )

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: ptBR })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex bg-black/80 backdrop-blur-md border-white/10 text-white rounded-2xl" align="end">
            <Presets />
            <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                locale={ptBR}
                className="p-4"
                classNames={{
                    day_selected: "text-primary-foreground bg-primary hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-white/20 text-white",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                }}
            />
        </PopoverContent>
      </Popover>
    </div>
  )
}

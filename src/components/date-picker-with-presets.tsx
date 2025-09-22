"use client"

import * as React from "react"
import { format, subDays, startOfMonth, endOfMonth } from "date-fns"
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
    date?: DateRange; // Changed from initialDate to date
}

export function DatePickerWithPresets({ className, onDateChange, date }: DatePickerWithPresetsProps) {
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (newDate: DateRange | undefined) => {
    onDateChange(newDate);
    // Do not close the popover automatically to allow preset selection.
    // User can click outside or select a range to close it.
  };

  const setPreset = (preset: 'today' | 'yesterday' | 'last-7-days' | 'this-month' | 'all-time') => {
    const now = new Date();
    let newDate: DateRange | undefined;
    switch (preset) {
        case 'today':
            newDate = { from: now, to: now };
            break;
        case 'yesterday':
            const yesterday = subDays(now, 1);
            newDate = { from: yesterday, to: yesterday };
            break;
        case 'last-7-days':
            newDate = { from: subDays(now, 6), to: now };
            break;
        case 'this-month':
             newDate = { from: startOfMonth(now), to: endOfMonth(now) };
            break;
        case 'all-time':
            newDate = undefined; // undefined signifies "all time"
            break;
    }
    onDateChange(newDate);
    setOpen(false);
  }

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
        <PopoverContent className="w-auto p-0 flex flex-col md:flex-row bg-black/80 backdrop-blur-md border-white/10 text-white rounded-2xl" align="end">
            <div className="flex flex-col space-y-2 p-2 md:pr-4 md:border-r md:border-white/10">
                <Button variant="ghost" className="justify-start" onClick={() => setPreset('today')}>Hoje</Button>
                <Button variant="ghost" className="justify-start" onClick={() => setPreset('yesterday')}>Ontem</Button>
                <Button variant="ghost" className="justify-start" onClick={() => setPreset('last-7-days')}>Últimos 7 dias</Button>
                <Button variant="ghost" className="justify-start" onClick={() => setPreset('this-month')}>Este mês</Button>
                <Button variant="ghost" className="justify-start" onClick={() => setPreset('all-time')}>Máximo</Button>
            </div>
            <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={1}
                locale={ptBR}
                className="p-4"
                classNames={{
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_range_middle: "aria-selected:bg-accent/50 aria-selected:text-accent-foreground",
                    day_range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
                    day_range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground"
                }}
            />
        </PopoverContent>
      </Popover>
    </div>
  )
}

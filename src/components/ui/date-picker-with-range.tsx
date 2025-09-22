"use client"

import * as React from "react"
import { addDays, format, subDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
    date: DateRange | undefined,
    onDateChange: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({
  className,
  date,
  onDateChange
}: DatePickerWithRangeProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePreset = (preset: 'today' | 'yesterday' | 'last7' | 'last30' | 'thisMonth' | 'lastMonth') => {
    const now = new Date();
    let from: Date;
    let to: Date;

    switch (preset) {
        case 'today':
            from = to = now;
            break;
        case 'yesterday':
            from = to = subDays(now, 1);
            break;
        case 'last7':
            from = subDays(now, 6);
            to = now;
            break;
        case 'last30':
            from = subDays(now, 29);
            to = now;
            break;
        case 'thisMonth':
            from = startOfMonth(now);
            to = endOfMonth(now);
            break;
        case 'lastMonth':
            const lastMonthStart = startOfMonth(subDays(now, now.getDate()));
            from = lastMonthStart;
            to = endOfMonth(lastMonthStart);
            break;
    }
    onDateChange({ from, to });
    setIsOpen(false);
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal bg-white/5 backdrop-blur-md border border-white/10 hover:bg-black/40 hover:text-white",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex flex-col sm:flex-row bg-transparent border-0 text-white rounded-2xl" align="start">
           <div className="flex flex-col space-y-2 border-r border-white/10 p-4 bg-white/5 backdrop-blur-md rounded-l-2xl">
                <Button variant="ghost" onClick={() => handlePreset('today')} className="justify-start">Hoje</Button>
                <Button variant="ghost" onClick={() => handlePreset('yesterday')} className="justify-start">Ontem</Button>
                <Button variant="ghost" onClick={() => handlePreset('last7')} className="justify-start">Últimos 7 dias</Button>
                <Button variant="ghost" onClick={() => handlePreset('last30')} className="justify-start">Últimos 30 dias</Button>
                <Button variant="ghost" onClick={() => handlePreset('thisMonth')} className="justify-start">Este mês</Button>
                <Button variant="ghost" onClick={() => handlePreset('lastMonth')} className="justify-start">Mês passado</Button>
           </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
            className="bg-white/5 backdrop-blur-md border-y border-r border-white/10 rounded-r-2xl"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
    
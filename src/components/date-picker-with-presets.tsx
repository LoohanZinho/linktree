"use client"

import * as React from "react"
import { addDays, format, startOfMonth, endOfMonth, sub } from "date-fns"
import { ptBR } from 'date-fns/locale'
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
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  className?: string;
};


export function DatePickerWithPresets({
  date,
  setDate,
  className,
}: DatePickerWithPresetsProps) {
  const presets = [
    { label: "Hoje", range: { from: new Date(), to: new Date() } },
    { label: "Ontem", range: { from: addDays(new Date(), -1), to: addDays(new Date(), -1) } },
    { label: "Últimos 7 dias", range: { from: addDays(new Date(), -6), to: new Date() } },
    { label: "Últimos 30 dias", range: { from: addDays(new Date(), -29), to: new Date() } },
    { label: "Este mês", range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } },
    { label: "Máximo", range: undefined },
  ]


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full sm:w-[300px] justify-start text-left font-normal bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white hover:text-white",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "PPP", { locale: ptBR })} -{" "}
                {format(date.to, "PPP", { locale: ptBR })}
              </>
            ) : (
              format(date.from, "PPP", { locale: ptBR })
            )
          ) : (
            <span>Escolha um período</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex flex-col space-y-2 p-2 w-auto bg-black/80 backdrop-blur-md border-white/10 text-white rounded-2xl">
        <div className="flex">
            <div className="flex flex-col space-y-1 pr-2 border-r border-white/10">
                {presets.map((preset) => (
                    <Button
                        key={preset.label}
                        variant="ghost"
                        className="w-full justify-start h-auto py-1 px-2 text-sm text-white hover:bg-white/10 hover:text-white"
                        onClick={() => setDate(preset.range)}
                    >
                        {preset.label}
                    </Button>
                ))}
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ptBR}
              className="p-0 bg-transparent text-white"
              classNames={{
                  caption: 'text-white',
                  caption_label: 'text-white',
                  nav_button: 'text-white hover:bg-white/10',
                  head_cell: 'text-white/60',
                  day: 'text-white hover:bg-white/10',
                  day_selected: 'bg-red-600 text-white hover:bg-red-700',
                  day_today: 'bg-white/20 text-white',
                  day_outside: 'text-white/40',
                  day_range_middle: 'bg-red-600/30 text-white',
              }}
            />
        </div>
      </PopoverContent>
    </Popover>
  )
}

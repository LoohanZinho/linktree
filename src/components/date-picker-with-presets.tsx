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
              className="p-0"
              classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-white",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center text-white",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-transparent p-0 text-white opacity-50 hover:opacity-100 hover:bg-white/10 border-none"
                  ),
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-white rounded-md hover:bg-white/10",
                  day_selected: "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700",
                  day_today: "bg-white/20 text-white",
                  day_outside: "text-gray-500 opacity-50",
                  day_disabled: "text-gray-600 opacity-50",
                  day_range_middle: "aria-selected:bg-red-600/30 aria-selected:text-white rounded-none",
                  day_hidden: "invisible",
              }}
            />
        </div>
      </PopoverContent>
    </Popover>
  )
}

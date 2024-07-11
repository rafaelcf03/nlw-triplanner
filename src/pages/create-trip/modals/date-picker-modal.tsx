import { X } from "lucide-react";
import { Button } from "../../../components/button";
import { DayPicker } from "react-day-picker";
import { DatePickerModalProps } from "../../../interfaces/modals-interface";
import { ptBR } from "date-fns/locale";

export function DatePickerModal({
  closeDatePickerModal,
  eventDateRange,
  setEventDateRange,
  submitDate,
}: DatePickerModalProps) {
  return (
    // Modal date range picker
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        {/* Título e subtítulo */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-sky-300">
              Selecione uma data
            </h2>
            <button type="button" onClick={closeDatePickerModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
        </div>

        <DayPicker
          mode="range"
          selected={eventDateRange}
          onSelect={setEventDateRange}
          captionLayout="dropdown-buttons"
          fromYear={2000}
          toYear={3000}
          locale={ptBR}
          className="text-sky-300"
        />
        <Button variant="primary" size="full" onClick={submitDate}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}

import { X } from "lucide-react";
import { Button } from "../../../components/button";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { DatePickerModalProps } from "../../../interfaces/modals-interface";

export function DatePickerModal({
  closeDatePickerModal,
  eventDateRange,
  setEventDateRange,
}: DatePickerModalProps) {
  return (
    // Modal date range picker
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        {/* Título e subtítulo */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecione uma data</h2>
            <button type="button" onClick={closeDatePickerModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
        </div>

        <DayPicker
          mode="range"
          selected={eventDateRange}
          onSelect={setEventDateRange}
        />
      </div>
    </div>
  );
}

import { DateRange } from "react-day-picker";

export interface PlaceDateFormProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventDateRange: (dateRange: DateRange | undefined) => void;
  eventDateRange: DateRange | undefined;
}

export interface GuestsInputProps {
  openGuestsModal: () => void;
  emailsToInvite: string[];
  openConfirmModal: () => void;
}

export interface Destination {
  id: number
  cityName: string
  uf: string
  state: string
}
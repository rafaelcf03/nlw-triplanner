import { FormEvent } from "react";
import { DateRange } from "react-day-picker";

export interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export interface AddLinkModalProps {
  closeAddLinkModal: () => void;
}

export interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  emailsToInvite: string[];
  removeEmailToInvite: (email: string) => void;
  addEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
}

export interface DatePickerModalProps {
  closeDatePickerModal: () => void;
  eventDateRange: DateRange | undefined;
  setEventDateRange: (dateRange: DateRange | undefined) => void;
  submitDate: () => void;
}

export interface ConfirmTripModalProps {
  closeConfirmModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerData: (data: { name: string; email: string }) => void;
  ownerData: { name: string; email: string };
  destination: string | undefined;
  eventDateRange: DateRange | undefined;
}

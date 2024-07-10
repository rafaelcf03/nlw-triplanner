import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./modals/invite-guests-modal";
import { ConfirmTripModal } from "./modals/confirm-trip-modal";
import { GuestsInput } from "./steps/guests-input";
import { Footer } from "./footer";
import { PlaceDateForm } from "./steps/place-date-form";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import LoadingPage from "../loading-page";

export function CreateTrip() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [destination, setDestination] = useState("");
  const [ownerData, setOwnerData] = useState({ name: "", email: "" });
  const [eventDateRange, setEventDateRange] = useState<DateRange | undefined>();

  const [emailsToInvite, setEmailsToInvite] = useState([""]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function addEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite && emailsToInvite.includes(email)) {
      alert("E-mail já existe na lista.");
      return;
    }

    if (emailsToInvite) {
      setEmailsToInvite([...emailsToInvite, email]);

      event.currentTarget.reset();
    }
  }

  function removeEmailToInvite(email: string) {
    const updatedList = emailsToInvite
      ? emailsToInvite.filter((item) => item !== email)
      : null;

    if (updatedList) {
      setEmailsToInvite(updatedList);
    }
  }

  function openConfirmModal() {
    setIsConfirmModalOpen(true);
  }

  function closeConfirmModal() {
    setIsConfirmModalOpen(false);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) {
      return;
    }

    if (!eventDateRange?.from || !eventDateRange?.to) {
      return;
    }

    const response = await api.post("/trips", {
      destination: destination,
      starts_at: eventDateRange?.from,
      ends_at: eventDateRange?.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerData.name,
      owner_email: ownerData.email,
    });

    if (response.data) {
      const { tripId } = response.data;

      navigate(`/trips/${tripId}`);
    } else {
      return <LoadingPage />;
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        {/* Página inicial */}
        {/* Logo com título e subtítulo */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1">
            <img src="/logo.svg" alt="triplanner" className="size-10" />
            <p className="text-zinc-200 text-2xl font-mono mt-2">Triplanner</p>
          </div>

          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem
          </p>
        </div>

        {/* Form com local e data */}
        <div className="space-y-4">
          {/* Inputs */}
          <PlaceDateForm
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            closeGuestsInput={closeGuestsInput}
            setDestination={setDestination}
            setEventDateRange={setEventDateRange}
            eventDateRange={eventDateRange}
          />

          {/* Seção para confirmar viagem */}
          {isGuestsInputOpen && (
            <GuestsInput
              openGuestsModal={openGuestsModal}
              emailsToInvite={emailsToInvite}
              openConfirmModal={openConfirmModal}
            />
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Modal para adicionar convidados */}
      {isGuestsModalOpen && (
        <InviteGuestsModal
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailToInvite={removeEmailToInvite}
          addEmailToInvite={addEmailToInvite}
        />
      )}

      {/* Modal para confirmar viagem */}
      {isConfirmModalOpen && (
        <ConfirmTripModal
          closeConfirmModal={closeConfirmModal}
          createTrip={createTrip}
          setOwnerData={setOwnerData}
          ownerData={ownerData}
        />
      )}
    </div>
  );
}

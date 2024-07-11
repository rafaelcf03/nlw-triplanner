import { MailIcon, User, X } from "lucide-react";
import { Button } from "../../../components/button";
import { ConfirmTripModalProps } from "../../../interfaces/modals-interface";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function ConfirmTripModal({
  closeConfirmModal,
  createTrip,
  setOwnerData,
  ownerData,
  destination,
  eventDateRange,
}: ConfirmTripModalProps) {
  const displayedDate =
    eventDateRange && eventDateRange.from && eventDateRange.to
      ? format(eventDateRange.from, "d' de 'LLLL", { locale: ptBR })
          .concat(" até ")
          .concat(format(eventDateRange.to, "d' de 'LLLL", { locale: ptBR }))
      : null;

  return (
    // Modal de confirmação
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        {/* Título e subtítulo */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação da viagem
            </h2>
            <button type="button" onClick={closeConfirmModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="text-zinc-100 font-semibold">{destination}</span>{" "}
            nas datas de{" "}
            <span className="text-zinc-100 font-semibold">{displayedDate}</span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>
        {/* Form de conclusão */}
        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className=" text-zinc-400 size-5 " />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 w-50 outline-none"
              type="text"
              name="name"
              placeholder="Seu nome completo"
              onChange={(event) =>
                setOwnerData({ ...ownerData, name: event.target.value })
              }
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MailIcon className=" text-zinc-400 size-5 " />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 w-50 outline-none"
              type="email"
              name="email"
              placeholder="Seu e-mail"
              onChange={(event) =>
                setOwnerData({ ...ownerData, email: event.target.value })
              }
            />
          </div>

          <Button variant="primary" type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}

import { AtSign, Plus, X } from "lucide-react";
import { Button } from "../../../components/button";
import { InviteGuestsModalProps } from "../../../interfaces/modals-interface";

export function InviteGuestsModal({
  closeGuestsModal,
  emailsToInvite,
  removeEmailToInvite,
  addEmailToInvite,
}: InviteGuestsModalProps) {
  return (
    // Modal para envio de convites (e-mail)
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        {/* Título e subtítulo */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button type="button" onClick={closeGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados receberão um e-mail para confirmar a participação na
            viagem
          </p>
        </div>
        {/* Seção de listagem e-mails */}
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.length > 0
            ? emailsToInvite.map((email) => {
                return (
                  <div
                    key={email}
                    className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                  >
                    <span className="text-zinc-300">{email}</span>
                    <button type="button">
                      <X
                        onClick={() => removeEmailToInvite(email)}
                        className="size-4 text-zinc-400"
                      />
                    </button>
                  </div>
                );
              })
            : null}
        </div>
        {/* Seção de input para adicionar novos e-mails */}
        {/* separador */}
        <div className="w-ful h-px bg-zinc-800"></div>

        <form
          onSubmit={addEmailToInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="flex items-center flex-1 gap-2">
            <AtSign className=" text-zinc-400 size-5 " />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 w-50 outline-none"
              type="email"
              name="email"
              placeholder="Informe o e-mail do convidado"
            />
          </div>

          <Button variant="primary" type="submit">
            Adicionar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

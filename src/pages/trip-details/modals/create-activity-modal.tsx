import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../../components/button";
import { FormEvent } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { CreateActivityModalProps } from "../../../interfaces/modals-interface";

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString();
    const occurs_at = formData.get("occurs_at")?.toString();

    try {
      const response = await api.post(`/trips/${tripId}/activities`, {
        title: title,
        occurs_at: occurs_at,
      });

      if (response.status === HttpStatusCode.Ok) {
        alert("Atividade criada com sucesso!");
        closeCreateActivityModal();
        document.location.reload();
      }
    } catch (error) {
      alert("Ocorreu um erro ao criar a atividade. Tente novamente.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        {/* Título e subtítulo */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>

            <button type="button" onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar as atividades
          </p>
        </div>
        {/* Form de cadastro de atividade */}
        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className=" text-zinc-400 size-5 " />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 w-50 outline-none"
              type="text"
              name="title"
              placeholder="Qual a atividade?"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className=" text-zinc-400 size-5" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 w-50 outline-none flex-1"
              type="datetime-local"
              name="occurs_at"
              placeholder="Data e horário da atividade"
            />
          </div>
          <Button variant="primary" type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}

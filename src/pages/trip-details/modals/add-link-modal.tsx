import { Tag, X, Link2 } from "lucide-react";
import { Button } from "../../../components/button";
import { FormEvent } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { AddLinkModalProps } from "../../../interfaces/modals-interface";

export function AddLinkModal({ closeAddLinkModal }: AddLinkModalProps) {
  const { tripId } = useParams();

  async function addLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString();
    const url = formData.get("url")?.toString();

    try {
      const response = await api.post(`/trips/${tripId}/links`, {
        title: title,
        url: url,
      });

      if (response.status === HttpStatusCode.Ok) {
        alert("Link cadastrado com sucesso!");
        closeAddLinkModal();
        document.location.reload();
      }
    } catch (error) {
      alert("Ocorreu um erro ao cadastrar um link. Tente novamente.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        {/* Título e subtítulo */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar novo link</h2>

            <button type="button" onClick={closeAddLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar os links importantes
          </p>
        </div>
        {/* Form de cadastro de links */}
        <form onSubmit={addLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className=" text-zinc-400 size-5 " />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 w-50 outline-none"
              type="text"
              name="title"
              placeholder="Título do link"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className=" text-zinc-400 size-5" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 w-50 outline-none flex-1"
              type="url"
              name="url"
              placeholder="URL"
            />
          </div>
          <Button variant="primary" type="submit" size="full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}

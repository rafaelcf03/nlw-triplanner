import {
  Plus,
} from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./modals/create-activity-modal";
import { ImportantLinks } from "./important-links";
import { GuestsList } from "./guests-list";
import { Activities } from "./activities";
import { DestinationHeader } from "./destination-header";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      {/* begin header */}
      <DestinationHeader />

      {/* seção principal */}
      <main className="flex gap-16 px-4">
        {/* atividades */}
        <div className="flex-1 space-y-6">
          {/* header */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openCreateActivityModal}
              className="bg-sky-400 text-sky-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-sky-500"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          {/* listagem das atividades por dia*/}
          <Activities />
        </div>

        {/* container com links importantes e convidados */}
        <div className="w-80 space-y-6">
          {/* container de links importantes */}
          <ImportantLinks />

          {/* separador */}
          <div className="w-full h-px bg-zinc-800"></div>

          {/* container de convidados */}
          <GuestsList />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}

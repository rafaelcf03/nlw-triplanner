import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddLinkModal } from "./modals/add-link-modal";
import { api } from "../../lib/axios";
import { Link } from "../../interfaces/trip-details-interface";

export function ImportantLinks() {
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);

  function openAddLinkModal() {
    setIsAddLinkModalOpen(true);
  }

  function closeAddLinkModal() {
    setIsAddLinkModalOpen(false);
  }

  const { tripId } = useParams();

  const [links, setLinks] = useState<Link[] | undefined>();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      {/* card com título e link */}
      <div className="space-y-5">
        {links?.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <a
                href={link.url}
                className="block text-xs text-zinc-100 truncate hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>
            <Link2 className="text-zinc-400 size-5" />
          </div>
        ))}
      </div>

      {isAddLinkModalOpen && (
        <AddLinkModal closeAddLinkModal={closeAddLinkModal} />
      )}

      {/* botão cadastrar */}
      <Button variant="secondary" onClick={openAddLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}

import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Trip } from "../../interfaces/trip-details-interface";

export function DestinationHeader() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL")
        .concat(" até ")
        .concat(format(trip.ends_at, "d' de 'LLL"))
    : null;

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local e data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}

import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Activity } from "../../interfaces/trip-details-interface";

export function Activities() {
  const { tripId } = useParams();

  const [activities, setActivities] = useState<Activity[] | undefined>();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities.activities));
  }, [tripId]);

  return (
    <div className="space-y-8 ">
      {/* card de atividades */}
      {activities?.map((activity) => {
        return (
          <div key={activity.id} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              {/* data e dia da semana */}
              <span className="text-xl text-zinc-300 font-semibold">
                Dia {format(activity.occurs_at, "d' de 'LLL")}
              </span>
              <span className="text-xs text-zinc-500">
                {format(activity.occurs_at, "EEEE", { locale: ptBR })}
              </span>
            </div>
            {/* card com atividades */}
            {activity.title && activity.title.length > 0 ? (
              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck className="size-5 text-sky-300" />
                  {/* título da atividade */}
                  <span className="text-zinc-100">{activity.title}</span>
                  {/* horário da atividade */}
                  <span className="text-zinc-400 text-sm ml-auto">
                    {format(activity.occurs_at, "HH:mm")}h
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada nessa data
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

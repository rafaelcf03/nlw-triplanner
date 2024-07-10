import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DatePickerModal } from "../modals/date-picker-modal";
import { format } from "date-fns";
import { PlaceDateFormProps } from "../../../interfaces/create-trip-interface";

export function PlaceDateForm({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventDateRange,
  eventDateRange,
}: PlaceDateFormProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  // const [destinationList, setDestinationList] = useState<Destination>();

  function openDatePickerModal() {
    return setIsDatePickerOpen(true);
  }

  function closeDatePickerModal() {
    return setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventDateRange && eventDateRange.from && eventDateRange.to
      ? format(eventDateRange.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventDateRange.to, "d' de 'LLL"))
      : null;

  // useEffect(() => {
  //   async function fetchData() {
  //     const today = new Date().toDateString();
  //     const localKey = `IBGE-${today}`;

  //     if (localStorage.getItem(localKey)) {
  //       const apiData = JSON.parse(localStorage.getItem(localKey));
  //       setDestinationList(apiData);
  //       return;
  //     }

  //     localStorage.clear();

  //     try {
  //       const response = await axios
  //         .get(`https://servicodados.ibge.gov.br/api/v1/localidades/distritos`)
  //         .then((response) => {
  //           response.data.map((item: any) => {
  //             const data = {
  //               id: item.id,
  //               cityName: item.nome,
  //               uf: item.municipio.microrregiao.mesorregiao.uf.sigla,
  //               state: item.municipio.microrregiao.mesorregiao.uf.nome,
  //             };
  //             setDestinationList(data);
  //             localStorage.setItem(localKey, JSON.stringify(data));
  //           });
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, []);

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      {/* input para informar destino */}
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          type="text"
          name="place"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputOpen}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      {/* modal para selecionar data */}
      <button
        onClick={openDatePickerModal}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 outline-none text-left w-[240px]"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-48 flex-1">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <DatePickerModal
          closeDatePickerModal={closeDatePickerModal}
          eventDateRange={eventDateRange}
          setEventDateRange={setEventDateRange}
        />
      )}

      {/* separador */}
      <div className="w-px h-6 bg-zinc-800" />

      {/* Condicional para alterar botão*/}
      {isGuestsInputOpen ? (
        <Button variant="secondary" onClick={closeGuestsInput}>
          Alterar local e data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button variant="primary" onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}

import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DatePickerModal } from "../modals/date-picker-modal";
import { format } from "date-fns";
import { PlaceDateFormProps } from "../../../interfaces/create-trip-interface";
import Select, { SingleValue } from "react-select";

const cities = [
  { value: "Goiânia - GO", label: "Goiânia - GO", color: "#a1a1aaa" },
  { value: "São Paulo - SP", label: "São Paulo - SP", color: "#a1a1aaa" },
  {
    value: "Rio de Janeiro - RJ",
    label: "Rio de Janeiro - RJ",
    color: "#a1a1aaa",
  },
];

type OptionType = {
  label: string;
  value: string;
  color: string;
};

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
    setEventDateRange(undefined);
    return setIsDatePickerOpen(false);
  }

  function submitDate() {
    return setIsDatePickerOpen(false);
  }

  function changeDestination(e: SingleValue<OptionType>) {
    return e ? setDestination(e.value) : null;
  }

  const displayedDate =
    eventDateRange && eventDateRange.from && eventDateRange.to
      ? format(eventDateRange.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventDateRange.to, "d' de 'LLL"))
      : null;

  const NoOptionsMessage = () => {
    return <p>Sem resultado</p>;
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      background: "transparent",
      display: "flex",
      flexWrap: "nowrap",
      border: 0,
      boxShadow: 0,
      cursor: "text",
      caretColor: "#a1a1aa",
      color: "#a1a1aa",
    }),
    menu: (provided: any) => ({
      ...provided,
      background: "black",
      color: "white",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontWeight: state.isSelected ? "bold" : "normal",
      color: "white",
      backgroundColor: state.isFocused ? "grey" : state.data.color,
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: state.data.color,
      marginLeft: 0,
    }),
  };

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
      <form className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        {/* <input
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          type="text"
          name="place"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputOpen}
          onChange={(event) => setDestination(event.target.value)}
          required={true}
        /> */}
        <Select
          required={true}
          onChange={changeDestination}
          className="text-lg placeholder-zinc-400 flex-1 m-0 text-left"
          options={cities}
          isSearchable
          isClearable
          openMenuOnClick={false}
          placeholder={"Para onde você vai?"}
          components={{
            DropdownIndicator: () => null,
            ClearIndicator: () => null,
          }}
          styles={customStyles}
          noOptionsMessage={NoOptionsMessage}
          isDisabled={isGuestsInputOpen}
        />
        <button
          type="button"
          onClick={openDatePickerModal}
          disabled={isGuestsInputOpen}
          className="flex items-center gap-2 outline-none text-left w-[220px]"
        >
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-l text-zinc-400 w-48 flex-1">
            {displayedDate || "Quando?"}
          </span>
        </button>
      </form>

      {/* modal para selecionar data */}
      {isDatePickerOpen && (
        <DatePickerModal
          closeDatePickerModal={closeDatePickerModal}
          eventDateRange={eventDateRange}
          setEventDateRange={setEventDateRange}
          submitDate={submitDate}
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

import { useEffect } from "react";
import Header from "../../components/header";
import { useApi } from "../../hooks/useApi";
import { RaceProps } from "../../types/types";

const HistoricalPage = () => {
  const { fetchData, data } = useApi();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await fetchData(`ride/${user.id}`);
  };

  return (
    <>
      <Header />
      <div className="flex w-full h-14 items-center justify-center gap-4">
        <span className="font-medium text-blue-400">Filtro por Motorista:</span>
        <select
          name=""
          id=""
          className="border py-1 px-1 rounded-lg border-blue-400 text-blue-400"
        >
          {data &&
            data[0]?.races?.map((race: { id: number; driverName: string }) => (
              <option key={race.id} value={race.id}>
                {race.driverName}
              </option>
            ))}
        </select>
        <button className="w-[100px] bg-blue-400 py-1 text-white rounded-lg">
          Aplicar
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mt-2">
        {data &&
          data[0]?.races?.map((race: RaceProps) => (
            <div
              key={race.id}
              className="w-4/5 flex flex-col py-2 px-2 gap-1 border-b border-blue-400"
            >
              <div className="flex justify-between">
                <span>Nome: {race.driverName}</span>
                <span>
                  Data:{" "}
                  {new Date(race.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex flex-col">
                <span>Origen: {race.originName}</span>
                <span>Destino: {race.destinyName}</span>
              </div>
              <div className="flex justify-between">
                <span>Distancia: {Math.floor(race.distance / 1000)} Km</span>
                <span>Tempo: {Math.ceil(race.duration / 60)} minutos</span>
                <span>
                  Valor:{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(race.totalPrice)}
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default HistoricalPage;

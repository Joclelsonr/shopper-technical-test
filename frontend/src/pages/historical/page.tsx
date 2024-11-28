import Header from "../../components/header";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { RaceProps } from "../../types/types";
import { useForm, SubmitHandler } from "react-hook-form";

type IFormInput = {
  driver_id: number;
};

const HistoricalPage = () => {
  const { fetchData, data } = useApi();
  const { register, handleSubmit } = useForm<IFormInput>();
  const [filteredDrivres, setFilteredDrivers] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const getData = async () => {
      await fetchData(`ride/${user.id}`);
    };

    getData();
  }, []);

  useEffect(() => {
    if (isInitialLoad && data?.races) {
      const uniqueDrivers = data?.races?.filter(
        (race: RaceProps, index: number, self: RaceProps[]) =>
          self.findIndex((r) => r.driverName === race.driverName) === index
      );
      setFilteredDrivers(uniqueDrivers);
      setIsInitialLoad(false);
    }
  }, [data, isInitialLoad]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetchData(`ride/${user.id}`, data);
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full h-14 items-center justify-center gap-4">
          <span className="font-medium text-blue-400">
            Filtro por Motorista:
          </span>
          <select
            {...register("driver_id")}
            className="border py-1 px-1 rounded-lg border-blue-400 text-blue-400"
          >
            {filteredDrivres &&
              filteredDrivres.map(
                (race: { driverId: number; driverName: string }) => (
                  <option key={race.driverId} value={race.driverId}>
                    {race.driverName}
                  </option>
                )
              )}
          </select>
          <button
            type="submit"
            className="w-[100px] bg-blue-400 py-1 text-white rounded-lg"
          >
            Aplicar
          </button>
        </div>
      </form>
      <div className="flex flex-col justify-center items-center mt-2">
        {data &&
          data.races.map((race: RaceProps) => (
            <div
              key={race.id}
              className="w-4/5 flex flex-col py-2 px-2 gap-1 border-b border-blue-400"
            >
              <div className="flex justify-between">
                <span className="text-gray-600">Nome: {race.driverName}</span>
                <span className="text-gray-600">
                  Data:{" "}
                  {new Date(race.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Origen: {race.originName}</span>
                <span className="text-gray-600">
                  Destino: {race.destinyName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Distancia: {Math.floor(race.distance / 1000)} Km
                </span>
                <span className="text-gray-600">
                  Tempo: {Math.ceil(race.duration / 60)} minutos
                </span>
                <span className="text-gray-600">
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

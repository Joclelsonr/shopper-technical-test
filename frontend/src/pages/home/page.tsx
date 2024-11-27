import GoogleMapComponent from "../../components/googleMap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import Header from "../../components/header";
import { useApi } from "../../hooks/useApi";

type Inputs = {
  origin: string;
  destination: string;
};

const HomePage = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const { fetchPostData, data, error } = useApi();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const geocodeAddress = (
    address: string
  ): Promise<{ lat: number; lng: number }> => {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (
          status === google.maps.GeocoderStatus.OK &&
          results &&
          results[0]?.geometry?.location
        ) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(`Geocode falhou: ${status}`);
        }
      });
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    if (!inputs.origin || !inputs.destination) return;
    try {
      const originCoords = await geocodeAddress(inputs.origin);
      const destinationCoords = await geocodeAddress(inputs.destination);
      await fetchPostData("ride/estimate", {
        origin: {
          latitude: originCoords.lat,
          longitude: originCoords.lng,
        },
        destination: {
          latitude: destinationCoords.lat,
          longitude: destinationCoords.lng,
        },
        customer_id: user.id,
      });
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: originCoords,
          destination: destinationCoords,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
            setMarkers([originCoords, destinationCoords]);
            reset();
          } else {
            console.error(`Erro ao calcular a rota: ${status}`);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ data, error });

  return (
    <>
      <Header />
      <div className="flex w-full h-[500px] my-6 mx-4">
        <div className="flex w-2/3">
          {
            <GoogleMapComponent
              directionsResponse={directionsResponse}
              markers={markers}
            />
          }
        </div>
        <div className="flex flex-1 items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label htmlFor="origin" className="text-blue-400 font-semibold">
                Origem:
              </label>
              <input
                type="text"
                id="origin"
                {...register("origin")}
                className="w-[300px] border-2 border-blue-400 rounded-lg p-1.5 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="destination"
                className="text-blue-400 font-semibold"
              >
                Destino:
              </label>
              <input
                type="text"
                id="destination"
                {...register("destination")}
                className="w-[300px] border-2 border-blue-400 rounded-lg p-1.5 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-[300px] bg-blue-400 py-1.5 px-6 mt-6 text-white rounded-lg"
            >
              Calcular Rota
            </button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 py-6 mx-6">
        {data?.drivers?.map(
          (ride: {
            options: {
              name: string;
              description: string;
              value: number;
              vehicle: string;
              review: {
                rating: number;
              };
            };
          }) => {
            return (
              <div
                key={ride.options.name}
                className="flex flex-col items-center bg-blue-200 py-2 px-2 gap-2 rounded-lg shadow-lg"
              >
                <div className="flex justify-between gap-6">
                  <h2>
                    <strong>Nome: </strong> {ride.options.name}
                  </h2>
                  <p>
                    <strong>Avaliação: </strong> {ride.options.review.rating}/10
                  </p>
                </div>
                <p className="text-justify">
                  <strong>Descrição:</strong> {ride.options.description}
                </p>
                <p>
                  <strong>Veículo:</strong> {ride.options.vehicle}
                </p>
                <p>
                  <strong>Valor:</strong> R${" "}
                  {ride.options.value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <button className="w-[300px] bg-blue-400 py-1  text-white rounded-lg">
                  Selecionar Motorista
                </button>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default HomePage;

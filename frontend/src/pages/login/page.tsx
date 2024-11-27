import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  email: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/customer`, inputs)
      .then((res) => {
        if (res.statusText === "OK") {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="w-full h-screen flex">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="font-semibold text-3xl text-blue-400 mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome"
              className="w-[300px] border-2 border-blue-400 rounded-lg p-1.5 outline-none"
              {...register("name")}
            />
            <input
              type="email"
              placeholder="E-mail"
              className="w-[300px] border-2 border-blue-400 rounded-lg p-1.5 outline-none"
              {...register("email")}
            />
          </div>
          <button
            type="submit"
            className="w-[300px] bg-blue-400 py-1.5 px-6 mt-6 text-white rounded-lg"
          >
            Entrar
          </button>
        </form>
      </div>
      <div className="flex flex-1  items-center justify-center">
        <div className="w-full h-full">
          <img
            src="./googlemaps.png"
            alt="google maps"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

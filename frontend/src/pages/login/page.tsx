import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Inputs = {
  name: string;
  email: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
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
      .catch((error) => {
        if (error.response.data.error_description.includes("exists")) {
          toast.info("Usuário já cadastrado, redirecionando...");
          navigate("/home");
        } else {
          toast.error("Erro ao cadastrar usuário");
        }
      });
  };

  return (
    <div className="w-full h-screen flex">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="font-semibold text-3xl text-blue-400 mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Nome"
                className="w-[300px] border-2 border-blue-400 rounded-lg p-1.5 outline-none"
                {...register("name", { required: "Digite seu nome" })}
              />
              <span className="h-6">
                <p
                  className={`text-sm text-red-400 ${
                    errors?.name ? "" : "hidden"
                  }`}
                >
                  {errors?.name?.message}
                </p>
              </span>
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="E-mail"
                className="w-[300px] border-2 border-blue-400 rounded-lg p-1.5 outline-none"
                {...register("email", { required: "Digite seu e-mail" })}
              />
              <span className="h-5">
                <p
                  className={`text-sm text-red-400 ${
                    errors?.email ? "" : "hidden"
                  }`}
                >
                  {errors?.email?.message}
                </p>
              </span>
            </div>
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

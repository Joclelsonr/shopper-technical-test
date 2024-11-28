import Header from "../../components/header";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <div className="w-full h-96 flex flex-col justify-center items-center gap-6">
        <h1 className="text-5xl text-blue-400">Erro Inesperado :(</h1>
        <p className="text-gray-400">
          A página que você tentou acessar não existe!
        </p>
      </div>
    </>
  );
};

export default ErrorPage;

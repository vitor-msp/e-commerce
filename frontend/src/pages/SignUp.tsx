import { Navbar } from "../components/Navbar";

export const SignUp = () => {
  return (
    <>
      <Navbar />
      <form action="" className="d-flex flex-column jusify-content-center">
        <div className="mx-auto">
          <label htmlFor="">E-mail:</label>
          <input type="email" className="form-control w-auto" />
        </div>
        <div className="mx-auto">
          <label htmlFor="">Senha:</label>
          <input type="password" className="form-control w-auto" />
        </div>
        <div className="mx-auto">
          <label htmlFor="">Confirmação da Senha:</label>
          <input type="password" className="form-control w-auto" />
        </div>
        <div className="mx-auto my-2">
          <input type="reset" className="btn btn-outline-primary mx-2" />
          <button type="button" className="btn btn-primary mx-2">
            Cadastrar
          </button>
        </div>
      </form>
    </>
  );
};

import { useState } from "react";
import { Navbar } from "../components/Navbar";

type IUserSignUp = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const DEFAULT_USER: IUserSignUp = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const SignUp = () => {
  const [user, setUser] = useState<IUserSignUp>(DEFAULT_USER);

  const updateUser = (event: any): void => {
    const field = event.target.name;
    const newValue = event.target.value;
    setUser({
      ...user,
      [field]: newValue,
    });
  };

  const resetUser = (): void => {
    setUser(DEFAULT_USER);
  };

  const signUp = (): void => {
    if (!passwordIsValid()) {
      alert("As senhas não são iguais.");
      return;
    }
  };

  const passwordIsValid = (): boolean => {
    const { password, passwordConfirmation } = user;
    return password.localeCompare(passwordConfirmation) === 0;
  };

  return (
    <>
      <Navbar />
      <form action="" className="d-flex flex-column jusify-content-center">
        <div className="mx-auto">
          <label htmlFor="">E-mail:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={updateUser}
            className="form-control w-auto"
            required={true}
          />
        </div>
        <div className="mx-auto">
          <label htmlFor="">Senha:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={updateUser}
            className="form-control w-auto"
            required={true}
          />
        </div>
        <div className="mx-auto">
          <label htmlFor="">Confirmação da Senha:</label>
          <input
            type="password"
            name="passwordConfirmation"
            value={user.passwordConfirmation}
            onChange={updateUser}
            className="form-control w-auto"
            required={true}
          />
        </div>
        <div className="mx-auto my-2">
          <input
            type="reset"
            onClick={resetUser}
            className="btn btn-outline-primary mx-2"
          />
          <button
            type="button"
            onClick={signUp}
            className="btn btn-primary mx-2"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </>
  );
};

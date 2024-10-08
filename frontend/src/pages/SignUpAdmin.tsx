import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../factory";
import { IUserSignUp } from "../services/api/user/UserApi";
import { LOCAL_STORAGE_JWT_KEY_NAME } from "../store/user/user.types";

const DEFAULT_USER: IUserSignUp = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const SignUpAdmin = () => {
  const [user, setUser] = useState<IUserSignUp>(DEFAULT_USER);
  const navigate = useNavigate();

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

  const signUp = async (event: any): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    if (!passwordIsValid()) {
      alert("As senhas não são iguais.");
      return;
    }
    try {
      const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY_NAME);
      if (!jwt) return navigate("/signin");
      try {
        await userApi.signUpAdmin(user, jwt);
        alert("Administrador criado com sucesso.");
        navigate("/admin");
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert(error);
    }
  };

  const passwordIsValid = (): boolean => {
    const { password, passwordConfirmation } = user;
    return password.localeCompare(passwordConfirmation) === 0;
  };

  const backToAdmin = (): void => {
    navigate("/admin");
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={backToAdmin}
        className="btn btn-primary mx-2"
      >
        {"<< voltar"}
      </button>

      <div>
        <h2 className="mx-2">Cadastre um usuário administrador:</h2>
        <form
          action=""
          onSubmit={signUp}
          className="d-flex flex-column jusify-content-center"
        >
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
              value={"Limpar"}
            />
            <input
              type="submit"
              className="btn btn-primary mx-2"
              value={"Cadastrar"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

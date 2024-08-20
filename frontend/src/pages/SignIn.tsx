import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { IUserSignIn } from "../services/api/user/UserApi";
import { AppDispatch, RootState } from "../store";
import { signIn } from "../store/user/user.middleware";
import { Role } from "../store/user/user.types";
import { GitHubIcon } from "../components/GitHubIcon";

const DEFAULT_USER: IUserSignIn = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const [user, setUser] = useState<IUserSignIn>(DEFAULT_USER);
  const userStatus = useSelector((state: RootState) => state.user.user);
  const userRole = useSelector((state: RootState) => state.user.user.role);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userStatus.isLogged) {
      if (userStatus.wantsBuy) {
        navigate("/checkout");
        return;
      }
      navigate("/products");
    }
  }, [userStatus, navigate]);

  useEffect(() => {
    if (userRole === Role.Administrator) return navigate("/admin");
  }, [userRole, navigate]);

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

  const executeSignIn = async (event: any): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(signIn(user));
  };

  return (
    <>
      <Navbar />
      <div>
        <h2 className="mx-2">Acesse sua conta:</h2>
        <form
          action=""
          className="d-flex flex-column jusify-content-center"
          onSubmit={executeSignIn}
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
              value={"Entrar"}
            />
          </div>
          <div className="mx-auto my-4">
            <a
              href={process.env.REACT_APP_SSO_GITHUB_URL}
              className="btn btn-outline-primary"
            >
              <span className="mx-2">Logar com GitHub</span>
              <GitHubIcon />
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

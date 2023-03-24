import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { IUserSignIn } from "../services/api/user/UserApi";
import { AppDispatch, RootState } from "../store";
import { signIn } from "../store/user/user.middleware";

const DEFAULT_USER: IUserSignIn = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const [user, setUser] = useState<IUserSignIn>(DEFAULT_USER);
  const userStatus = useSelector((state: RootState) => state.user.user);

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
          />
          <input
            type="submit"
            className="btn btn-primary mx-2"
            value={"Entrar"}
          />
        </div>
      </form>
    </>
  );
};

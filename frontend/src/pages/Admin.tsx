import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { signOut } from "../store/user/user.middleware";
import { useEffect } from "react";

export const Admin = () => {
  const userIsLogged = useSelector(
    (state: RootState) => state.user.user.isLogged
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const signupAdmin = (): void => {
    navigate("/admin/signup");
  };

  const executeSignOut = (): void => {
    dispatch(signOut());
  };

  useEffect(() => {
    if (!userIsLogged) navigate("/signin");
  }, [userIsLogged, navigate]);

  return (
    <>
      <div>
        <h2 className="mx-2">Acesso Restrito:</h2>

        <button
          type="button"
          onClick={signupAdmin}
          className="btn btn-primary mx-2"
        >
          Cadastrar novo administrador
        </button>

        <button
          type="button"
          onClick={executeSignOut}
          className="btn btn-outline-primary mx-2"
        >
          Sair
        </button>
      </div>
    </>
  );
};

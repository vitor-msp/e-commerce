import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const navigate = useNavigate();

  const signupAdmin = (): void => {
    navigate("/admin/signup");
  };

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
      </div>
    </>
  );
};

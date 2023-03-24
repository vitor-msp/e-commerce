import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { signOut } from "../store/user/user.middleware";

export const Navbar = () => {
  const userIsLogged = useSelector(
    (state: RootState) => state.user.user.isLogged
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const executeSignOut = (): void => {
    dispatch(signOut());
    navigate("/products");
  };
  return (
    <div className="row">
      <div className="col-12">
        <nav className="navbar navbar-expand-lg">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
              E-Commerce
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <NavLink to={"/products"} className={"nav-link"}>
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/cart"} className={"nav-link"}>
                    Cart
                  </NavLink>
                </li>
                {userIsLogged ? (
                  <>
                    <li className="nav-item">
                      <NavLink to={"/myorders"} className={"nav-link"}>
                        Meus pedidos
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <button onClick={executeSignOut} className={"btn"}>
                        Sair
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink to={"/signup"} className={"nav-link"}>
                        Cadastre-se
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to={"/signin"} className={"nav-link"}>
                        Entrar
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </nav>
      </div>
    </div>
  );
};

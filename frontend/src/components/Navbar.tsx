import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { signOut } from "../store/user/user.middleware";
import { Navbar as NavBarReactBootstrap, Container } from "react-bootstrap";

export const Navbar = () => {
  const userIsLogged = useSelector(
    (state: RootState) => state.user.user.isLogged
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const executeSignOut = (): void => {
    dispatch(signOut());
    navigate("/signin");
  };
  return (
    <div className="mb-2">
      <NavBarReactBootstrap bg="primary" expand="lg">
        <Container>
          <NavBarReactBootstrap.Brand>E-Commerce</NavBarReactBootstrap.Brand>
          <NavBarReactBootstrap.Toggle aria-controls="basic-navbar-nav" />
          <NavBarReactBootstrap.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to={"/products"} className={"nav-link"}>
                  Produtos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/cart"} className={"nav-link"}>
                  Carrinho
                </NavLink>
              </li>
              {userIsLogged ? (
                <>
                  <li className="nav-item">
                    <NavLink to={"/myorders"} className={"nav-link"}>
                      Meus pedidos
                    </NavLink>
                  </li>
                  <li className="nav-item ml-auto">
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
          </NavBarReactBootstrap.Collapse>
        </Container>
      </NavBarReactBootstrap>
    </div>
  );
};

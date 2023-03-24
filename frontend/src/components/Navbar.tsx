import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="row">
      <div className="col-12">
        <nav className="navbar navbar-expand-lg">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
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
                  <NavLink to={"/products"} className={"nav-link "}>
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/cart"} className={"nav-link "}>
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/myorders"} className={"nav-link "}>
                    Meus pedidos
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </nav>
      </div>
    </div>
  );
};

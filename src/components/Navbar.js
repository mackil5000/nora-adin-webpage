import React from "react";
import { Link } from "gatsby";
import logo from "../img/logo.png";

const Navbar = class extends React.Component {
  componentDidMount() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
    
  }

  
  



  render() {
    function maggan() {
      document.getElementById("maggan").classList.toggle("class");
    };
    return (
      
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to="/" className="nav-item nav-link active">
            <figure className="image">
              <div className="col-10">
                <img
                  src={logo}
                  alt="Nora"
                  style={{ width: "88px", paddingTop: "10px" }}
                />
              </div>
            </figure>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={maggan}
          >
            <span className="navbar-toggler-icon " />
          </button>
          <div className="navbar-collapse" id="maggan">
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/om-mig">
                Om mig
              </Link>
              <Link className="nav-item nav-link" to="/kontakt">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;

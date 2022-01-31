import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light static-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="https://img.icons8.com/emoji/48/000000/p-button-emoji.png"
            alt="logo"
          />{" "}
          Upark
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {Auth.loggedIn() ? (
              <>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    to="/AddAddress"
                    className="nav-link py-3 px-0 px-lg-3 rounded text-danger border"
                  >
                    + Add Address
                  </Link>
                </li>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    to="/AddParking"
                    className="nav-link py-3 px-0 px-lg-3 rounded text-danger border"
                  >
                    + Add a Review
                  </Link>
                </li>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    to="/allReviews"
                    className="nav-link py-3 px-0 px-lg-3 rounded border"
                    data-mdb-ripple-color="light"
                    href="/allReviews"
                  >
                    Display Addresses
                  </Link>
                </li>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    className="nav-link py-3 px-0 px-lg-3 rounded border"
                    data-mdb-ripple-color="light"
                    onClick={logout}
                    href="/"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    to="/login"
                    className="nav-link py-3 px-0 px-lg-3 rounded border"
                    data-mdb-ripple-color="light"
                    href="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    to="/signup"
                    className="nav-link py-3 px-0 px-lg-3 rounded border"
                    href="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
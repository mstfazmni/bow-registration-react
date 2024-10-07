import React from "react";
// Import Link from react-router-dom to use bootstrap and replacing <a href="#"> with <Link to="/">
import { Link } from "react-router-dom"; 

const Header = () => {
    return (
        <div>
            <div className="b-example-divider"></div>

            <header>
                <div className="px-3 py-2 bg-dark text-white">
                    <div className="container">
                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                            <Link
                                to="/"
                                className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
                            >
                                <svg
                                    className="bi me-2"
                                    width="40"
                                    height="32"
                                    role="img"
                                    aria-label="Bootstrap"
                                >
                                    <use xlinkHref="#bootstrap" />
                                </svg>
                            </Link>

                            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                                <li>
                                    <Link to="/" className="nav-link text-secondary">
                                        <svg
                                            className="bi d-block mx-auto mb-1"
                                            width="24"
                                            height="24"
                                        >
                                            <use xlinkHref="#home" />
                                        </svg>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard" className="nav-link text-white">
                                        <svg
                                            className="bi d-block mx-auto mb-1"
                                            width="24"
                                            height="24"
                                        >
                                            <use xlinkHref="#speedometer2" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/orders" className="nav-link text-white">
                                        <svg
                                            className="bi d-block mx-auto mb-1"
                                            width="24"
                                            height="24"
                                        >
                                            <use xlinkHref="#table" />
                                        </svg>
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products" className="nav-link text-white">
                                        <svg
                                            className="bi d-block mx-auto mb-1"
                                            width="24"
                                            height="24"
                                        >
                                            <use xlinkHref="#grid" />
                                        </svg>
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/customers" className="nav-link text-white">
                                        <svg
                                            className="bi d-block mx-auto mb-1"
                                            width="24"
                                            height="24"
                                        >
                                            <use xlinkHref="#people-circle" />
                                        </svg>
                                        Customers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2 border-bottom mb-3">
                    <div className="container d-flex flex-wrap justify-content-center">
                        <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search..."
                                aria-label="Search"
                            />
                        </form>

                        <div className="text-end">
                            <button type="button" className="btn btn-light text-dark me-2">
                                Login
                            </button>
                            <button type="button" className="btn btn-primary">
                                Sign-up
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;

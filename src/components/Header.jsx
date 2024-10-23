import React from "react";
// Import Link from react-router-dom to use bootstrap and replacing <a href="#"> with <Link to="/">
import { Link } from "react-router-dom";
import './Header.css'; 
import  {useEffect,useState} from "react";

const Header = ({logInName}) => {

    

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
                                <img className="bow-home-icon" src="https://cdn.prod.website-files.com/6475eb90c59d6bd3bc835d50/648b5df6bca32974dd79ac54_logo%2Bwhite-1.png" alt="Bow-Valley"></img>
                            </Link>
                            
                            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                            <li>
                                    <Link to="/courselisting" className="nav-link text-white">
                                        <svg
                                            className="bi d-block mx-auto mb-1"
                                            width="24"
                                            height="24"
                                        >
                                            <use xlinkHref="#speedometer2" />
                                        </svg>
                                        Programs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup" className="nav-link text-white">
                                        <svg
                                            className="bi d-block mx-auto mb-1"
                                            width="24"
                                            height="24"
                                        >
                                            <use xlinkHref="#speedometer2" />
                                        </svg>
                                        {logInName}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <div className="px-3 py-2 border-bottom mb-3">
                    <div className="container d-flex flex-wrap justify-content-center">

                        <div className="text-end">
                            <button type="button" className="btn btn-light text-dark me-2">
                                Login
                            </button>
                            
                        </div>
                    </div>
                </div> */}
            </header>
        </div>
    );
};

export default Header;

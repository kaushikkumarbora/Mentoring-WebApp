import React from "react";
import "./landing.css"

class NavBar extends React.Component {
    render() {
        return (
            // <!-- Navigation-->
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#Home">The Big Picture</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span
                            className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><a className="nav-link" href="#Home" data-bs-toggle="collapse">Home</a></li>
                            <li className="nav-item"><a className="nav-link" data-bs-toggle="modal" data-bs-target="#signin"
                                href="#!">Sign In</a></li>
                            <li className="nav-item"><a className="nav-link" href="#About" data-bs-toggle="collapse">About</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default NavBar;
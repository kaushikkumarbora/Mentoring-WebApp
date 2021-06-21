import "../landing.css"

function NavBar() {
    return (
        // <!-- Navigation-->
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
            <div className="container px-4 px-lg-5">
                <div className="navbar-brand" >The Big Picture</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span
                        className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active"><div className="nav-link" href="#Home" data-bs-toggle="collapse">Home</div></li>
                        <li className="nav-item"><div className="nav-link" data-bs-toggle="modal" data-bs-target="#signin">Sign In</div></li>
                        <li className="nav-item"><div className="nav-link" href="#About" data-bs-toggle="collapse">About</div></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;
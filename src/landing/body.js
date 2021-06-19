import React from "react";
import "./landing.css"

class BodyContent extends React.Component {

    componentDidMount() {
        document.getElementById("Home").classList.toggle("collapse");
    }

    clickCallback(event) {
        (function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                        }

                        form.classList.add('was-validated')
                    }, false)
                })
        })()
    }

    render() {
        return (
            // <!-- Page Content-->
            <section>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5">
                        <div className="col-lg-6">
                            <div id="Home" className="collapse">
                                <h1 className="mt-5">The Big Picture</h1>
                                <p>
                                    A Supportive Accountability App. The Big Picture enables mentors and
                                    programs to track and encourage mentees' use of the world's best education and wellness apps.
                                </p>
                            </div>
                            <div id="About" className="collapse">
                                <h1 className="mt-5">About</h1>
                                <p>Mentoring Webapp pasta</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="signin">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Sign In</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="form-signin needs-validation">
                                    <div className="form-floating" style={{ paddingBottom: '1ex' }}>
                                        <input type="email" className="form-control" id="floatingInput"
                                            placeholder="name@example.com" />
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="floatingPassword"
                                            placeholder="Password" />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                    <div className="checkbox mb-3">
                                        <label>
                                            <input type="checkbox" value="remember-me" /> Remember me
                                        </label>
                                    </div>
                                    <button className="w-50 btn btn-primary btn-primary" type="submit" onClick={this.clickCallback}>Sign in</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default BodyContent;
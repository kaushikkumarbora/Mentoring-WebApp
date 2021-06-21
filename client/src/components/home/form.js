import React from "react";
import "../landing.css"

class SigninForm extends React.Component {

    clickCallback = (event) => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var [form] = document.querySelectorAll('.needs-validation');

        //Validation
        if (!form.checkValidity()) {
            event.stopPropagation()
            form[0].classList.add('is-invalid');
            form[1].classList.add('is-invalid');
        }
        else {
            form[0].classList.remove('is-invalid');
            form[1].classList.remove('is-invalid');

            const recipeUrl = '/signin';

            var postBody = {
                // TODO change to username later
                id: document.getElementById('floatingInput').value,
                usertype: document.getElementById('floatingSelect').value,
                password: document.getElementById('floatingPassword').value,
            };

            fetch(recipeUrl, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(postBody) // body data type must match "Content-Type" header
            }).then(res => res.json())
            .then(data => {
                if (data.status === '200') {
                    form[0].classList.add('is-valid');
                    form[1].classList.add('is-valid');
                    document.body.removeAttribute('class');
                    document.body.removeAttribute('style');
                    document.body.removeAttribute('data-bs-padding-right');
                    let temp = document.getElementsByClassName('modal-backdrop');
                    temp[0].parentNode.removeChild(temp[0]);
                    this.props.Login(data.id, data.username, data.usertype, data.accessToken);
                }
                else {
                    form[0].classList.add('is-invalid');
                    form[1].classList.add('is-invalid');
                }
            });
        }
    }

    render() {
        return (
            // <!-- Signin Form -->
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
                                    <input type="text" className="form-control" id="floatingInput"
                                        placeholder="Username" required />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating" style={{ paddingBottom: '1ex' }}>
                                    <input type="password" className="form-control" id="floatingPassword"
                                        placeholder="Password" />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <select class="form-control form-control-sm" id="floatingSelect" style={{ appearance: 'button' }}>
                                    <option>Mentor</option>
                                    <option>Mentee</option>
                                </select>
                                <div className="checkbox mb-3">
                                    <label>
                                        <input type="checkbox" value="remember-me" /> Remember me
                                    </label>
                                </div>
                                <button className="w-50 btn btn-primary btn-primary" type="button" onClick={this.clickCallback}>Sign in</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SigninForm;
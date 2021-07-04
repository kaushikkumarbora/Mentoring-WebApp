import React from "react";
import $ from 'jquery';
import "../landing.css";

class RegisterIn extends React.Component {

    closeModal = () => {

        $("#register").find(':input').each(function() {
            switch(this.type) {
                case 'password':
                case 'text':
                case 'textarea':
                case 'file':
                case 'select-one':
                case 'select-multiple':
                case 'date':
                case 'number':
                case 'tel':
                case 'email':
                    $(this).val('');
                    break;
                case 'checkbox':
                case 'radio':
                    this.checked = false;
                    break;
                default:
            }
        });
        $('#btnTocloseRegister').click();
    }

    onRegistration = (event) => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var form = document.querySelectorAll('.needs-validation');
        form = form[1];
        var password =form[1].value;
        var confirmpassword = form[2].value;

        //Validation
        if (!form.checkValidity()) {
            event.stopPropagation()
            form[0].classList.add('is-invalid');
            form[1].classList.add('is-invalid');
            form[2].classList.add('is-invalid');
            form[3].classList.add('is-invalid');
            form[4].classList.add('is-invalid');
            form[5].classList.add('is-invalid');
        }
        else if (password !== confirmpassword) {
            event.stopPropagation()
            form[0].classList.remove('is-invalid');
            form[1].classList.add('is-invalid');
            form[2].classList.add('is-invalid');
            form[3].classList.remove('is-invalid');
            form[4].classList.remove('is-invalid');
            form[5].classList.remove('is-invalid');
        }
        else {
            form[0].classList.remove('is-invalid');
            form[1].classList.remove('is-invalid');
            form[2].classList.remove('is-invalid');
            form[3].classList.remove('is-invalid');
            form[4].classList.remove('is-invalid');
            form[5].classList.remove('is-invalid');

            const recipeUrl = '/register';

            var postBody = {
                // TODO change to username later
                first_name: form[3].value,
                last_name: form[4].value,
                other_info: form[5].value,
                username: form[0].value,
                usertype: form[6].value,
                password: form[1].value,
            };

            fetch(recipeUrl, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postBody) // body data type must match "Content-Type" header
            }).then(res => res.json())
                .then(data => {
                    if (data.status === '200') {
                        this.closeModal();
                    }
                    else {
                        form[0].classList.add('is-invalid');
                    }
                });
        }
    }

    SelectorChange = (event) => {
        var element = document.getElementById('floatingOther');
        if (event.target.value === 'Guardian') {
            element.disabled = false;
            element.placeholder = 'Mentee ID';
            element.nextElementSibling.innerHTML = 'Mentee ID';
        }
        else if (event.target.value === 'Mentee') {
            element.disabled = true;
        }
        else if (event.target.value === 'Mentor') {
            element.disabled = false;
            element.placeholder = 'Department ID';
            element.nextElementSibling.innerHTML = 'Department ID';
        }
    }

    render() {
        return (
            <div className="modal fade" id="register">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Register</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='btnTocloseRegister' aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-signin needs-validation">
                                <div className="form-floating" style={{ paddingBottom: '1ex' }}>
                                    <input type="text" className="form-control" id="floatingUsername"
                                        placeholder="Username" required />
                                    <label htmlFor="floatingUsername">Username</label>
                                </div>
                                <div className="form-floating" style={{ paddingBottom: '1ex' }}>
                                    <input type="password" className="form-control" id="floatingPassword"
                                        placeholder="Password" />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="form-floating" style={{ paddingBottom: '1ex' }}>
                                    <input type="password" className="form-control" id="floatingConfirmPassword"
                                        placeholder="Confirm Password" />
                                    <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                                </div>
                                <div className="form-floating" style={{ paddingBottom: '1ex' }}>
                                    <input type="text" className="form-control" id="floatingFirst"
                                        placeholder="First Name" required />
                                    <label htmlFor="floatingFirst">First Name</label>
                                </div>
                                <div className="form-floating" style={{ paddingBottom: '1ex' }}>
                                    <input type="text" className="form-control" id="floatingLast"
                                        placeholder="Last Name" required />
                                    <label htmlFor="floatingLast">Last Name</label>
                                </div>
                                <div className="form-floating" style={{ paddingBottom: '1ex' }}>
                                    <input type="text" className="form-control" id="floatingOther"
                                        placeholder="Department ID" />
                                    <label htmlFor="floatingOther">Department ID</label>
                                </div>
                                <div style={{ paddingBottom: '1ex' }}>
                                    <select className="form-control form-control-sm" onChange={this.SelectorChange} id="floatingSelect" style={{ appearance: 'button' }}>
                                        <option>Mentor</option>
                                        <option>Mentee</option>
                                        <option>Guardian</option>
                                    </select>
                                </div>
                                <button className="w-50 btn btn-primary btn-primary" type="button" onClick={this.onRegistration}>Register</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterIn;
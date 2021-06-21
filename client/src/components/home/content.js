import React from "react";

class ContentLanding extends React.Component {
    componentDidMount() {
        document.getElementById("Home").classList.toggle("collapse");
    }

    render() {
        return (
            // <!-- Page Content-->
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
        );
    }
}

export default ContentLanding;
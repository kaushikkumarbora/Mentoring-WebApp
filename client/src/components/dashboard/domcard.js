import { Card } from "react-bootstrap";

const DomCreateCards = (Usertype) => {
    return (data, index, arr, usertype = Usertype) => {
        return (
            <div style={{ padding: '1rem' }}>
                <Card style={{ width: '18rem' }} border={(data.end_date) ? 'danger' : 'success'}>
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{(data.end_date) ? 'Expired' : 'Active'}</Card.Subtitle>
                        <Card.Text>
                            {((usertype) => {
                                if (usertype === 'Mentor') {
                                    return (
                                        <>
                                            Student ID: {data.id}
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            Mentor ID: {data.id}
                                            Department: {data.dept_name}
                                        </>
                                    )
                                }
                            })(usertype)}

                        </Card.Text>

                    </Card.Body>
                </Card >
            </div>
        );
    }
}

export default DomCreateCards;
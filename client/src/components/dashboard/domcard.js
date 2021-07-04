import ChatWrapper from './chatwrapper';
import { Card, Button, OverlayTrigger, Popover } from "react-bootstrap";
import "../landing.css";

const DomCreateCards = (Usertype, Cardtype, Refresh = null, AccessToken = null) => {
    return (data, index, arr, usertype = Usertype, cardtype = Cardtype, refresh = Refresh, accessToken = AccessToken) => {
        const borderType = (data, cardtype) => {
            if (cardtype === 2) {
                if (data.status === 'waiting') {
                    return 'warning';
                }
                else if (data.status === 'approved') {
                    return 'success';
                }
                else {
                    return 'danger';
                }
            }
            else {
                return (data.end_date) ? 'danger' : 'success';
            }
        }

        const statusText = (data, cardtype) => {
            if (cardtype === 2) {
                if (data.status === 'waiting') {
                    return 'Waiting';
                }
                else if (data.status === 'approved') {
                    return 'Approved';
                }
                else {
                    return 'Expired';
                }
            }
            else {
                return (data.end_date) ? 'Expired' : 'Active';
            }
        }

        const approveEvent = () => {
            fetch('/event/' + data.event_id, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'x-access-token': accessToken,
                },
                body: JSON.stringify({})
            }).then((data) => data.json())
                .then(() => {
                    refresh();
                })
        }

        var ApproveButton = (<></>);

        if(cardtype === 2 && usertype === 'Mentor' && data.status !== 'expired'){
            ApproveButton = (<><Button variant="primary" onClick={approveEvent}>Approve</Button></>);
        }

        return (
            <div style={{ padding: '1rem' }}>
                <Card style={{ width: '18rem' }} border={borderType(data, cardtype)}>
                    <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{statusText(data, cardtype)}</Card.Subtitle>
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
                                            Mentor ID: {data.id}<br />
                                            Department: {data.dept_name}
                                        </>
                                    )
                                }
                            })(usertype)}

                        </Card.Text>
                        {((cardtype) => {
                            if (cardtype === 0) {
                                return (<ChatWrapper chat={data} otherID={data.id} />)
                            }
                            else if (cardtype === 1) {

                            }
                            else if (cardtype === 2) {
                                return (
                                    <>
                                    <OverlayTrigger
                                        trigger="click"
                                        key='bottom'
                                        placement='bottom'
                                        overlay={
                                            <Popover>
                                                <Popover.Title as="h3">Event Details</Popover.Title>
                                                <Popover.Content>
                                                    <strong>Event ID: </strong>{data.event_id}<br />
                                                    <strong>Date: </strong>{data.start_date}<br />
                                                    <strong>Time: </strong>{data.start_time}<br />
                                                    <strong>Venue: </strong>{data.venue}<br />
                                                    <strong>Info: </strong>{data.description}<br />
                                                </Popover.Content>
                                            </Popover>
                                        }
                                    >
                                        <Button variant="primary">Show Details</Button>
                                    </OverlayTrigger>
                                    {ApproveButton}
                                    </>
                                )
                            }
                        })(cardtype)}
                    </Card.Body>
                </Card >
            </div>
        );
    }
}

export default DomCreateCards;
import Card from 'react-bootstrap/Card'

export default function Cards(props) {


    return(
        <div key={`fit-${props.Bodyidx}`}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.fit.nickname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.fit.type}</Card.Subtitle>
                    <Card.Text>
                    In storage: {props.fit.status} <br/>
                    Had Since: {props.fit.createdAt}
                    </Card.Text>
                    <Card.Link>
                        <button>Edit</button>
                    </Card.Link>
                    <Card.Link>
                        <button onClick={() => {props.handleDeleteClick(fit.id)}}>Delete</button>
                    </Card.Link>
                </Card.Body>
            </Card>
            {/* <h2>{fit.nickname}</h2> */}
        </div>
    )
}
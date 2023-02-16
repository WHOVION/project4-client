import Card from 'react-bootstrap/Card'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditForm from './EditForm';

export default function Cards(props) {

    return(
        <div key={`fit-${props.idx}`}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.fit.nickname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.fit.type}</Card.Subtitle>
                    <Card.Text>
                    In storage: {props.fit.status} <br/>
                    Had Since: {props.fit.createdAt}
                    </Card.Text>
                    <Card.Link>
                        <Popup trigger=
                            {<button> Edit </button>}
                            modal nested>
                            <EditForm 
                                fit={props.fit}
                                setFit={props.setFit}
                            />
                        </Popup>
                    </Card.Link>
                    <Card.Link>
                        <button onClick={() => {props.handleDeleteClick(props.fit.id)}}>Delete</button>
                    </Card.Link>
                </Card.Body>
            </Card>
            {/* <h2>{fit.nickname}</h2> */}
        </div>
    )
}
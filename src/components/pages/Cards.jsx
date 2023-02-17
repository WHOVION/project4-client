import Card from 'react-bootstrap/Card'
import 'reactjs-popup/dist/index.css';
import EditForm from './EditForm';

export default function Cards(props) {
    const createdAtDate = new Date(props.fitElement.createdAt)
    // getMonth() returns 0 based index so Jan starts at 0, add 1 to display 1 for Jan and 2 for Feb etc
    const createdAtFormatted = `${createdAtDate.getFullYear()}/${createdAtDate.getMonth()+1}/${createdAtDate.getDate()}`


    return(
        <div key={`fit-${props.idx}`}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.fitElement.nickname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.fitElement.type}</Card.Subtitle>
                    <Card.Text>
                    In storage: {props.fitElement.status} <br/>
                    Had Since: {createdAtFormatted}
                    </Card.Text>
                    <Card.Link>
                            <EditForm 
                                fitElement={props.fitElement}
                                fit={props.fit}
                                setFit={props.setFit}
                            />
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
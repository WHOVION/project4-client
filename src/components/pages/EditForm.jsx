import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditForm (props) {

    // let {id} = useParams
    // console.log(id)

    // identify which for you're editing
    // const theFit = props.fit.find(fit => fit._id === props.idx)
    console.log('1.', fit)
    console.log('2.', fit._id)
    console.log('3.', fit)

    // specify information on what youre editing
    const [formData, setFormData] = useState({
        nickname: fit.nickname
    })

    // handle function
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) {
          newErrors.name = 'Name is required';
        }
      };

    // handle submit (put route)
    const handleSubmit = async event => {
        event.preventDefault();
        // get the token from local storage
            const token = localStorage.getItem('jwt')
            // make the auth headers
            const options = {
                headers: {
                    'Authorization': token
                }
            }
        if (validateForm()) {
          try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory/${props.idx}`, formData, options)
            .then(response=>{
                console.log(response.data)
                //once the backend gets back to us, navigate to the / route to see all items
                // navigate('/items') //clicking a link for the user
            
            })
    
            // redirect the user to the details page
          } catch (error) {
            // display an error message to the user
          }
        }
    }

    return (
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control type="email" placeholder="Enter Nickname" />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    );
}

export default EditForm;
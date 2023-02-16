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
    console.log(props.fit.id)

    // specify information on what youre editing
    const [formData, setFormData] = useState({
        nickname: props.fit.nickname
    })

    // handle function
    const handleChange = e => {
        console.log('12345', e.target.value)
        setFormData({
            ...formData,
            nickname: e.target.value
        })
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nickname) {
          newErrors.nickname = 'Name is required';
          return false
        } else {
            return true
        }
    };

    // handle submit (put route)
    const handleSubmit = async (e) => {
        e.preventDefault();
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
                // console.log('asdfjhk', props.formData)
                const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory/${props.fit.id}`, formData, options)
                // console.log('doodoo', response.data)
        
                const getResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`, {headers: {'Authorization': token}})
                props.setFit(response.data)
            } catch (error) {
                // display an error message to the user
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Nickname</Form.Label>
                <Form.Control placeholder="Enter Nickname" value={formData.nickname} onChange={handleChange} />
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
import React, { useEffect } from "react";

import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

import {Card, Button, Modal} from "react-bootstrap";

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip, BarChart, Bar} from 'recharts';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/mainstyle.css';
 
function Workouts() 
{
    const [workouts, setWorkouts] = useState([]);
    const [insideModal, setInsideModal] = useState({});
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    let {username} = useParams();

    var getCalled = false;

    function getWorkouts ()
    {
        fetch('http://localhost:5050/workout',{
            method: "POST",
            body: JSON.stringify(
                {
                    username:"apple1"
                }
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setWorkouts(data);
        })
        .catch((error) => {
            console.log(error.message);
        })
    }

    function handleEdit(workout)
    {
        setInsideModal(workout);
        setEdit(true);
        setShow(true);
    }

    function handleDelete(workout)
    {
        
    }

    function handleNew()
    {
        setInsideModal({
        username: "apple1",
        pushup: 0,
        situp: 0,
        squat: 0,
        gym: false,
        split: ""});
        setEdit(false);
        setShow(true);
    }

    function handleInsideModalChange(e)
    {
        var name = e.target.name;
        var value = e.target.value;
        if(name == "gym")
        {
            value = e.target.checked;
        }
        setInsideModal(inputs => ({...inputs, [name] : value}) );
    }

    async function SubmitEdit(e)
    {
        e.preventDefault();
        //here I need to send the request
        console.log("hi");
        var response = await fetch('http://localhost:5050/workout/',{
            method: "PATCH",
            body: JSON.stringify(
                {
                    _id:insideModal._id,
                    username:"apple1",
                    date:insideModal.date,
                    pushup:insideModal.pushup,
                    situp:insideModal.situp,
                    squat:insideModal.squat,
                    gym:insideModal.gym,
                    split:insideModal.split
                }
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        console.log("HI????");

        if(!response.ok)
        {
            alert("There was an error sending the request");
        }
        else
        {
            //redirect to the landing page with the cards containing all the users workouts
            getWorkouts();
            setShow(false);
            setEdit(false);
        }
    }

    async function SubmitNew(e)
    {
        e.preventDefault();
        //here I need to send the request
        console.log("hi");
        var response = await fetch('http://localhost:5050/workout/create',{
            method: "POST",
            body: JSON.stringify(
                {
                    username:"apple1",
                    date:insideModal.date,
                    pushup:insideModal.pushup,
                    situp:insideModal.situp,
                    squat:insideModal.squat,
                    gym:insideModal.gym,
                    split:insideModal.split
                }
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        console.log("HI????");

        if(!response.ok)
        {
            alert("There was an error sending the request");
            console.log("eroor");
        }
        else
        {
            //redirect to the landing page with the cards containing all the users workouts
            getWorkouts();
            setShow(false);
            setEdit(false);
        }
    }

    /*function handleChange(e)
    {
        var name = e.target.name;
        var value = e.target.value;
        setInputs(inputs => ({...inputs, [name] : value}) );
    }*/

    /*async function handleSubmit(e)
    {
        e.preventDefault();
        //here I need to send the request
        var response = await fetch('http://localhost:5050/record/signin',{
            method: "POST",
            body: JSON.stringify(
                {
                    username:inputs.username,
                    password:inputs.password
                }
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if(!response.ok)
        {
            setMessage=response.text();
        }
        else
        {
            //redirect to the landing page with the cards containing all the users workouts
            setMessage="redirect to another page";
        }


    }*/
    //work on this tomorrow
    useEffect(() => {
        if(!getCalled)
        {
            getWorkouts();
            getCalled = true;
        }
    }, [])


    return (
        <div>
        <div className="flexcenter">
        <h1>Workouts Landing Page</h1>
        <Button onClick={handleNew}>Create Your Daily Workout</Button>
        </div>
        <div className="flexrows">
        {
            workouts.map((workout) => {
                return(
                    <div>
                        <Card className="workoutcards">
                            <Card.Header> Workout for {workout.date} </Card.Header>
                            <ListGroup>
                                <ListGroup.Item>Pushup: {workout.pushup}</ListGroup.Item>
                                <ListGroup.Item>Situp: {workout.situp}</ListGroup.Item>
                                <ListGroup.Item>Squat: {workout.squat}</ListGroup.Item>
                                <ListGroup.Item>Gym: {workout.gym ? "yes": "no"}</ListGroup.Item>
                                <ListGroup.Item>Split: {workout.split}</ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="workoutcardbuttonflex">
                                    <Button onClick={() => handleEdit(workout)} className="workoutcardbuttons">Edit</Button>
                                    <Button onClick={() => handleDelete(workout)} className="workoutcardbuttons">Delete</Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                )
            })
        }
        </div>

        <div className="flexcenter">
            <h1>Workout Metrics</h1>
            <LineChart width={800} height={400} data={workouts}>
                <Line type="monotone" dataKey="pushup" stroke="#ff0000"></Line>
                <Line type="monotone" dataKey="situp" stroke="#00ff00"></Line>
                <Line type="monotone" dataKey="squat" stroke="#0000ff"></Line>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date"></XAxis>
                <YAxis></YAxis>
                <Legend/>
                <Tooltip/>
            </LineChart>
        </div>








        <Modal show={show && edit} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Workout for {insideModal.date}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <label htmlFor="pushup">Pushup Amount:</label>
                    <input
                    id="pushup"
                    type="number"
                    name="pushup"
                    value={insideModal.pushup}
                    onChange={handleInsideModalChange}
                    />

                    <br></br>

                    <label htmlFor="situp">Situp Amount:</label>
                    <input
                    id="situp"
                    type="number"
                    name="situp"
                    value={insideModal.situp}
                    onChange={handleInsideModalChange}
                    />

                    <br></br>

                    <label htmlFor="squat">Squat Amount:</label>
                    <input
                    id="squat"
                    type="number"
                    name="squat"
                    value={insideModal.squat}
                    onChange={handleInsideModalChange}
                    />

                    <br></br>

                    <label htmlFor="gym">Gym:</label>
                    <input
                    id="gym"
                    type="checkbox"
                    name="gym"
                    value={insideModal.gym}
                    checked={insideModal.gym}
                    onChange={handleInsideModalChange}
                    />

                    <br></br>

                    <label htmlFor="split">Split:</label>
                    <input
                    id="split"
                    type="text"
                    name="split"
                    value={insideModal.split}
                    onChange={handleInsideModalChange}
                    />

                    <button onClick={SubmitEdit}>Submit</button>
            </Modal.Body>
        </Modal>

        <Modal show={show && !edit} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>New Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <label htmlFor="pushup">Pushup Amount:</label>
                    <input
                    id="pushup"
                    type="number"
                    name="pushup"
                    value={insideModal.pushup}
                    onChange={handleInsideModalChange}
                    />

                    <br></br>

                    <label htmlFor="situp">Situp Amount:</label>
                    <input
                    id="situp"
                    type="number"
                    name="situp"
                    value={insideModal.situp}
                    onChange={handleInsideModalChange}
                    />

                    <br></br>

                    <label htmlFor="squat">Squat Amount:</label>
                    <input
                    id="squat"
                    type="number"
                    name="squat"
                    value={insideModal.squat}
                    onChange={handleInsideModalChange}
                    />

                    <br></br>

                    <label htmlFor="gym">Gym:</label>
                    <input
                    id="gym"
                    type="checkbox"
                    name="gym"
                    value={insideModal.gym}
                    checked={insideModal.gym}
                    onChange={handleInsideModalChange}
                    />

                    <br></br>

                    <label htmlFor="split">Split:</label>
                    <input
                    id="split"
                    type="text"
                    name="split"
                    value={insideModal.split}
                    onChange={handleInsideModalChange}
                    />

                    <button onClick={SubmitNew}>Submit</button>
            </Modal.Body>
        </Modal>
        </div>
    );
};
 
export default Workouts;
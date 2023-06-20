import React from "react";

import { redirect, useNavigate } from "react-router-dom";

import { useState } from "react";

import {Button} from "react-bootstrap";

import '../styles/mainstyle.css';
 
function Login() 
{
    const [inputs, setInputs] = useState({username: "", password: ""});
    const [message, setMessage] = useState("");
    function handleChange(e)
    {
        var name = e.target.name;
        var value = e.target.value;
        setInputs(inputs => ({...inputs, [name] : value}) );
    }

    async function handleSubmit(e)
    {
        e.preventDefault();
        //here I need to send the request
        var response = await fetch('http://localhost:5050/user/signin',{
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
            setMessage(response.text());
            console.log("bad");
        }
        else
        {
            //redirect to the landing page with the cards containing all the users workouts
            setMessage("redirect to another page");
            console.log("we are good");
            var newresponse = await response.json();
            console.log(newresponse);
            localStorage.setItem("token", newresponse.token);
            console.log(localStorage.getItem("token"));
            window.location = "workouts/:" + inputs.username;
        }
    }


    return (
    <div>
    <div className="flexcenter">
        <h1>Trevor's Workout Tracker</h1>
        <p></p>
    </div>
        
            <form onSubmit={handleSubmit}>
            <div className="loginform">
                <label htmlFor="username">Username:</label>
                <input
                id="username"
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                id="password"
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                />

                <Button type="submit">Submit</Button>
                </div>
            </form>
    </div>
    );
};
 
export default Login;
import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
    Button, Form, FormGroup, Input, Label
} from 'reactstrap';
import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';
import { serverUrl } from '../shared/baseUrl';


import { useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.240.1:4001";


var storedJwt = localStorage.getItem('token');
var username = localStorage.getItem('username');
var joinCode = localStorage.getItem('joinCode');
var roundID = localStorage.getItem('roundID');
var storedCue = localStorage.getItem('cue');
var position = localStorage.getItem('position');
var admin = localStorage.getItem('admin');
var answers = localStorage.getItem('answers');




console.log("test " + answers);
if (answers == "null" || answers == null) {
    answers = "[{\"username\" : \"incomplete\", \"answer\" : \"incomplete\"}]";
};
console.log("test " + answers);




var x = 0;
function myFunction() {
    setInterval(function () {
        x++;
        roundID = localStorage.getItem('roundID');
        storedCue = localStorage.getItem('cue');
        position = localStorage.getItem('position');
        console.log("myFunction: " + x);
    }, 5000000);
}


//create your forceUpdate hook
function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function RenderCard() {
    // call your hook here
    const forceUpdate = useForceUpdate();





    var answerArray = JSON.parse(answers);
    var answers_formatted = answerArray.map((answer) => {
        return (

            <div>
                <ul style={{ listStyleType: "none" }}>
                    <li><h4>User: <text className="text-success">{answer.username}</text>        Answered: <text className="text-success">{answer.answer}</text></h4></li>
                </ul>
            </div>
        );
    });

    let getRound = () => {

        console.log("Start getRound: " + storedJwt + " " + roundID);
        console.log("joinCode: " + joinCode);

        joinGame();

        return fetch(serverUrl + 'rounds/' + roundID, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3006',
                'Authorization': 'bearer ' + storedJwt
                // 'Content-Type':'application/x-www-form-urlencoded',
            },
            //referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })
            .then(response => {
                if (response.ok) {
                    console.log("getRound Response0:");
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    //console.log("In createGame Error ASY.")
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => {
                response.json().then((json) => {
                    console.log("getRound Response1: ", JSON.stringify(json.answers));
                    localStorage.setItem('cue', json.cue);
                    localStorage.setItem('position', json.position);

                    console.log("getRound Answers:" + JSON.stringify(json.answers));
                    localStorage.setItem('answers', JSON.stringify(json.answers));
                    window.location.reload();
                });
                //console.log("Login Response1: ", response);
                //console.log("Login Response2: ", response.data);
            })
            .catch(error => {
                console.log("getRound error: " + error.message);
            });
        window.location.reload();
    }

    let postAnswer = () => {
        var answerSubmit = document.getElementById("answer").value
        console.log("Start postAnswer: " + storedJwt + " " + roundID);
        return fetch(serverUrl + 'rounds/' + roundID + "/answers/", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3006',
                'Authorization': 'bearer ' + storedJwt
                // 'Content-Type':'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ 'answer': answerSubmit }) // body data type must match "Content-Type" header
            //referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    //console.log("In createGame Error ASY.")
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => {
                response.json().then((json) => {
                    console.log("postAnswer Response: ");
                });
                //console.log("Login Response1: ", response);
                //console.log("Login Response2: ", response.data);
            })
            .catch(error => {
                console.log("getRound error: " + error.message);
            });

    };


    let joinGame = () => {
        console.log("Start joinGame: " + storedJwt + " " + joinCode);
        return fetch(serverUrl + 'games/join/', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3006',
                'Authorization': 'bearer ' + storedJwt
                // 'Content-Type':'application/x-www-form-urlencoded',
            },
            //referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({ 'joinCode': joinCode }) // body data type must match "Content-Type" header
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    //console.log("In createGame Error ASY.")
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => {
                response.json().then((json) => {
                    console.log("joinGame Response1: ", json);
                    localStorage.setItem('gameID', json.gameID);
                    localStorage.setItem('roundID', json.roundID);
                    localStorage.setItem('joinCode', json.joinCode);

                });
                //console.log("Login Response1: ", response);
                //console.log("Login Response2: ", response.data);
            })
            .catch(error => {
                console.log("createGame error: " + error.message);
            });


    }




    return (

        <Card>
            <CardTitle><b>Username: <text className="text-primary" >{username !== undefined ? username : "Not Logged In."}</text></b></CardTitle>
            <CardText><b>Game: <text className="text-primary" >{joinCode != "" ? joinCode : "No game joined."}</text></b></CardText>
            <CardBody className="text-center">

                <CardText tag="h1"><b></b>{position == "preCue" ? "__________   " : "          "}{storedCue !== undefined ? storedCue : "0"}{position == "postCue" ? "   __________" : "          "}</CardText>
            </CardBody>


            <Form onSubmit={postAnswer}>
                <FormGroup className="text-center">

                    <Label htmlFor="answer"><b>Answer:</b></Label>
                    <div>
                        <input type="text" style={{ width: "400px" }} id="answer" name="answer" />
                        {" "}
                        <Button onClick={postAnswer} color="success">Submit</Button>
                    </div>

                </FormGroup>

            </Form>

            <Button onClick={getRound} color="primary">Get Round Info</Button>

            <h3>Player Responses:</h3>

            {answers != "[{\"username\" : \"incomplete\", \"answer\" : \"incomplete\"}]" ? answers_formatted : <h3><p className="text-warning">Round not Complete.</p></h3>}
        </Card>


    );

}

function Home(props) {

    /*
    var socketTime;

        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            socketTime = data;
            console.log("time: " + socketTime)
    
        });
    */

    const [socketData, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        console.log("In useEffect: ");
        socket.on("FromAPI", data => {
            console.log("DATA: ",  data);
            setResponse(data);
        });
    }, []);


    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <p>
                        It's {socketData._id}
                    </p>
                    <p>
                        JWT Token: {storedJwt}
                    </p>
                    <p>
                        {answers}
                    </p>

                    <p>
                        {roundID}
                    </p>


                    <RenderCard />
                </div>

            </div>
        </div>
    );
}

export default Home;
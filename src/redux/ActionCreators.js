import * as ActionTypes from './ActionTypes';


import { baseUrl } from '../shared/baseUrl';
import { serverUrl } from '../shared/baseUrl';




export const fetchUsers = () => (dispatch) => {

    dispatch(usersLoading(true));

    return fetch(serverUrl + 'users/', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors' // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3006'
            // 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3OWIxMDQ3NWFlMDMxMjA0YjdmZmEiLCJpYXQiOjE2MTA2ODk4MjUsImV4cCI6MTYxMDY5MzQyNX0.fqJ0DAJC1G7WCRxgZ_ieGwPSFSoaNmmSH3ky2aWKGgc'
            // 'Content-Type':'application/x-www-form-urlencoded',
        }


        //referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify({"admin":"password"}) // body data type must match "Content-Type" header
    })
        .then(response => {


            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                console.log("In Get Error ASY.")
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(users => {
            console.log("inside fetchUsers");
            dispatch(addUsers(users));
        })
        .catch(error => dispatch(usersFailed(error.message)));
}

export const postUser = (name, password) => (dispatch) => {

    const newUser = {
        username: name,
        password: password
    };
    newUser.date = new Date().toISOString();

    return fetch(serverUrl + 'users/signup', {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                console.log("postUser Response1: ", response);
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => {
            response.json().then((json) => {
                console.log("postUser Response2: ", json);
                localStorage.setItem('token', json.token);
                localStorage.setItem('username', json.username);
                localStorage.setItem('admin', json.admin);
                window.location.reload();
                dispatch(getToken(json))
            });
        })
        .then(response => {
            console.log("inside postUser");
            dispatch(addUser(response));
        })
        .catch(error => { console.log('post users', error.message); alert('Your user could not be posted\nError: ' + error.message); });
};


export const login = (username, password) => async (dispatch) => {
    console.log("Start Login: " + username + " " + password);
    dispatch(tokenLoading(true));

    return await fetch(serverUrl + 'users/login/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3006'
            // 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3OWIxMDQ3NWFlMDMxMjA0YjdmZmEiLCJpYXQiOjE2MTA2ODk4MjUsImV4cCI6MTYxMDY5MzQyNX0.fqJ0DAJC1G7WCRxgZ_ieGwPSFSoaNmmSH3ky2aWKGgc'
            // 'Content-Type':'application/x-www-form-urlencoded',
        },


        //referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ 'username': username, 'password': password }) // body data type must match "Content-Type" header
    })
        .then(response => {


            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                console.log("In Login Error ASY.")
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
                console.log("Login Response1: ", json.admin);
                localStorage.setItem('token', json.token);
                localStorage.setItem('username', json.username);
                localStorage.setItem('admin', json.admin);
                dispatch(getToken(json))
                window.location.reload();

            });
            //console.log("Login Response1: ", response);
            //console.log("Login Response2: ", response.data);
        })
        /*
        .then(response => {
            response.json().then((json) => {
                console.log("Login Response2: ", json);
                dispatch(getToken(json))
            });
            
        })
        */
        .catch(error => {
            console.log("login error: " + error.message);
            dispatch(tokensFailed(error.message));
        });


}

export const createGame = (token, joinCode, cue, position) => async (dispatch) => {
    console.log("Start createGame: " + token + " " + joinCode + " " + cue + " " + position);
    dispatch(gamesLoading(true));

    return await fetch(serverUrl + 'games/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3006',
            'Authorization': 'bearer ' + token
            // 'Content-Type':'application/x-www-form-urlencoded',
        },
        //referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ 'joinCode': joinCode, 'cue': cue, 'position': position }) // body data type must match "Content-Type" header
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
                console.log("createGame Response: ", json);
                localStorage.setItem('gameID', json._id);
                localStorage.setItem('joinCode', json.joinCode);
                localStorage.setItem('roundID', json.currentRound);
                window.location.reload();
            });
            //console.log("Login Response1: ", response);
            //console.log("Login Response2: ", response.data);
        })
        .catch(error => {
            //console.log("createGame error: " + error.message);
            dispatch(gamesFailed(error.message));
        });
}

export const joinGame = (token, joinCode) => async (dispatch) => {
    console.log("Start joinGame: " + token + " " + joinCode);
    dispatch(gamesLoading(true));

    return await fetch(serverUrl + 'games/join/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3006',
            'Authorization': 'bearer ' + token
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
                window.location.reload();

            });
            //console.log("Login Response1: ", response);
            //console.log("Login Response2: ", response.data);
        })
        .catch(error => {
            //console.log("createGame error: " + error.message);
            dispatch(gamesFailed(error.message));
        });


}

export const newRound = (token, gameID, joinCode, cue, position) => async (dispatch) => {
    console.log("Start newRound: " + gameID + " " + joinCode + " " + cue + " " + position);

    return await fetch(serverUrl + "games/" + gameID + '/newRound', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3006',
            'Authorization': 'bearer ' + token
            // 'Content-Type':'application/x-www-form-urlencoded',
        },
        //referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ 'joinCode': joinCode, 'cue': cue, 'position': position }) // body data type must match "Content-Type" header
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
                console.log("newRound Response: ", json);
                localStorage.setItem('roundID', json.currentRound);
                window.location.reload();
            });
            //console.log("Login Response1: ", response);
            //console.log("Login Response2: ", response.data);
        })
        .catch(error => {
            console.log("createGame error: " + error.message);
            //dispatch(gamesFailed(error.message));
        });
}


export const getRound = (token, roundID) => async (dispatch) => {
    console.log("Start getRound: " + token + " " + roundID);
    dispatch(gamesLoading(true));

    return await fetch(serverUrl + 'rounds/' + roundID, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3006',
            'Authorization': 'bearer ' + token
            // 'Content-Type':'application/x-www-form-urlencoded',
        },
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
                console.log("getRound Response0: ", JSON.stringify(json.answers));
                localStorage.setItem('cue', json.cue);

                console.log("getRound Answers:" + JSON.stringify(json.answers));

                localStorage.setItem('answers', JSON.stringify(json.answers));
            });
            //console.log("Login Response1: ", response);
            //console.log("Login Response2: ", response.data);
        })
        .catch(error => {
            //console.log("createGame error: " + error.message);
            dispatch(gamesFailed(error.message));
        });
}

export const completeRound = (token, roundID) => async (dispatch) => {
    console.log("Start getRound: " + token + " " + roundID);
    dispatch(gamesLoading(true));

    return await fetch(serverUrl + 'rounds/' + roundID + "/complete", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3006',
            'Authorization': 'bearer ' + token
            // 'Content-Type':'application/x-www-form-urlencoded',
        },
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
                console.log("completeROund Response: ", JSON.stringify(json.answers));
            });
            //console.log("Login Response1: ", response);
            //console.log("Login Response2: ", response.data);
        })
        .catch(error => {
            //console.log("createGame error: " + error.message);
            dispatch(gamesFailed(error.message));
        });
}

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const tokenLoading = () => ({
    type: ActionTypes.TOKENS_LOADING
});

export const gamesLoading = () => ({
    type: ActionTypes.GAMES_LOADING
});

export const usersFailed = (errMess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errMess
});

export const tokensFailed = (errMess) => ({
    type: ActionTypes.TOKENS_FAILED,
    payload: errMess
});

export const gamesFailed = (errMess) => ({
    type: ActionTypes.GAMES_FAILED,
    payload: errMess
});

export const getToken = (token) => ({
    type: ActionTypes.GET_TOKENS,
    payload: token
});

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
});


export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                console.log("In Error ASY.")
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}


export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});





export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};


export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => { console.log('post comments', error.message); alert('Your comment could not be posted\nError: ' + error.message); });
};


export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});

export const postFeedback = (firstname, lastname, telnum, email, agree, contacttype, message) => (dispatch) => {

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contacttype,
        message
    };
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addFeedback(response)))
        .then(response => alert("Thank you for your feedback: " + JSON.stringify(response)))
        .catch(error => { console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: ' + error.message); });
};


/*

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});
*/


export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});





export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                console.log("In Error ASY.")
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leaderssFailed(error.message)));
}


export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leaderssFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});










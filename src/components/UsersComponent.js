import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


/*
    function RenderMenuItem ({dish, onClick}) {
        return (
            <Card
                onClick={() => onClick(dish.id)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        );
    }
*/
function RenderMenuItem({ user }) {
    return (
        <Card>

            <CardImg width="50%" src={baseUrl + user.image} alt={user.name} />
            <CardImgOverlay>
                <CardTitle>{user.name}</CardTitle>
            </CardImgOverlay>
            <CardBody>
                <CardText><b>Class: </b>{user.class}</CardText>
                <CardText><b>Level: </b>{user.level}</CardText>
                <CardText><b>Description: </b>{user.description}</CardText>
                <CardText><b>Am I looking for a group: </b>{user.lfg == true ? "Yes!" : "No!"}</CardText>
            </CardBody>


        </Card>
    );
}


const Users = (props) => {

    const users = props.users.users.map((user) => {

        return (
            <div className="col-6 m-1" key={user.id}>
                <RenderMenuItem user={user} />
            </div>
        );
    });

    if (props.users.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.users.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.users.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Users</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Users</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {users}
                </div>
            </div>
        );
    }
}

export default Users;
import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';

import { NavLink } from 'react-router-dom';






class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.createGameFunction = this.createGameFunction.bind(this);
        this.joinGameFunction = this.joinGameFunction.bind(this);
        this.newRoundFunction = this.newRoundFunction.bind(this);

        this.completeRoundFunction = this.completeRoundFunction.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);


        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            selectedOption: "preCue"
        };
    }




    toggleCreateModal() {
        this.setState({
            isCreateModalOpen: !this.state.isCreateModalOpen
        });
    }
    toggleLoginModal() {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }


    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    handleCreate(event) {
        this.toggleCreateModal();
        //alert("Username: " + this.usernameCreate.value);
        this.props.postUser(this.usernameCreate.value, this.passwordCreate.value);

        event.preventDefault();

    }

    handleLogin(event) {
        this.toggleLoginModal();
        //alert("Username: " + this.usernameLogin.value);
        this.props.login(this.usernameLogin.value, this.passwordLogin.value);
        console.log("handleLogin:" + this.props.token)
        var response = this.props.token;
        event.preventDefault();

    }

    createGameFunction(token, joinCode) {
        //alert("Username: " + this.usernameCreate.value);
        var storedJwt = localStorage.getItem('token');
        this.props.createGame(storedJwt, this.joinCodeValueAdmin.value, this.cueValueAdmin.value, this.state.selectedOption);

    }

    joinGameFunction(token, joinCode) {
        //alert("Username: " + this.usernameCreate.value);
        var storedJwt = localStorage.getItem('token');
        this.props.joinGame(storedJwt, this.joinCodeValue.value);
        this.setState(this.props);

    }

    newRoundFunction() {
        //alert("Username: " + this.usernameCreate.value);
        var storedJwt = localStorage.getItem('token');
        var gameID = localStorage.getItem('gameID');
        this.props.newRound(storedJwt, gameID, this.joinCodeValueAdmin.value, this.cueValueAdmin.value, this.state.selectedOption);

    }

    completeRoundFunction() {
        //alert("Username: " + this.usernameCreate.value);
        var storedJwt = localStorage.getItem('token');
        var roundID = localStorage.getItem('roundID');
        this.props.completeRound(storedJwt, roundID);

    }

    handleOptionChange(changeEvent) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
        console.log(this.state.selectedOption)
    }



    render() {
        var admin = localStorage.getItem('admin');

        return (
            <div>
                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.isLoginModalOpen}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="usernameLogin" name="username"
                                    innerRef={(input) => this.usernameLogin = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="passwordLogin" name="password"
                                    innerRef={(input) => this.passwordLogin = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                            {" "}
                            <Button color="primary" onClick={this.toggleLoginModal}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isCreateModalOpen} toggle={this.isCreateModalOpen}>
                    <ModalHeader toggle={this.toggleCreateModal}>Create</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleCreate}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="usernameCreate" name="username"
                                    innerRef={(input) => this.usernameCreate = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="passwordCreate" name="password"
                                    innerRef={(input) => this.passwordCreate = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Create</Button>
                            {" "}
                            <Button color="primary" onClick={this.toggleCreateModal}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>


                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                </NavItem>


                            </Nav>
                        </Collapse>
                    </div>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button onClick={this.toggleLoginModal}><span className="fa fa-sign-in fa-lg"></span> Login User</Button>
                            {" "}
                            <Button onClick={this.toggleCreateModal}><span className="fa fa-lg"></span> Create User</Button>
                        </NavItem>
                    </Nav>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">

                                <br></br>
                                <br></br>
                                <br></br>

                                <text class="display-1 font-weight-bold">Blankslate</text>
                                {admin == "true" &&
                                    <div>

                                        <text>Enter the Code players will use to Join your game below:</text>
                                        <Input type="text" id="joinCodeValueAdmin" fullWidth="false" style={{ width: "200px" }} name="joinCodeValueAdmin" innerRef={(input) => this.joinCodeValueAdmin = input} />
                                        <Button onClick={this.createGameFunction}><span className="fa fa-lg"></span> Create Game</Button>
                                        <div>
                                            <p></p>
                                        </div>



                                    </div>
                                }
                                <p>
                                </p>
                                <div>
                                    Enter the Code to Join your game below:
                                    <Input type="text" id="joinCodeValue" fullWidth="false" style={{ width: "200px" }} name="joinCodeValue" innerRef={(input) => this.joinCodeValue = input} />
                                    <Button onClick={this.joinGameFunction}><span className="fa fa-lg"></span> Join Game</Button>
                                </div>
                                <p>
                                </p>
                                {admin == "true" &&
                                    <div>

                                        <Button onClick={this.completeRoundFunction} color="success" ><span className="fa fa-lg"></span> Complete Round</Button> {" "} <Button type="button" onClick={this.newRoundFunction} style={{ width: "200px" }} color="primary" >New Round</Button>
                                    </div>
                                }
                                {admin == "true" &&
                                    <div className="inline">
                                        <h3>Enter Cue Value Below: <Input type="text" id="cueValueAdmin" style={{ width: "200px" }} name="cueValueAdmin" innerRef={(input) => this.cueValueAdmin = input} defaultValue="*default*" />   </h3>
                                        <FormGroup>
                                            <text>Does the Blank go before or after the Cue?</text>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="position" value="preCue" id="radio1 " onChange={this.handleOptionChange} checked={this.state.selectedOption === 'preCue'} />
                                                    <text>Before</text>
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="position" value="postCue" id="radio2" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'postCue'} />
                                                    <text>After</text>
                                                </Label>
                                            </FormGroup>
                                        </FormGroup>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default Header;
/*AY*/

import React, { Component } from 'react';


import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Row, Col, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            isNavOpen: false,
            isModalOpen: false

        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }


    render() {


        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        const isNumber = (val) => !isNaN(Number(val));
        const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

        return (
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="Rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".Rating" name="Rating" defaultValue='3'
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="CommentorName" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".CommentorName" id="CommentorName" name="CommentorName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".CommentorName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".Comment" id="Comment" name="Comment"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>


                <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>

            </React.Fragment>



        );
    }

}


function RenderDish({ dish }) {



    if (dish != null) {
        return (

            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>

                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>

        );
    }
    else
        return (
            <div>dish is null</div>
        );
}

function RenderComments({ comments }) {

    if (comments != null) {

        var comments_formatted = comments.map((comment) => {


            return (

                <div key={comment.id}>
                    <ul style={{ listStyleType: "none" }}>
                        <li>{comment.comment}</li>
                        <li>--{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(comment.date.toLocaleDateString)}</li>

                    </ul>
                </div>
            );
        });

        return (

            <div>
                <h4>Comments:</h4>

                {comments_formatted}
                <CommentForm />
            </div>
        );
    }
    else
        return (
            <div>comments are null</div>
        );

}

const DishDetail = (props) => {
    var commentsArray = null
    if (props.selectedDish != null) {
        var commentsArray = props.selectedDish.comments
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                    
                </div>
            </div>
        </div>


    );


}



export default DishDetail;
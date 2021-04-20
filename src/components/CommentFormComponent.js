import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

class CommentForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			isModalOpen: false
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' +JSON.stringify(values));
    }

	render(){
		const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
		return(
			<div>
				<Button outline color="secondary" onClick={this.toggleModal}>
					<span className="fa fa-pencil"></span> 
					Submit Comment
				</Button>
				<Modal isOpen= {this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => { return this.handleSubmit(values)}}>
							<Row className="form-group">
								<Label htmlFor="rating" md={12}>Rating</Label>
								<Col md={12}>
									<Control.select className="form-control" name="rating" model=".rating">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="name" md={12}>Your Name</Label>
								<Col md={12}>
									<Control.text className="form-control" name="name" model=".name"
									validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}>
									</Control.text>
									<Errors
	                                    className="text-danger"
	                                    model=".name"
	                                    show="touched"
	                                    messages={{
	                                        minLength: 'Must be greater than 2 characters',
	                                        maxLength: 'Must be 15 characters or less'
	                                    }}
                                    />
								</Col>
							</Row>
							<Row className="form-group">
							<Label htmlFor="comment" md={12}>Comment</Label>
								<Col md={12}>
									<Control.textarea className="form-control" name="comment" model=".comment"
									rows="6">
									</Control.textarea>
								</Col>
							</Row>
							<Row className="form-group">
								<Col >
								<Button color="primary" type="submit">Submit</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default CommentForm;
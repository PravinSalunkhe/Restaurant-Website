import React , {Component} from 'react';
import {Button, Modal,ModalHeader,ModalBody,Form, FormGroup,Row, Label, Input, Col} from 'reactstrap'
import {Control , LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength=(len) => (val) => !(val) || (val.length <= len);
const minLength=(len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen : false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }
    handleSubmit(values) {
        console.log("Current state is " + JSON.stringify(values));
        alert("Current state is " + JSON.stringify(values));
    }
    render() {  
    return (
        <div className="contaier">
            <Button outline onClick={this.toggleModal} className="col-6">
                <span className="fa fa-pencil fa-lg"> Submit Comment</span>
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <LocalForm onSubmit ={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor ="rating" md={12}>Rating</Label>
                            
                                <Col>
                                <Control type="number" model=".rating" id="rating" name="rating"
                                className="form-control" /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}> Your Name </Label>
                                <Col>
                                <Control.text model=".yourname" id="yourname" name="firstname"
                                    placeholder="Your Name" 
                                    className="form-control"
                                    validators={{
                                        required,minLength : minLength(3), maxLength : maxLength(15)
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
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
                                <Label className="mr-auto" md={12} htmlFor="message" rows={6}>Comment</Label>
                                <Col>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control">
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>        
                            </Row>    
                        </LocalForm>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
    }
}
export default CommentForm;
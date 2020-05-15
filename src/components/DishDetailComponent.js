import React,{Component} from 'react';
import {Button, Modal,ModalHeader,ModalBody, Card, Row, Label, Col,CardImg, CardText, CardBody, CardTitle,BreadcrumbItem,Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control , LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength=(len) => (val) => !(val) || (val.length <= len);
const minLength=(len) => (val) => (val) && (val.length >= len);

    function RenderDish({dish,isLoading,errMess}) {
        if(isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(dish!=null) {
            return (
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else
        {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({comments, addComment , dishId}) {
        if(comments!=null) 
        {
            const comm = comments.map((c) => {
                return (
                    <div>
                        <ul className="list-unstyled">
                            <li key={c.id}> 
                                {c.comment}<br></br><br></br>
                                -- {c.author} , {new Intl.DateTimeFormat('en-US',{year :'numeric' ,month : 'short' ,day:'2-digit' }).format(new Date(Date.parse(c.date)))}
                            </li>
                        </ul>
                    </div>
                );
            });
        return (
            <div className="container">
                <h4> Comments </h4>
                {comm}
                <CommentForm addComment={addComment} 
                    dishId={dishId}/>
            </div>
        );   
            
        }
        else 
        {

            return (
                <div></div>
            );
        }

    }

    const DishDetail = (props) => {
        if(props.dish != null)
        {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>    
                <div className="row">  
                    <div className="col-12 col-md-5 m-1">
                        < RenderDish dish= {props.dish} isLoading={props.isLoading} errMess={props.errMess} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        < RenderComments comments = {props.comments}
                            addComment ={props.addComment}
                            dishId = {props.dish.id} />
                    </div>
                </div>
                </div>    
            );
        }
        else
        {
            return (
                <div>
                </div>
            )
        }    
        
    }
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
            this.toggleModal();
            this.props.addComment(this.props.dishId , values.rating, values.yourname,values.message);
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


export default DishDetail;
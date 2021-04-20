/*AY*/


import React, { Component } from 'react';
import Menu from './MenuComponent';
import Users from './UsersComponent';
import DishDetail from './DishdetailComponent';


import Header from './HeaderComponent';
import Footer from './FooterComponent';



import Home from './HomeComponent';
import Contact from './ContactComponent';
import Aboutus from './AboutComponent';


import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { baseUrl } from '../shared/baseUrl';
import { serverUrl } from '../shared/baseUrl';

import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';

//import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';


import { postComment, postUser, postFeedback, login, createGame, joinGame, getRound, newRound, completeRound, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';



const mapStateToProps = state => {
    return {
        users: state.users,
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        tokens: state.tokens
    }
}



const mapDispatchToProps = dispatch => ({
    //addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    postFeedback: (firstname, lastname, telnum, email, agree, contacttype, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contacttype, message)),
    postUser: (name, password) => dispatch(postUser(name, password)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    login: (username, password) => { dispatch(login(username, password)) },
    createGame: (token, joinCode, cue, position) => { dispatch(createGame(token, joinCode, cue, position)) },
    joinGame: (token, joinCode) => { dispatch(joinGame(token, joinCode)) },
    getRound: (token, roundID) => { dispatch(getRound(token, roundID)) },
    newRound: (token, gameID, joinCode, cue, position) => { dispatch(newRound(token, gameID, joinCode, cue, position)) },

    completeRound: (token, roundID) => { dispatch(completeRound(token, roundID)) },

    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => { dispatch(fetchLeaders()) }
});


class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        console.log("TEST MINE.");

    }



    /*
        onDishSelect(dishId) {
            this.setState({ selectedDish: dishId });
        }
    */
    render() {

        const HomePage = () => {
            return (
                <React.Fragment>

                    <Home />

                </React.Fragment>
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                //addComment={this.props.addComment}
                />
            );
        };


        const AboutusPage = () => {
            return (

                <Aboutus

                    leaders={this.props.leaders}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />


            );
        }


        return (




            <React.Fragment>
                <Header postUser={this.props.postUser} login={this.props.login} createGame={this.props.createGame} joinGame={this.props.joinGame} token={this.props.tokens.token} completeRound={this.props.completeRound} newRound={this.props.newRound} />
                <div className="container">


                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                        <Route path='/menu/:dishId' component={DishWithId} />
                        <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                        <Route exact path='/aboutus' component={AboutusPage} />
                        <Redirect to="/home" />

                    </Switch>

                </div>
                <Footer />

            </React.Fragment >


            /*
                        <div>
                            <Navbar dark color="primary">
                                <div className="container">
                                    <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                                </div>
                            </Navbar>
                            <div className="container">
                                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                                <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                            </div>
                        </div>
            */

        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

import React from "react";
import firebase from "firebase/app";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebaseConfig from "./firebaseConfig.json";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import CallPage from "./pages/CallPage/CallPage";
import IndexPage from "./pages/IndexPage/IndexPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import FollowersPage from "./pages/FollowersPage/FollowersPage";
import "./App.scss";

type Props = {};
type State = {
	firebaseSet: boolean;
};
export default class App extends React.Component<Props, State> {

	constructor(props:Props) {
		super(props);
		this.state = {
			firebaseSet:false
		}
	}

	async initFirebase() {
		if(this.state.firebaseSet) return;
		
		if(firebase.apps.length === 0) {
			firebase.initializeApp(firebaseConfig);	
		}

		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
			this.setState({
				firebaseSet:true
			})
		})
	}
		

	render() {
		this.initFirebase();

		if(this.state.firebaseSet) {
			return (
					<Router>
						<div id="background"></div>
						<Switch>
							<Route exact path="/" component={IndexPage} />
							<Route exact path="/call" component={CallPage} />
							<Route exact path="/answer" component={AnswerPage} />
							<Route exact path="/login" component={LoginPage} />
							<Route exact path="/followers" component={FollowersPage} />
						</Switch>
					</Router>
			);
		} else {
			return <h1>Loading</h1>
		}
		
	}
}


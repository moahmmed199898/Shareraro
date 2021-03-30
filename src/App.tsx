import React from "react";
import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig.json";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnswerPage from "./pages/answerPage/AnswerPage";
import CallPage from "./pages/CallPage";
import IndexPage from "./pages/IndexPage/IndexPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.scss";

type Props = {};
type State = {};
export default class App extends React.Component<Props, State> {

	constructor(props:Props) {
		super(props);
		if(firebase.apps.length === 0) {
			firebase.initializeApp(firebaseConfig);
		}
	}
		

	render() {
		return (
				<Router>
					<div id="background"></div>
					<Switch>
						<Route exact path="/"><IndexPage /></Route>
						<Route exact path="/call"><CallPage /></Route>
						<Route exact path="/answer"><AnswerPage /></Route>
						<Route exact path="/login"><LoginPage /></Route>
					</Switch>
				</Router>
		);
	}
}


import React from "react";
import firebase from "firebase/app";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebaseConfig from "./firebaseConfig.json";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import CallPage from "./pages/CallPage/CallPage";
import IndexPage from "./pages/IndexPage/IndexPage";
import "./App.scss";

type Props = unknown;
type State = {
	firebaseSet: boolean;
};
export default class App extends React.Component<Props, State> {

	constructor(props:Props) {
		super(props);
		this.state = {
			firebaseSet:false
		}
		this.initFirebase();
	}

	initFirebase():void {	
		if(firebase.apps.length === 0) {
			firebase.initializeApp(firebaseConfig);	
		}
	}
		

	render():JSX.Element {
		return (
				<Router>
					<div id="background"></div>
					<Switch>
						<Route exact path="/" component={IndexPage} />
						<Route exact path="/call" component={CallPage} />
						<Route exact path="/answer" component={AnswerPage} />
					</Switch>
				</Router>
		);
		
	}
}


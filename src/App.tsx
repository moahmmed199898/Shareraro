import React from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AnswerPage from "./pages/answerPage/AnswerPage";
import CallPage from "./pages/CallPage";
import IndexPage from "./pages/IndexPage/IndexPage";
import LoginPage from "./pages/LoginPage/LoginPage";
export default class App extends React.Component {

	render() {
		return (
				<Router>
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


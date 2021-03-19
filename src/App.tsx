import React from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnswerPage from "./pages/AnswerPage";
import CallPage from "./pages/CallPage";
import "./style.scss";
export default class App extends React.Component {
	
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/call"><CallPage /></Route>
					<Route path="/answer"><AnswerPage /></Route>
				</Switch>
			</Router>
			// <div className="App">
			// 	<CallPage />
			// 	<AnswerPage />
			// </div>
		);
	}
}


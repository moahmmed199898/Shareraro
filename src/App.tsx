import React from "react";
import AnswerPage from "./pages/AnswerPage";
import CallPage from "./pages/CallPage";
import "./style.scss";
export default class App extends React.Component {
	
	render() {
		return (
			<div className="App">
				<CallPage />
				<AnswerPage />
			</div>
		);
	}
}


import firebase from "firebase/app";
import React from "react";
import { Link } from "react-router-dom";
import "./_nav.scss";

type Props = {};
type State = {
    display: string
}
export default class Nav extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state ={
            display: "none"
        }
    }

    onMouseOverHandler() {
        this.setState({
            display: "block"
        })
    }

    onMouseOutHandler() {
        this.setState({
            display: "none"
        })
    }

    render() {
        return (
            <nav id="nav">
            <h1>Shareraro</h1>
            <ul>
                <li>Home</li>
                <li><Link to="/call">Screen Share</Link></li>
                <li>Data Transfer</li>
                {firebase.auth().currentUser ? 
                    <li onMouseOver={this.onMouseOverHandler.bind(this)} onMouseOut={this.onMouseOutHandler.bind(this)}  id="userName">
                        Hi, {firebase.auth().currentUser.displayName}
                        <div style={{display:this.state.display}}  onMouseOut={this.onMouseOutHandler.bind(this)} id="dropDownMenu">
                            <ul>
                                <li>Logout</li>
                            </ul>
                        </div>
                    </li>
                    :
                    <>
                        <li><Link to="/login"><button id="login">Login</button></Link></li>
                        <li><Link to="/login"><button id="signup">Signup</button></Link></li>
                    </>
                }
                
            </ul>
        </nav>

        )
    }
}
import firebase from "firebase/app";
import React from "react";
import "./_nav.scss";

export default class Nav extends React.Component {

    componentDidMount() {
        console.log(firebase.auth().currentUser)
    }

    render() {
        return (
            <nav id="nav">
            <h1>Shareraro</h1>
            <ul>
                <li>Home</li>
                <li>Screen Share</li>
                <li>Data Transfer</li>
                {firebase.auth().currentUser ? 
                    <li>Hi, {firebase.auth().currentUser.displayName}</li>
                    :
                    <>
                        <li><button id="login">Login</button></li>
                        <li><button id="signup">Signup</button></li>
                    </>
                }
                
            </ul>
        </nav>

        )
    }
}
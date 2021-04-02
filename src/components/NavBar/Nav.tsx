import firebase from "firebase/app";
import React from "react";
import { Link } from "react-router-dom";
import "./_nav.scss";

type Props = {};
type State = {
    display: string,
    currentUser: firebase.User
}
export default class Nav extends React.Component<Props, State> {

    private unSubscribeFromFirebase:firebase.Unsubscribe;

    constructor(props:Props) {
        super(props);
        this.state ={
            display: "none",
            currentUser: null
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
    componentDidMount() {
        this.unSubscribeFromFirebase = firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }

    componentWillUnmount() {
        if(this.unSubscribeFromFirebase) this.unSubscribeFromFirebase();
    }

    onAuthStateChanged(user: firebase.User) {
        if(user) {
            this.setState({
                currentUser: user
            })
        }
    }

    render() {

        return (
            <nav id="nav">
            <h1>Shareraro</h1>
            <ul>
                <li>Home</li>
                <li><Link to="/call">Screen Share</Link></li>
                <li>Data Transfer</li>
                {this.state.currentUser ? 
                    <li onMouseOver={this.onMouseOverHandler.bind(this)} onMouseOut={this.onMouseOutHandler.bind(this)}  id="userName">
                        Hi, {this.state.currentUser.displayName}
                        <div style={{display:this.state.display}}  onMouseOut={this.onMouseOutHandler.bind(this)} id="dropDownMenu">
                            <ul>
                                <Link to="/followers" ><li>Followers Page</li></Link>
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
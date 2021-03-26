import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth/"
import UserManager from "../../Services/UserManager";
type Props = {};
type State = {
    followers:string[]
};

export default class LoginPage extends React.Component<Props,State> {

    constructor(props:Props){
        super(props);
        this.state = {
            followers: []
        }
    }

    async loginOnClickHandler() {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(googleAuthProvider);
        const userManager = new UserManager();
        await userManager.follow("aspasp1998@gmail.com");
        await userManager.follow("alkhafml@miamioh.edu");

        
    }   

    logoutOnClickHandler() {
        firebase.auth().signOut();
    }

    async showFollowersClickHandler() {
        const userManager = new UserManager();
        const followers = await userManager.getFollowing();
        this.setState({
            followers: followers.map(value => value.email + "\n")
        })
        console.log("hello")
    }


    render() {
        return (
            <div>
                <button onClick={this.loginOnClickHandler.bind(this)}>Login</button>
                <button onClick={this.logoutOnClickHandler.bind(this)}>logout</button>
                <button onClick={this.showFollowersClickHandler.bind(this)}>show Followers</button>
                {this.state.followers}
            </div>
        )
    }
}
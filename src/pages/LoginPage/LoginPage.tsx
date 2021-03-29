import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth/";
import { StyledFirebaseAuth } from "react-firebaseui";
import UserManager from "../../Services/UserManager";
import Nav from "../../components/NavBar/Nav";
import "./_loginPage.scss"
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
    private uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          
        ],
      };


    async loginOnClickHandler() {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await firebase.auth().signInWithPopup(googleAuthProvider);

        
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
            <div id="LoginPage">
                <Nav />
                <div id="con">
                    <div id="intro">dd</div>
                    <div id="login">
                        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                    </div>
                </div>

            </div>
        )
    }
}
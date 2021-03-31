import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase/app";
import { RouteComponentProps } from "react-router-dom";
import "firebase/firestore";
import "firebase/auth";

import Nav from "../../components/NavBar/Nav";
import "./_loginPage.scss"


type Props = RouteComponentProps;
type State = {};

export default class LoginPage extends React.Component<Props, State> {

    // async componentDidMount() {
    //     await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    // }

    private uiConfig:firebaseui.auth.Config = {
        signInFlow: 'popup',
        signInSuccessUrl: "/",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,          
        ],
      };


    render() {
        return (
            <div id="LoginPage">
                <Nav />
                <div id="con">
                    <div  id="intro" className="internalCon">
                        <div>
                            <h1>With your account you can:</h1>
                            <ul>
                                <li>Share data with your friends by just clicking on them</li>
                                <li>Share your screen without sending IDs</li>
                                <li>Follow your friends and see what they are up to!</li>
                            </ul>
                        </div>
                    </div>
                    <div id="login" className="internalCon">
                        <div>
                            <h1>Choose your sign in option</h1>
                            <hr/>
                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
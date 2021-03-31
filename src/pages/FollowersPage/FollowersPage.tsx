import React from "react"
import { RouteComponentProps } from "react-router-dom";
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import Nav from "../../components/NavBar/Nav";
import UserManager from "../../Services/UserManager";
import { User } from "../../types/User";
import "./_followersPage.scss";

type Props = RouteComponentProps;
type State = {
    following:User[]
}

export default class FollowersPage extends React.Component<Props,State> {
    

    constructor(props:Props) {
        super(props);
        this.state = {
            following:null
        }
        this.init();
    }


    async init() {
        const userManager = new UserManager();
        if(userManager.getUser() === null) this.props.history.push("/login");
        const following = await userManager.getFollowing();
        this.setState({following})
    }

    render() {
        if(this.state.following === null) {
            return <h1>Loading</h1>;
        } else {
            return ( 
                <div id="followersPage">
                    <Nav />
                    {this.state.following.map(user=><FollowerCard user={user} active={user.inACall} />)}
                </div>
            )
        }
        
    }
}
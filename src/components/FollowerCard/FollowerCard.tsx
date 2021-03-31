import React from "react";
import { User } from "../../types/User";
import "./_followerCard.scss"
type Props = {
    user:User,
    active: boolean
}
type State = {}
export default class FollowerCard extends React.Component<Props,State> {
    render() {
        return (
            <div className={"card " + (this.props.active ? null : "disabled")}>
                <img src={this.props.user.photoURL} alt={this.props.user.displayName} />
                <div className="info">
                    <h1>{this.props.user.displayName}</h1>
                    <p>{this.props.user.email}</p>
                    <button>Join {this.props.user.displayName.split(" ")[0]}</button>
                </div>
            </div>
        )
    }
}
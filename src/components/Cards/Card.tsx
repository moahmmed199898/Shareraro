import React from "react";
import "./_card.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
    title: string,
    icon:IconProp,
    description: string,
    color: string
}
type State = {}
export default class Card extends React.Component<Props,State> {

    render() {
        return (
            <div className={`card ${this.props.color}`}>
                <FontAwesomeIcon className="icon" icon={this.props.icon} />
                <h1>{this.props.title}</h1>
                <p>Share your screen with your friends in a reliable high quality video</p>
                

            </div>
        )
    }
}
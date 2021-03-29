import React from "react";
import "./_section.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
    title: string,
    icon:IconProp,
    id: string
}

type State = {}
export default class Section extends React.Component<Props,State> {

    render() {
        return (
            <div {...this.props} className="section">
                <h1  className="colored">{this.props.title}</h1>
                <div className="body">
                    <div>{this.props.children}</div>
                    <FontAwesomeIcon className="colored" icon={this.props.icon} />
                </div>
            </div>
        )
    }
}
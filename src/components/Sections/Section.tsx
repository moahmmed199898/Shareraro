import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
    title: string,
    icon:IconProp,
    id: string
}

type State = unknown
export default class Section extends React.Component<Props,State> {

    render():JSX.Element {
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
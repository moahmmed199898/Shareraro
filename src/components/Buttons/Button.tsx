import React, { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type Props = HTMLAttributes<HTMLButtonElement> & {
    href?: string,
}
export default class Button extends React.Component<Props> {

    render() {
        return (
            <Link to={this.props.href} className="w-full">
                <button className={`bg-red-700 border-2 border-red-700 text-white cursor-pointer ${this.props.className}`}
                onClick={this.props.onClick}
                >{this.props.children}</button>
            </Link>
        );
    }
}
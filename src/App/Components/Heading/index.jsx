import React from "react";
import './heading.css';

const Heading = ({text}) => {

    return (
        <div className="info__heading comment">
            <span className="comment__text comment__hashtags"></span>
            <h2 className="comment__text comment__heading">{text}</h2>
            <span className="comment__text comment__hashtags"></span>
        </div>
    );

};

export default Heading;
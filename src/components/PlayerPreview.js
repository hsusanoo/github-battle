import PropTypes from "prop-types";
import React from "react";

const PlayerPreview = (props) => (
    <div>
        <div className="column">
            <img
                src={props.avatar}
                alt={'Avatar for ' + props.username}
                className={'avatar'}/>
            <h2 className={'username'}>
                <span role={'img'} aria-label={'user-emoji'}>👤</span>
                <b>@{props.username}</b>
            </h2>
            {props.children}
        </div>
    </div>
);

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
};

export default PlayerPreview;
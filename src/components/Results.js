import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import * as queryString from 'query-string';
import api from '../utils/api';
import PlayerPreview from './PlayerPreview';
import Loading from "./Loading";

const Profile = (props) => {
    let info = props.info;
    return (
        <PlayerPreview
            avatar={info.avatar_url}
            username={info.login}
        >
            <ul className="space-list-items">
                {info.name &&
                <li>Name : {info.name}</li>}
                {info.location &&
                <li>Location : {info.location}</li>}
                {info.company &&
                <li>Company : {info.company}</li>}
                {info.followers > 0 &&
                <li>Followers : {info.followers}</li>}
                {info.following > 0 &&
                <li>Following : {info.following}</li>}
                {info.public_repos &&
                <li>Public Repos : {info.public_repos}</li>}
                {info.blog &&
                <li><a href={info.blog}>
                    {info.blog}
                </a></li>}
            </ul>
        </PlayerPreview>
    )
};

Profile.propTypes = {
    info: PropTypes.object.isRequired,
};

const Player = (props) => (
    <div className={'profile'}>
        <h1 className={'header'} style={{fontWeight: props.label === 'Winner' && 'bold'}}>
            {props.label === 'Winner' && <span role={'img'} aria-label={'Winner'}>🏆  </span>}
            {props.label}
        </h1>
        <h3 style={{textAlign: 'center'}}>
            Score : {props.score}
        </h3>
        <Profile
            info={props.profile}
        />
    </div>
);

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
};

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true,
        }
    }

    componentDidMount() {
        const players = queryString.parse(this.props.location.search);
        api.battle([
            players.playerOne,
            players.playerTwo
        ]).then((results) =>
            !results
                ? this.setState({
                    error: "There is an error, check if the users exists !",
                    loading: false,
                })
                : this.setState({
                    error: null,
                    loading: false,
                    winner: results[0],
                    loser: results[1],
                })
        )
    }

    render() {

        let error = this.state.error;
        let winner = this.state.winner;
        let loser = this.state.loser;
        let loading = this.state.loading;

        return loading
            ? <Loading/>
            : error
                ? <div>
                    <p>{error}</p>
                    <Link to={'/battle'}>Reset</Link>
                </div>
                : <div className={'row'}>
                    <div className="column">
                        <Player
                            label={'Winner'}
                            score={winner.score}
                            profile={winner.profile}
                        />
                    </div>
                    <div className="column">
                        <Player
                            label={'Loser'}
                            score={loser.score}
                            profile={loser.profile}
                        />

                    </div>
                </div>;

    }

}

export default Results;
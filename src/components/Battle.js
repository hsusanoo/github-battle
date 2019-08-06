import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
    }

    handleChange = (event) => {
        let value = event.target.value;
        this.setState(() => ({
            username: value,
        }))
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    };

    render() {
        return (
            <form className={'column'} onSubmit={this.handleSubmit}>
                <label className={'header'} htmlFor={'username'}>
                    {this.props.label}
                </label>
                <input
                    type="text"
                    name={'username'}
                    placeholder={'GitHub username'}
                    autoComplete={'off'}
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <button
                    className={'button'}
                    type={'submit'}
                    disabled={!this.state.username}
                >
                    Submit
                </button>
            </form>
        )
    }

}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

class Battle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerOne: '',
            playerTwo: '',
            playerOneImg: null,
            playerTwoImg: null,
        }
    }

    handleSubmit = (id, username) => {
        this.setState(() => {
            let newState = {};
            newState[id] = username;
            newState[id + 'Img'] = 'https://github.com/' + username + '.png?size=400';
            return newState;
        })
    };

    handleReset = (id) => {
        this.setState(() => {
            let newState = {};
            newState[id] = '';
            newState[id + 'Img'] = null;
            return newState;
        })
    };

    render() {

        let match = this.props.match;
        let playerOne = this.state.playerOne;
        let playerOneImg = this.state.playerOneImg;
        let playerTwo = this.state.playerTwo;
        let playerTwoImg = this.state.playerTwoImg;

        return (
            <div>
                <div className={'row'}>
                    {!playerOne
                        ? <PlayerInput
                            id={'playerOne'}
                            label={'Player One'}
                            onSubmit={this.handleSubmit}
                        />
                        : <PlayerPreview
                            username={playerOne}
                            avatar={playerOneImg}
                        >
                            <button
                                className={'reset'}
                                onClick={() => this.handleReset('playerOne')}
                            >
                                Reset
                            </button>
                        </PlayerPreview>
                    }
                    {!playerTwo
                        ? <PlayerInput
                            id={'playerTwo'}
                            label={'Player Two'}
                            onSubmit={this.handleSubmit}
                        />
                        : <PlayerPreview
                            id={'playerTwo'}
                            username={playerTwo}
                            avatar={playerTwoImg}
                        >
                            <button
                                className={'reset'}
                                onClick={() => this.handleReset('playerTwo')}
                            >
                                Reset
                            </button>
                        </PlayerPreview>
                    }
                </div>
                {playerOneImg && playerTwoImg &&
                <Link
                    className={'button'}
                    to={{
                        pathname: match.url + '/results',
                        search: '?playerOne=' + playerOne + '&playerTwo=' + playerTwo,
                    }}
                >
                    Battle
                </Link>}
            </div>
        )
    }

}

export default Battle;

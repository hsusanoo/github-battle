import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';
import Octicon, {Person, RepoForked, Eye, IssueOpened, Law, Star} from '@primer/octicons-react';

const SelectLanguage = props => {
    const languages = ['All', 'JavaScript', 'PHP', 'C#', 'Python', 'Java'];
    return (
        <ul className={'languages'}>
            {languages.map((lang) =>
                <li
                    style={lang === props.selectedLanguage ? {color: '#d0021b'} : {color: '#555'}}
                    onClick={() => props.onSelect(lang)}
                    key={lang}
                >
                    {lang}
                </li>
            )}
        </ul>
    );
};

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

const RepoInfos = props =>
    <table>
        <tbody>
    		<tr>
	            <td><Octicon icon={Person}/></td>
	            <td>{props.repo.owner.login}</td>
	        </tr>
	        <tr>
	            <td><Octicon icon={Star}/></td>
	            <td>{props.repo.stargazers_count}</td>
	        </tr>
	        <tr>
	            <td><Octicon icon={RepoForked}/></td>
	            <td>{props.repo.forks_count}</td>
	        </tr>
	        <tr>
	            <td><Octicon icon={Eye}/></td>
	            <td>{props.repo.watchers_count}</td>
	        </tr>
	        <tr>
	            <td><Octicon icon={IssueOpened}/></td>
	            <td>{props.repo.open_issues_count}</td>
	        </tr>
	        {props.repo.license && (
            <tr>
                <td><Octicon icon={Law}/></td>
                <td>{props.repo.license.name}</td>
            </tr>
        	)}
        </tbody>
    </table>
;

const RepoGrid = props => {
    return (
        <ul className={'popular-list'}>
            {props.repos.map((repo, index) => (
                <li key={repo.name} className={'popular-item'}>
                    <div className={'popular-rank'}>
                        <span role={'img'} aria-label={'rank'}>✨ </span>
                        <h3>{index + 1}</h3>
                    </div>
                    <ul className={'space-list-items'}>
                        <li>
                            <img className={'avatar'}
                                 src={repo.owner.avatar_url}
                                 alt={repo.owner.login + '\'s name'}
                            />
                        </li>
                        <li>
                            <a href={repo.html_url}>{repo.name}</a>
                        </li>
                        <li>
                            <RepoInfos repo={repo}/>
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
    )
};

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
};

class Popular extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null,
        }
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage = lang => {
        // if (this.state.selectedLanguage !== lang) {

        this.setState(() => (
            {
                selectedLanguage: lang,
                repos: null,
            }
        ));
        api.fetchPopularRepos(lang)
            .then(repos => {
                this.setState(() => ({
                    repos: repos,
                }))
            });
        // }
    };

    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {!this.state.repos
                    ? <Loading/>
                    : <RepoGrid repos={this.state.repos}/>
                }
            </div>
        )
    }

}

export default Popular;

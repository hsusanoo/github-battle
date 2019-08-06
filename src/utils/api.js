import axios from 'axios';

const id = "GH_ID";
const sec = "GH_SECRET";
const params = "?client_id=" + id + "&client_secret=" + sec;

const getProfile = username =>
    axios.get('https://api.github.com/users/' + username + params)
        .then(function (user) {
            return user.data;
        });


const getRepos = username => (
    axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
);

const getStarCount = repos =>
    repos.data.reduce((count, repo) =>
        count + repo.stargazers_count
        , 0);

const calculateScore = (profile, repos) => {
    let followers = profile.followers;
    let totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
};

const handleError = error => {
    console.warn(error);
    return null;
};

const getUserData = player =>
    axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(data => {
        let profile = data[0];
        let repos = data[1];

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    });


const sortPlayers = players =>
    players.sort((a, b) =>
        b.score - a.score
    );


export default {
    battle: players =>
        axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    ,
    fetchPopularRepos: language => {
        let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

        return axios.get(encodedURI)
            .then(response =>
                response.data.items
            );
    }
};
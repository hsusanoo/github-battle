import React from 'react';
import Popular from './Popular';
import Home from './Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Battle from "./Battle";
import Results from "./Results";

function App() {
    return (
        <BrowserRouter>
            <div className={'container'}>
                <Nav/>
                <Switch>
                    <Route exact path={'/popular'} component={Popular}/>
                    <Route exact path={'/battle'} component={Battle}/>
                    <Route path={'/battle/results'} component={Results}/>
                    <Route exact path={'/'} component={Home}/>
                    <Route render={() => <p>Not Found !</p>}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

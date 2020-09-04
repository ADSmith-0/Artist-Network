import React from 'react';
import Homepage from './components/pageComponents/Homepage';
import PersonalGraph from './components/pageComponents/PersonalGraph';
import TopArtists from './components/pageComponents/TopArtists';
import About from './components/pageComponents/About';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Homepage}/>
          <Route path="/TopArtists" component={TopArtists} />
          <Route path="/PersonalGraph" component={PersonalGraph}/>
          <Route path="/About" component={About}/>
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
        {/*footer?*/}
    </Router>
  );
}

export default App;

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.scss';
import {FrontPage} from './pages/FrontPage';
import {StoryCardScreen} from './components/storyCardScreen/StoryCardScreen';

// https://reactrouter.com/web/guides/quick-start
// refer to the video at https://reactrouter.com/

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact={true} path='/' render={() => (
            <FrontPage/>
          )}/>
          <Route path='/story/:storyId' render={({match, location}) => (
            <StoryCardScreen story={{match, location}}/>
          )}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

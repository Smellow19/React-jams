import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Album from './components/Album';
import Landing from './components/Landing'
import Library from './components/Library'

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        <nav>
          <div id='logo'>
            <h1>React Jams</h1>
          </div>

          <div id ='links'>
          <Link to='/'> Landing </Link>
          <Link to ='/Library'> Library </Link>
          </div>
        </nav>
      </header>
      <main>
      <Route exact path="/" component={Landing}/>
      <Route path ="/library" component={Library}/>
      <Route path ="/album/:slug" component={Album}/>
      </main>
      </div>
    );
  }
}

export default App;

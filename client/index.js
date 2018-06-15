import React from "react";
import './style/style.css';
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoot } from "react-router";
import App from './components/App';
import SongCreate from './components/SongCreate';
import './images/favicon.png';
import './images/favicon-iphone-144.png';

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history= {hashHistory}>
        <Route path="/" component={App} />
        <Route path="songs/create" component={SongCreate} />
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));

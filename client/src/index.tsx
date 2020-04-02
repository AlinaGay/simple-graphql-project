import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom'; 
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import User from './components/user';
import createClient from './apolloClient';

const client = createClient();

function App() {
    return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <User />
      </ApolloHooksProvider>
    </ApolloProvider>
    );
  }

ReactDOM.render(<App />, document.getElementById("root"));
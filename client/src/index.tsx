import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom'; 
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import createClient from './apolloClient';
import { Form } from './components/form';

const client = createClient();

function App() {
    return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Form />
      </ApolloHooksProvider>
    </ApolloProvider>
    );
  }

ReactDOM.render(<App />, document.getElementById("root"));
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const createClient = () => {
  const cache = new InMemoryCache();

  const link = new HttpLink({
      uri: 'http://localhost:4000/'
    });
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link
  });

  return client;
}

export default createClient;
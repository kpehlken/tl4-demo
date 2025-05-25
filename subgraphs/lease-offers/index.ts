import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {buildSubgraphSchema} from "@apollo/subgraph";
import {readFileSync} from "fs";
import gql from "graphql-tag";

const typeDefs = gql(readFileSync('./lease-offers.graphql', { encoding: 'utf-8' }));
import resolvers from "./resolvers";
import LeaseOfferApi from "./datasources/LeaseOfferApi";

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const port = 4002;
  const subgraphName = 'lease offers';

  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            leaseOfferAPI: new LeaseOfferApi(),
          },
        };
      },
      listen: { port },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();

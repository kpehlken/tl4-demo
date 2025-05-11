import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {buildSubgraphSchema} from "@apollo/subgraph";
import {readFileSync} from "fs";
import gql from "graphql-tag";
import VehicleApi from "./datasources/VehicleApi";

const typeDefs = gql(readFileSync('./vehicles.graphql', { encoding: 'utf-8' }));
import resolvers from "./resolvers";

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const port = 4001;
  const subgraphName = 'vehicles';

  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            vehicleAPI: new VehicleApi(),
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

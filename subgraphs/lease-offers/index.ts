import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {buildSubgraphSchema} from "@apollo/subgraph";
import {readFileSync} from "fs";
import gql from "graphql-tag";

const typeDefs = gql(readFileSync('./lease-offers.graphql', { encoding: 'utf-8' }));
import resolvers from "./resolvers";
import LeaseOfferApi from "./datasources/LeaseOfferApi";
import {verify} from "jsonwebtoken";

const JWT_SECRET = "secret";

function decodeToken(token: string) {
  if (!token) {
    return null;
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  const decoded = verify(token, JWT_SECRET, {
    algorithms: ['HS256'],
  });

  return decoded;
}

function isTokenValid(token: string): boolean {
  if (!token) {
    return false;
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    const decoded = verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return true;
  } catch(err) {
    return false;
  }
}

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const port = 4002;
  const subgraphName = 'lease offers';

  try {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization;

        const user = isTokenValid(token) ? decodeToken(token) : null;
        const status = isTokenValid(token) ? "AUTHENTICATED" : "UNAUTHENTICATED";

        return {
          auth: { user, status: status },
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

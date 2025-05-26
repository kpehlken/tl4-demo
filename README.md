# TL4 Demo 👨‍💻

## Branches
- auth-at-subgraphs
- directives-with-coprocessor
- directives-with-jwt-plugin

## Instructions

Publish the subgraph schemas to Apollo Studio
1. Run `rover config auth` to set the `APOLLO_KEY` value 
1. Navigate to `subgraphs/vehicles`.
1. Run `rover subgraph publish <APOLLO_GRAPH_REF> --name vehicles --schema vehicles.graphql --routing-url http://localhost:4001`
1. Run `npm start`
1. Navigate to `subgraphs/lease-offers`.
1. Run `rover subgraph publish <APOLLO_GRAPH_REF> --name leaseOffers --schema lease-offers.graphql --routing-url http://localhost:4002`
1. Run `npm start`
1. Navigate to `subgraphs/users`.
1. Run `rover subgraph publish <APOLLO_GRAPH_REF> --name users --schema users.graphql --routing-url http://localhost:4003`
1. Run `npm start`

Start Router
1. Run `APOLLO_KEY=... APOLLO_GRAPH_REF=... ./router --config config.yaml`

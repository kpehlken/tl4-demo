# TL4 Demo 👨‍💻

## Branches
- auth-at-subgraphs
- directives-with-coprocessor
- directives-with-jwt-plugin

## Instructions

Publish the subgraph schemas to Apollo Studio. Each branch contains schema changes, so these steps need to be executed each time
switching from one approach to another.
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

## Specific Instructions for branches

### auth-at-subgraphs
Does not need additional configuration

### directives-with-coprocessor
The co-processor needs to be started:
1. cd `co-processor`
1. `npm start`

FYI: The `@policy` directive is always evaluated to true.
Custom code to properly evaluate the `@policy` directive can be added.
`@requiresScopes` and `@policy` achieve the same result. But both are used to show both implementations.

### directives-with-jwt-plugin
An Identity Provider (IDP) like Okta, Google, etc. is needed. The IDP also needs to provide a JWKS endpoint that is required in the router configuration.
Also the `@policy` cannot be used in this approach. To use `@policy` a Rhai-Script or Co-Processor is needed.

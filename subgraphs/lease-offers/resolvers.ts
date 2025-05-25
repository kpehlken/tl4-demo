const resolvers = {
  Query: {
    offers: (_, __, {dataSources}) => {
      return dataSources.leaseOfferAPI.getAllOffers();
    },
    offer: (_, { id }, { dataSources }) => {
      return dataSources.leaseOfferAPI.getOffer(id);
    }
  },
  Mutation: {
    createOffer: (_, { offerInput }, { dataSources }) => {
        const newOffer = dataSources.leaseOfferAPI.createNewOffer(offerInput);
        return {success: true, vehicleOffer: newOffer };
    },
    applyToOffer: (_, { applicationInput }, { dataSources }) => {
        return dataSources.leaseOfferAPI.applyToOffer();
    }

  },
  LeaseOffer: {
    vehicle: ({ vehicleId }) => {
      return {id: vehicleId };
    },
    applicants: (offer) => {
      return offer.applicantIds.map(id => ({ id }));
    },
    __resolveReference: ({ id }, { dataSources }) => {
      return dataSources.leaseOfferAPI.getOffer(id);
    },
  },
  Vehicle: {
    totalOffers: ({id}, _, {dataSources}) => {
      return dataSources.leaseOfferAPI.getTotalOffers(id);
    },
    offersForVehicle: ({id}, _, {dataSources}) => {
      return dataSources.leaseOfferAPI.getOffersOfVehicle(id);
    },
  },
};

export default resolvers;

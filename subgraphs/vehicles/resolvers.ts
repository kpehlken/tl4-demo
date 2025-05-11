const resolvers = {
  Query: {
    vehicles: (_, __, { dataSources }) => {
      return dataSources.vehicleAPI.getAllVehicles();
    },
    vehicle: (_, { id }, { dataSources }) => {
      return dataSources.vehicleAPI.getVehicle(id);
    },
  },
  Vehicle: {
    __resolveReference: ({ id }, { dataSources }) => {
      return dataSources.vehicleAPI.getVehicle(id);
    },
  },
};

export default resolvers;

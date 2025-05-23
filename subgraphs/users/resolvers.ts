const resolvers = {
  Query: {
    users: (_, __, {dataSources, auth}) => {
      return dataSources.usersAPI.getAllUsers();
    }
  },
  Vehicle: {
    dealer: ({ id }, __, { dataSources }) => {
      return dataSources.usersAPI.getUserByVehicleId(id);
    },
    dealerNotes: ({ id }, __, { dataSources, auth }) => {
        return dataSources.usersAPI.getDealerNotesForVehicle(id) ?? "";
    }
  },
  User: {
    __resolveReference: ({ id }, { dataSources }) => {
      return dataSources.usersAPI.getUser(id);
    },
    vehicles: (user, __, { auth }) => {
      return user.vehicleIds.map(id => ({ id }));
    },
    applications: (user, __, { auth }) => {
      return user.applicationIds.map(id => ({ id }));
    }
  }
};

export default resolvers;

const resolvers = {
  Query: {
    users: (_, __, {dataSources, auth}) => {
      if(auth.status === "AUTHENTICATED" && auth.user.roles.includes("admin")) {
        return dataSources.usersAPI.getAllUsers();
      }
    }
  },
  Vehicle: {
    dealer: ({ id }, __, { dataSources }) => {
      return dataSources.usersAPI.getUserByVehicleId(id);
    },
    dealerNotes: ({ id }, __, { dataSources, auth }) => {
      if(auth.status === "AUTHENTICATED" && auth.user.roles.includes("dealer")) {
        return dataSources.usersAPI.getDealerNotesForVehicle(id) ?? "";
      }
      return "unauthenticated";
    }
  },
  User: {
    __resolveReference: ({ id }, { dataSources }) => {
      return dataSources.usersAPI.getUser(id);
    },
    phone: (user, __, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.phone;
      }
    },
    role: (user, __, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.role;
      }
    },
    createdAt: (user, __, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.createdAt;
      }
    },
    vehicles: (user, __, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.vehicleIds.map(id => ({ id }));
      }
    },
    applications: (user, __, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.applicationIds.map(id => ({ id }));
      }
    }
  }
};

export default resolvers;

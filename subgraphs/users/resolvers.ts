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
      if(auth.user.roles.includes("dealer") || auth.user.roles.includes("admin")) {
        return dataSources.usersAPI.getDealerNotesForVehicle(id) ?? "";
      }
      return "";
    }
  },
  User: {
    __resolveReference: ({ id }, { dataSources }) => {
      return dataSources.usersAPI.getUser(id);
    },
    id: (user, _, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.id;
      }
    },
    email: (user, _, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.email;
      }
    },
    phone: (user, _, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.phone;
      }
    },
    createdAt: (user, _, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.createdAt;
      }
    },
    vehicles: (user, _, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.vehicleIds.map(id => ({id}));
      }
    },
    applications: (user, _, { auth }) => {
      if(auth.status === "AUTHENTICATED" && user.id === auth.user.id) {
        return user.applicationIds.map(id => ({id}));
      }
    }
  }
};

export default resolvers;

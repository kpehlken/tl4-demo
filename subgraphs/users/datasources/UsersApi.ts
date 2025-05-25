import { users } from "./users_data.json";

class UsersAPI {

  getAllUsers() {
    return users;
  }

  getUser(id) {
    return users.find(user => user.id === id);
  }

  getUserByVehicleId(vehicleId) {
    return users.find(user => user.vehicleIds.includes(vehicleId));
  }

  getDealerNotesForVehicle(vehicleId) {
    const dealer =  users.find(user => user.vehicleIds.includes(vehicleId));
    return dealer.vehicleNotes[vehicleId];
  }

}

export default UsersAPI;

import {vehicles} from "./vehicle_data.json";


class VehicleApi {
  getAllVehicles() {
    return vehicles;
  }

  getVehicle(id) {
    return vehicles.find(l => l.id === id);
  }
}

export default VehicleApi;

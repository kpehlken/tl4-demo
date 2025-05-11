import {locations} from "./locations_data.json";

class LocationsAPI {
  getAllLocations() {
    return locations;
  }

  getLocation(id) {
    return locations.find(l => l.id === id);
  }
}

export default LocationsAPI;

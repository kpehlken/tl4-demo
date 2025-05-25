import {offers} from "./lease_data.json"
import {readFileSync, writeFileSync} from "fs";

class LeaseOfferApi {
  private readonly filePath: string;

  constructor() {
    this.filePath = "./lease_data.json";
  }


  getAllOffers() {
    return offers;
  }

  getOffer(id) {
    return offers.find(r => r.id === id);
  }

  createNewOffer(input) {
    const newId = "offer" + Math.floor(Math.random() * 10) + 100;

    const newOffer = {
      id: newId,
      ...input,
      applicantIds: []
    }

    this._save(newOffer);

    return newOffer;
  }


  applyToOffer() {
    // Write id from context into json
    const id = "abcdef";

    return {
      success: true
    }
  }

  getTotalOffers(vehicleId) {
    return offers.filter(offer => offer.vehicleId === vehicleId).length;
  }

  getOffersOfVehicle(vehicleId: string) {
    return offers.filter(offer => offer.vehicleId === vehicleId);
  }

  _save(newItem) {
    try {
      const data = JSON.parse(readFileSync(this.filePath, 'utf8'));

      data.push(newItem);

      writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving mock data:', error);
    }
  }
}

export default LeaseOfferApi;

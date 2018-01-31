import GEOLOCATION from '../constants/geolocation';
import { closestMultipleOf } from './helper';

export class Geolocation {
  static get canUseGeolocation () {
    if (window.navigator && window.navigator.geolocation) {
      console.info('geolocation api available');
      return true;
    }
    console.warn('geolocation api not available');
    return false;
  }

  static getCoords(successCallback) {
    if (Geolocation.canUseGeolocation) {
      let done = false;
      window.navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        if (successCallback && !done) {
          done = true;
          const geoAnchor = Geolocation.getGeoAnchor(coords);
          successCallback(geoAnchor);
        }
      }, (error) => {
        console.error(error.message);
      }, {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 5000,
      });
    } else {
      console.error('geolocation api not available');
    }
  }

  static getGeoAnchor (coords) {
    return {
      latitude: closestMultipleOf(GEOLOCATION.ANCHOR_INCREMENT, coords.latitude),
      longitude: closestMultipleOf(GEOLOCATION.ANCHOR_INCREMENT, coords.longitude),
    };
  }
}
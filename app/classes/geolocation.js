export class Geolocation {
  constructor (parent) {
    this.parent = parent;
  }

  get canUseGeolocation () {
    if (window.navigator && window.navigator.geolocation) {
      console.info('geolocation api available');
      return true;
    }
    console.warn('geolocation api not available');
    return false;
  }

  getCoords(successCallback) {
    if (this.canUseGeolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        if (successCallback) {
          successCallback({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
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
}
declare module "leaflet-control-geocoder" {
  import * as L from "leaflet";

  export namespace Control.Geocoder {
    interface GeocoderResult {
      name: string;
      center: L.LatLng;
      bbox: L.LatLngBounds;
    }

    interface Geocoder {
      geocode(
        query: string,
        cb: (results: GeocoderResult[]) => void,
        context?: any
      ): void;
    }

    function nominatim(): Geocoder;
  }

  declare module "leaflet" {
    namespace Control {
      namespace Geocoder {
        function nominatim(): Control.Geocoder.Geocoder;
      }

      class Geocoder extends L.Control {
        constructor(options?: any);
      }
    }
  }

  const Geocoder: typeof L.Control.Geocoder;
  export default Geocoder;
}

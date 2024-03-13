import { Double } from 'typeorm';

export class GetPlaceApiDto {
  id: string;
  name: string;
  description: string;
  type: string;
  subtype: string;
  lat: string;
  lon: string;
  addressId: string;
}

// class Point {
//   lat: Double;
//   lon: Double;
// }

// class Address {
//   building_id: string;
//   components: Components;
//   postcode: string;
// }

// class Components {
//   number: string;
//   street: string;
//   street_id: string;
//   type: string;
// }

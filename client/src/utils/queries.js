import { gql } from "@apollo/client";

export const QUERY_PARKINGS = gql`
  query getParkings($zipcode: String!) {
    parkingsByZip(zipcode: $zipcode) {
      _id
      coordinates
      address
      lng
      lat
      zipcode
    }
  }
`;

export const QUERY_PARKING_ADDRESS = gql`
  query getParkingByAddress($address: String!) {
    parkingByAddress(address: $address) {
      _id
      coordinates
      address
      lng
      lat
      zipcode
      reviews {
        _id
        username
        overallRating
        coordinates
        handicapAccessible
        parkingSpot
        keys
        comment
      }
    }
  }
`;

export const QUERY_ALL_PARKINGS = gql`
  query Parkings {
    parkings {
      _id
      coordinates
      address
      lng
      lat
      zipcode
      reviews {
        _id
        username
        overallRating
        coordinates
        handicapAccessible
        parkingSpot
        keys
        comment
      }
    }
  }
`;
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADDREVIEW = gql`
  mutation addReview($overallRating: String!, $coordinates: String!, $handicapAccessible: String!, $parkingSpot: String!, $keys: String!, $comment: String!) {
    addReview(overallRating: $overallRating, coordinates: $coordinates, handicapAccessible: $handicapAccessible, parkingSpot: $parkingSpot, keys: $keys, comment: $comment) {
      _id
      username
      coordinates
    }
  }
`

export const ADD_PARKING = gql`
  mutation createNewParking($overallRating: String!, $coordinates: String!, $address: String!, $lng: String!, $lat: String!, $zipcode: String!, $handicapAccessible: String!, $parkingSpot: String!, $keys: String!, $comment: String!) {
    createNewParking(overallRating: $overallRating, coordinates: $coordinates, address: $address, lng: $lng, lat: $lat, zipcode: $zipcode, handicapAccessible: $handicapAccessible, parkingSpot: $parkingSpot, keys: $keys, comment: $comment) {
      address
      zipcode
      reviews {
        username
      }
    }
  }
`
export const ADD_ADDRESS = gql`
  mutation createNewAddress($zipcode: String!, $address: String!, $coordinates: String!, $lat: String!, $lng: String! $keys: String!, $comment: String!) {
    createNewAddress(zipcode: $zipcode, address: $address, coordinates: $coordinates, lat: $lat, lng: $lng,  keys: $keys, comment: $comment) {
      address
      zipcode
    }
  }
`

export const EDIT_ADDRESS = gql`
  mutation editAddress($_id: String!, $zipcode: String!, $address: String!, $coordinates: String!, $lat: String!, $lng: String! $keys: String!, $comment: String!) {
    editAddress(_id: $_id, zipcode: $zipcode, address: $address, coordinates: $coordinates, lat: $lat, lng: $lng,  keys: $keys, comment: $comment) {
      address
      zipcode
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        username: String!
        password: String!
        reviews: [Review]
    }
    type Review {
        _id: ID
        username: String
        overallRating: String
        coordinates: String
        handicapAccessible: String
        parkingSpot: String
        keys: String
        comment: String
    }
    type Parking {
        _id: ID
        coordinates: String!
        address: String!
        lng: String!
        lat: String!
        zipcode: String!
        reviews: [Review]
    }
    type Auth {
        token: ID
        user: User
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        parkings: [Parking]
        parkingsByZip(zipcode: String!): [Parking]
        parkingByAddress(address: String!): Parking
        reviews: [Review]
        reviewsByUser(userId: ID!): User
        reviewsByParking(coordinates: String!): Parking
    }
    type Mutation {
        createNewAddress(zipcode: String!, address: String!, coordinates: String!, lat: String!, lng: String! keys: String!, comment: String!): Parking
        editAddress(_id: String!, zipcode: String!, address: String!, coordinates: String!, lat: String!, lng: String! keys: String!, comment: String!): Parking
        addUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, email: String, username: String): User
        updatePassword(password: String!): User
        createNewParking(coordinates: String!, address: String!, zipcode: String!, lng: String!, lat: String, overallRating: String!, handicapAccessible: String!, parkingSpot: String!, keys: String!, comment: String!): Parking
        addReview(overallRating: String!, coordinates: String!, handicapAccessible: String!, parkingSpot: String!, keys: String!, comment: String!): Review
        updateReview(overallRating: String, coordinates: String, handicapAccessible: String, parkingSpot: String, keys: String, comment: String): Review
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
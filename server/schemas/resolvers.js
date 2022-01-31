const { AuthenticationError } = require('apollo-server-express');
const { User, Review, Parking } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
      users: async() => {
        const user = await User.find()
                .select('-__v -password')
                .populate('reviews')
        
        return user;
      },
      user: async(parent, { username }) => {
          const user = await User.findOne({ username: username })
                    .select('-__v -password')
                    .populate('reviews')
            
        return user;
      },
      me: async(parents, args, context) => {
          if (context.user) {
              const me = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                    .populate('reviews')
            
            return me;
          }

          throw new AuthenticationError('Not logged in');
      },
      reviews: async() => {
        const reviews = await Review.find()
        
        return reviews;
    },
    parkings: async(parent, args) => {
        const parkings = await Parking.find({})
                                    .populate('reviews')

        return parkings;
    },
    parkingsByZip: async (parent, args) => {
        const parkings = await Parking.find({zipcode: args.zipcode})
                                    .populate('reviews')
        return parkings;
    },
    parkingByAddress: async (parent, args) => {
        const parking = await Parking.findOne({address: args.address})
                                    .populate('reviews')
        return parking
    }
  },
  Mutation: {
    addUser:  async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return{ token, user }
    },
    updateUser: async ( parent, args, context ) => {
        
        if (context.user) {
            const newMe = await User.findOneAndUpdate(
            { _id: context.user._id },
            { ...args },
            { new: true }
        )
        
        return newMe;
        }

        throw new AuthenticationError('You need to be logged in')
    },
    updatePassword: async (parent, args, context) => {
        if (context.user) {
            const newPassword = await User.findOne(
                {_id: context.user._id},
            )
            newPassword.password = args.password
            await newPassword.save()

            return await User.findOne({_id: context.user._id})
        }
        
        throw new AuthenticationError('You need to be logged in')
    },
    login: async ( parent, { email, password } ) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }

       const token = signToken(user);
       
       return { token, user };
    },
    addReview: async (parent, args, context) => {

        if (context.user) {
            
            const review = await Review.create({username: context.user.username, ...args})

            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                { $addToSet: {reviews: review._id}},
                {new: true}
                )            
           
            const updatedParking = await Parking.findOneAndUpdate(
                   {coordinates: args.coordinates},
                   { $push: {reviews: review._id}},
                   {new: true}
                   )

            return updatedParking
        }

       throw new AuthenticationError('You need to be logged in!')
    },
    updateReview: async (parent, args, context) => {
        if (context.user) {
            
            const updatedReview = Review.findOneAndUpdate(
                { coordinates: args.coordinates},
                {...args},
                {new: true}
                )

            return updatedReview;
        }
        throw new AuthenticationError('You need to be logged in')
    },
    createNewAddress: async (parent, args, context) => { 
        if (context.user) {
            const parking = await Parking.create(args)
            return parking   
        }   
        throw new AuthenticationError('You need to be logged in')
    },
    editAddress: async (parent, args, context) => { 
        if (context.user) {
            const parking = await Parking.findByIdAndUpdate(args._id,args)
            return parking   
        }   
        throw new AuthenticationError('You need to be logged in')
    },

    createNewParking: async (parent, args, context) => {

        const {zipcode, address, coordinates, lng, lat, overallRating, handicapAccessible, parkingSpot, keys, comment} = args

        if (context.user) {
            const review = await Review.create({username: context.user.username, coordinates, overallRating, handicapAccessible, parkingSpot, keys, comment})

            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                { $addToSet: {reviews: review._id}},
                {new: true}
                )        

            const newParking = await Parking.create(
                { coordinates: coordinates, address: address, lng: lng, lat: lat, zipcode: zipcode, reviews: [review._id]}
            )

            return newParking
        }
        throw new AuthenticationError('You need to be logged in')
    }
  }
};

module.exports = resolvers;
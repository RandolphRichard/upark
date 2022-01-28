const db = require('./connection');
const { User, Parking, Review } = require('../models');

db.once('open', async () => {
       
    await Parking.deleteMany();

    const parkings = await Parking.insertMany([
        {zipcode: 'k1v-8v7', address: '2851-baycrest-dr ottawa', coordinates: '-45.378712X-75.650355', lat:'-45.378712', lng: '-75.650355' },
        {zipcode: 'K1P 5H9', address: '275 Slater Street, Ottawa ON ', coordinates: '45.41872X-75.70159', lat: '45.41872', lng: '-75.70159'},
        {zipcode: 'K1H 8K7', address: '1355 Bank Street, Ottawa, ON ', coordinates: '45.38796X-75.67521' , lat: '45.38796', lng: '-75.67521'},
        {zipcode: 'k1v-8v7', address: "2851-baycrest-dr ottawa", coordinates: '-45.378712X-75.650355', lat: '-45.378712', lng: '-75.650355'}
    ]);

    console.log('Parkings seeded');

    await User.deleteMany();

    await User.create({
      firstName: 'tesfu',
      lastName: 'tegenge',
      email: 'tesfu@testmail.com',
      username: 'tesfu',
      password: 'password12345',
    });
  
    await User.create({
      firstName: 'abebe',
      lastName: 'kebede',
      email: 'abebe@testmail.com',
      username: 'abebe',
      password: 'password12345'
    });
  
    console.log('users seeded');

    await Review.deleteMany();

    const reviews = await Review.insertMany([
        {
            username: 'tesfu',
            overallRating: 4,
            coordinates: '678X678',
            
            handicapAccessible: true,
            parkingSpot: true,
            keys: false,
            comments: 'This is a great place to use the parking lot.'
        },
        {
            username: 'abebe',
            overallRating: 1,
            coordinates: '9723X2309',
           
            handicapAccessible: true,
            parkingSpot: true,
            keys: false,
            comments: 'This is a terrible place to use the parking lot.'
        },
        {
            username: 'tesfu',
            overallRating: 3,
            coordinates: '1289X09324',
            
            handicapAccessible: true,
            parkingSpot: false,
            keys: true,
            comments: 'This is a decent place to use the parking lot.'
        },
        {
            username: 'abebe',
            overallRating: 1,
            coordinates: '1209X230990',
            
            handicapAccessible: true,
            parkingSpot: false,
            keys: false,
            comments: 'This is a terrible place to use the parking lot.'
        }
    ]);

    console.log('parkings seeded');

    process.exit();
})
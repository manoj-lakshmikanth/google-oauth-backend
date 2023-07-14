/*************************************Task 4*************************************************/

const mongoose = require('mongoose');

const task4 = () => {
  //  City schema
  const citySchema = new mongoose.Schema({
    name: String,
    country: String,
  });

  //  User schema with a reference to the City collection
  const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
  });

  //  models based on the schemas
  const City = mongoose.model('City', citySchema);
  const User = mongoose.model('User', userSchema);

  //input city data
  const cityData = [{ name: 'Bengaluru', country: 'India' }];

  // input user data
  const userData = [{ name: 'Virat kohli', age: 25, city: null }];

  //  city data
  City.insertMany(cityData)
    .then((cities) => {
      // city references to the user data
      userData[0].city = cities[0]._id;
      //   userData[1].city = cities[1]._id;

      //  user data
      return User.insertMany(userData);
    })
    .then((users) => {
      // aggregation and population to combine data
      return User.aggregate([
        {
          $lookup: {
            from: 'cities',
            localField: 'city',
            foreignField: '_id',
            as: 'cityDetails',
          },
        },
        {
          $unwind: '$cityDetails',
        },
        {
          $project: {
            _id: 1,
            name: 1,
            age: 1,
            city: '$cityDetails.name',
            country: '$cityDetails.country',
          },
        },
      ])
        .exec()
        .then((results) => {
          console.log('Task 4');
          console.log(results);
          // Example output:
          // [
          //   { _id: ObjectId("6151f34a0588c9c829fb63a0"), name: 'User 1', age: 25, city: 'City 1', country: 'Country 1' },
          // ]
        });
    })
    .catch((err) => {
      console.error(err);
    });

  User.find()
    .populate('city', 'name') // Populating the 'city' field with the referenced City document
    .then((user) => {
      console.log(user);
      // Example output:
      // [
      //   {_id: new ObjectId("64b0d01d58387d26bb46a0a4"), name: 'Virat kohli', age: 25, city: { _id: new ObjectId("64b0d01d58387d26bb46a09e"), name: 'Bengaluru'},__v: 0}
      // ]
    })
    .catch((err) => console.error(err));
};

module.exports = task4;

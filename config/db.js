const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const Drink = require('../models/Drink');

const drinkData = [
  {
    id: 1,
    name: 'Monster Ultra Sunrise', 
    caffeine: 75, 
    serving: 2
  },
  {
    id: 2,
    name: 'Black Coffee', 
    caffeine: 95, 
    serving: 1
  },
  {
    id: 3,
    name: 'Americano', 
    caffeine: 77, 
    serving: 1
  },
  {
    id: 4,
    name: 'Sugar free NOS', 
    caffeine: 130, 
    serving: 2
  },
  {
    id: 5,
    name: '5 Hour Energy', 
    caffeine: 200, 
    serving: 2
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');

    const drink = await Drink.find();
    if (drink.length == 0)
    {
      for (let i = 0; i < drinkData.length; i ++) {
        const drink = new Drink({
          id: drinkData[i].id,
          name: drinkData[i].name,
          caffeine: drinkData[i].caffeine,
          serving: drinkData[i].serving
        });
        drink.save();
      }
    }
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

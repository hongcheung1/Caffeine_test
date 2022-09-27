const express = require('express');
const Drink = require('../../models/Drink');
const router = express.Router();

// @route    GET api/drinks
// @desc     Gets all drinks
// @access   Public
router.get(
  '/',
  async (req, res) => {
    const drinks = await Drink.find();
    console.log(drinks);
    res.send({
      drinks
    });
  }
);

router.post(
  '/calc',
  async(req, res) => {
    const { favourite, consumed } = req.body;
    const drink = await Drink.findOne({ id: favourite });
    console.log(favourite, drink);
    const total = Math.floor(500 / drink.caffeine);

    
    const data = {
      result: consumed < 0 ? -1 : ( total < consumed ? 0 : 1),
      avail: total - consumed
    }
    res.send(data);
  }
);

module.exports = router;

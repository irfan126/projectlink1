const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
  res.json({"secret": true});
});

router.get('', function(req, res) {
	Rental.find({}, function(err, foundRentals) {
		res.json(foundRentals);
	});
});

router.get('', function(req, res) {
  Rental.find({})
      .exec(function(err, foundRentals) {

    return res.json(foundRentals);
  });
});

router.get('/:id', function(req, res) {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
        .populate('user', 'username -_id')
        .exec(function(err, foundRental) {

    if (err || !foundRental) {
      return res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find Rental!'}]});
    }

    return res.json(foundRental);
  });
});

module.exports = router;


const express = require('express');
const router = express.Router();

// routes
router.get('/remainDays', remainDays);


module.exports = router;


function remainDays(req, res, next) {
  var remainDays;
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  if(isLeapYear) {
    remainDays = 366 - day;
  } else {
    remainDays = 365 - day;
  }
  return res.json({days: remainDays});
}

function isLeapYear()
{
  var year = new Date().getFullYear();
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

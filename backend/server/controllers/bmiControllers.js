const Bmi = require('../../models/bmiModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');

exports.addNewBMI = async (req, res, next) => {
 try {

  var bmiCalc = (req.body.weight)/(req.body.height*req.body.height);
  bmiCalc = parseFloat(bmiCalc).toFixed(2);
  const newBMI = new Bmi({
   weight: req.body.weight,
   bmi: parseFloat(bmiCalc),
   userID: req.body.userID
  });

  await newBMI.save()
  res.status(200).json({message:"Diet Added.", bmi: bmiCalc})
}
catch(error) {
   next(error)
 }
}

exports.getAllBMIs = async (req, res, next) => {
  const bmis = await Bmi.find({});
  res.status(200).json({
    data: bmis
  });
}

exports.getFilteredBMIs = async (req, res, next) => {
  const search = {
    weight: req.query.weight,
    bmi: req.query.bmi,
    userID: req.query.userID,
    dateCreated: req.query.dateCreated
  };

   var counter=0;
   var conditions = [];


   Object.entries(search).forEach(([key,value]) => {
     if(value !== "")
     {
       var json = {};
       json[key]= value;
       conditions[counter++] = json;

     }
   });
  var bmis;
  if(conditions.length == 0){
     bmis = await Bmi.find({});
  }
  else {
     bmis = await Bmi.find({$and: conditions});
  }

  res.status(200).json({
    data: bmis
  });
}

 //validate role
exports.updateBMI = async (req, res, next) => {
 try {
   const id_upd = req.query.bmiID;

   const bmiBody = req.body;

   await Bmi.findByIdAndUpdate(id_upd, bmiBody);
   const bmi = await Bmi.findById(id_upd);

   res.status(200).json({
    data: bmi,
    message: 'BMI updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.deleteBMI = async (req, res, next) => {
 try {
  const id_del = req.query.bmiID;

  await Bmi.findByIdAndDelete(id_del);
  res.status(200).json({
   data: null,
   message: 'BMI has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}

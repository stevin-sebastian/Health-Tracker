const Diet = require('../../models/dietModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');

exports.addNewDiet = async (req, res, next) => {
 try {

  const newDiet = new Diet({
   assignedDateTime: req.body.assignedDateTime,
   title: req.body.title,
   items: req.body.items,
   userID: req.body.userID
  });

  await newDiet.save()
  res.status(200).json({message:"Diet Added."})
}
catch(error) {
   next(error)
 }
}

exports.getAllDiets = async (req, res, next) => {
  const diets = await Diet.find({});
  res.status(200).json({
    data: diets
  });
}

exports.getFilteredDiets = async (req, res, next) => {
  const search = {
    assignedDateTime: req.query.assignedDateTime,
    actualDateTime: req.query.actualDateTime,
    timeDifference: req.query.timeDifference,
    isChecked: req.query.isChecked,
    title: req.query.title,
    items: req.query.items,
    dateCreated: req.query.dateCreated,
    userID: req.query.userID
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
  var diets;
  if(conditions.length == 0){
     diets = await Diet.find({});
  }
  else {
     diets = await Diet.find({$and: conditions});
  }

  res.status(200).json({
    data: diets
  });
}

 //validate role
exports.updateDiet = async (req, res, next) => {
 try {
   const id_upd = req.query.dietID;

   const dietBody = req.body;

   await Diet.findByIdAndUpdate(id_upd, dietBody);
   const diet = await Diet.findById(id_upd);

   res.status(200).json({
    data: diet,
    message: 'Diet updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.deleteDiet = async (req, res, next) => {
 try {
  const id_del = req.query.dietID;

  await Diet.findByIdAndDelete(id_del);
  res.status(200).json({
   data: null,
   message: 'Diet has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}

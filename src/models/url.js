const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    originalUrl:{
      type:String,
      required:[true, "original Url is required"],
      trim:true
    },
    shortCode:{
      type: String,
      required:[true, "shortened Url is required"],
      trim:true,
      unique:true,
      index:true
    },
    clicks:{
      type:Number,
      required:true,
      default:0
    }
  },
  {
    timestamps:true
  }
);

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedCats` array in User.js
const catSchema = new Schema({
  name: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },

   saved cat id 
   catId: {
     type: String,
     required: true,
  },

  image: {
    type: String,
  },
  link: {
    type: String,
  },
  kind: {
    type: String,
    required: true,
  },
});

module.exports = catSchema;
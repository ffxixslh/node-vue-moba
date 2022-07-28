const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  title: { type: String },
  body: { type: String },
});

module.exports = mongoose.model("Article", schema);

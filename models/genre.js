var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
});

GenreSchema.virtual("url").get(() => {
  return "/catalog/genre" + this.id;
});

module.exports = mongoose.model("Genre", GenreSchema);

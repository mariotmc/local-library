var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(() => {
  // To avoid errors in cases where an author does not have either a family name or first name, handle the exception by returning an empty string for that case
  var fullName = "";

  if (this.first_name && this.family_name) fullName = this.family_name + "," + this.first_name;

  if (!this.first_name || !this.family_name) fullName = "";

  return fullName;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(() => {
  var lifetime_string = "";

  if (this.date_of_birth) lifetime_string = this.date_of_birth.getYear().toString();

  lifetime_string += " - ";

  if (this.date_of_death) lifetime_string += this.date_of_death.getYear();

  return lifetime_string;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(() => {
  return "/catalog/author/" + this.id;
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const documentSchema = new Schema(
  {
    title: { type: String },
    name: { type: String },
    type: { type: String },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    urlDoc: { type: String },
    course: { type: Schema.Types.ObjectId, ref: "course" },
  },
  { timestamps: true }
);

const document = mongoose.model("document", documentSchema);

export default document;

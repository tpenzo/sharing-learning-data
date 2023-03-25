import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
    author: { type: Schema.Types.ObjectId, ref: "user" },
    status: {
      type: String,
      enum: ["deny", "pending", "posted"],
      default: "posted",
    },
    course: { type: Schema.Types.ObjectId, ref: "course" },
    docs: [
      {
        type: Schema.Types.ObjectId,
        ref: "document",
      },
    ],
  },
  { timestamps: true }
);

const post = mongoose.model("post", postSchema);

export default post;

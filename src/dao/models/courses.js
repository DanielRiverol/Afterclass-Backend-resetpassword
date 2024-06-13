import mongoose from "mongoose";

const courseCollection = "Courses";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  
  students: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
      },
    ],
    default: [],
  },
});

const courseModel = mongoose.model(courseCollection, courseSchema);
export default courseModel

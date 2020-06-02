import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  courseName: String,
  chapters: Array,
});

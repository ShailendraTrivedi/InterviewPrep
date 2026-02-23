import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  categoryId: mongoose.Types.ObjectId;
  groupId: mongoose.Types.ObjectId;
  topicId: mongoose.Types.ObjectId;
  question: string;
  answer: string;
}

const questionSchema = new Schema<IQuestion>(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    question: { type: String, required: true }, // Markdown supported
    answer: { type: String, required: true }, // Markdown supported
  }
);

questionSchema.index({ topicId: 1 });

export const Question = mongoose.model<IQuestion>('Question', questionSchema);

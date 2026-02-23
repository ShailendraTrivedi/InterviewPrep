import mongoose, { Document, Schema } from 'mongoose';

export interface ITopic extends Document {
  groupId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  name: string;
  title: string;
}

const topicSchema = new Schema<ITopic>(
  {
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
  }
);

topicSchema.index({ groupId: 1, name: 1 }, { unique: true });

export const Topic = mongoose.model<ITopic>('Topic', topicSchema);

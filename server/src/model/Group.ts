import mongoose, { Document, Schema } from 'mongoose';

export interface IGroup extends Document {
  categoryId: mongoose.Types.ObjectId;
  name: string;
  title: string;
  icon: string;
}

const groupSchema = new Schema<IGroup>(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    icon: { type: String, required: true },
  }
);

groupSchema.index({ categoryId: 1, name: 1 }, { unique: true });

export const Group = mongoose.model<IGroup>('Group', groupSchema);

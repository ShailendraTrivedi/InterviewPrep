import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  title: string;
  icon: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    icon: { type: String, required: true },
  }
);

export const Category = mongoose.model<ICategory>('Category', categorySchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IExample extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExampleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExample>('Example', ExampleSchema);


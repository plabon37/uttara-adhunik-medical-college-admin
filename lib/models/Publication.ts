import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPublication extends Document {
  title: string;
  slug: string;
  type: "Journal" | "Tender";
  pdf: string;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PublicationSchema = new Schema<IPublication>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Journal", "Tender"],
      default: "Journal",
    },

    pdf: {
      type: String,
      default: "",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Publication: Model<IPublication> =
  mongoose.models.Publication ||
  mongoose.model<IPublication>("Publication", PublicationSchema);

export default Publication;
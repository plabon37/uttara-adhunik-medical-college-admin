import { Schema, model, models } from "mongoose";

const NoticeSchema = new Schema(
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
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "General Notice",
        "Admission Notice",
        "Reports",
        "Job Circular",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    pdf: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
      trim: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const NoticeModel =
  models.NoticeModel || model("NoticeModel", NoticeSchema);
import { Schema, model, models } from "mongoose";

const HeroSchema = new Schema(
  {
    tagline: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    highlightText: {
      type: String,
      required: true,
      trim: true,
    },

    lastTitle: {
      type: String,
      required: true,
      trim: true,
    },

    buttonText: {
      type: String,
      required: true,
      trim: true,
    },

    buttonLink: {
      type: String,
      required: true,
      trim: true,
    },

    backgroundImage: {
      type: String,
      required: true,
    },

    rightTitle: {
      type: String,
      required: true,
      trim: true,
    },

    courseOneTitle: {
      type: String,
      required: true,
      trim: true,
    },

    courseOneDescription: {
      type: String,
      required: true,
      trim: true,
    },

    courseTwoTitle: {
      type: String,
      required: true,
      trim: true,
    },

    courseTwoDescription: {
      type: String,
      required: true,
      trim: true,
    },

    slideNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const HeroModel =
  models.HeroModel || model("HeroModel", HeroSchema);
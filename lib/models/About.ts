import { Schema, model, models } from "mongoose";

const AboutSchema = new Schema(
  {
    /* =====================================================
       SMALL TAGLINE
       Example:
       knowledge meets innovation
    ===================================================== */

    tagline: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       MAIN TITLE
       Example:
       About
    ===================================================== */

    title: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       HIGHLIGHT TEXT
       Example:
       UAMC
    ===================================================== */

    highlightText: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       DESCRIPTION ONE
    ===================================================== */

    descriptionOne: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       DESCRIPTION TWO
    ===================================================== */

    descriptionTwo: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       LEFT IMAGE ONE
    ===================================================== */

    imageOne: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       LEFT IMAGE TWO
    ===================================================== */

    imageTwo: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       UAMC LOGO
    ===================================================== */

    logo: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       COLLEGE MISSION STATEMENT
    ===================================================== */

    missionTitle: {
      type: String,
      required: true,
      trim: true,
    },

    missionLink: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       COLLEGE VISION ACHIEVEMENT
    ===================================================== */

    visionTitle: {
      type: String,
      required: true,
      trim: true,
    },

    visionLink: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       VIEW OUR PROGRAM BUTTON
    ===================================================== */

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

    /* =====================================================
       ACTIVE / PUBLISHED STATUS
    ===================================================== */

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AboutModel =
  models.AboutModel ||
  model("AboutModel", AboutSchema);
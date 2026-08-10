import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// =========================================================
// PRINCIPAL MESSAGE INTERFACE
// =========================================================

export interface IPrincipalMessage
  extends Document {
  tagline: string;

  titlePrefix: string;

  titleHighlight: string;

  signatureImage: string;

  principalName: string;

  designation: string;

  heading: string;

  description: string;

  principalImage: string;

  buttonText: string;

  buttonLink: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

// =========================================================
// SCHEMA
// =========================================================

const PrincipalMessageSchema =
  new Schema<IPrincipalMessage>(
    {
      // =====================================================
      // TAGLINE
      // =====================================================

      tagline: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // TITLE PREFIX
      // =====================================================

      titlePrefix: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // TITLE HIGHLIGHT
      // =====================================================

      titleHighlight: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // SIGNATURE IMAGE
      // =====================================================

      signatureImage: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // PRINCIPAL NAME
      // =====================================================

      principalName: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // DESIGNATION
      // =====================================================

      designation: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // HEADING
      // =====================================================

      heading: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // DESCRIPTION
      // =====================================================

      description: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // PRINCIPAL IMAGE
      // =====================================================

      principalImage: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // BUTTON TEXT
      // =====================================================

      buttonText: {
        type: String,
        default: "Read More",
        trim: true,
      },

      // =====================================================
      // BUTTON LINK
      // =====================================================

      buttonLink: {
        type: String,
        default: "#",
        trim: true,
      },

      // =====================================================
      // ACTIVE STATUS
      // =====================================================

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

// =========================================================
// MODEL
// =========================================================

export const PrincipalMessageModel =
  (mongoose.models.PrincipalMessage as Model<IPrincipalMessage>) ||
  mongoose.model<IPrincipalMessage>(
    "PrincipalMessage",
    PrincipalMessageSchema
  );
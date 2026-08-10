import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// =========================================================
// INTERFACE
// =========================================================

export interface IAdmission
  extends Document {
  backgroundImage: string;

  titlePrefix: string;

  title: string;

  description: string;

  buttonText: string;

  buttonLink: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

// =========================================================
// SCHEMA
// =========================================================

const AdmissionSchema =
  new Schema(
    {
      // =====================================================
      // BACKGROUND IMAGE
      // =====================================================

      backgroundImage: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // TITLE PREFIX
      // Example: UAMC
      // =====================================================

      titlePrefix: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // MAIN TITLE
      // Example: Admission
      // =====================================================

      title: {
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
      // BUTTON TEXT
      // Example: Learn More
      // =====================================================

      buttonText: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // BUTTON LINK
      // Example: /admission
      // =====================================================

      buttonLink: {
        type: String,
        required: true,
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

export const AdmissionModel =
  (mongoose.models.Admission as Model<IAdmission>) ||
  mongoose.model<IAdmission>(
    "Admission",
    AdmissionSchema
  );
import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// =========================================================
// INTERFACE
// =========================================================

export interface IDepartment extends Document {
  name: string;

  slug: string;

  image: string;

  description?: string;

  isPopular: boolean;

  isActive: boolean;

  order: number;

  createdAt: Date;

  updatedAt: Date;
}

// =========================================================
// SCHEMA
// =========================================================

const DepartmentSchema =
  new Schema<IDepartment>(
    {
      // =====================================================
      // DEPARTMENT NAME
      // =====================================================

      name: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // SLUG
      // =====================================================

      slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },

      // =====================================================
      // DEPARTMENT IMAGE
      // =====================================================

      image: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // DESCRIPTION
      // =====================================================

      description: {
        type: String,
        trim: true,
        default: "",
      },

      // =====================================================
      // POPULAR DEPARTMENT
      // =====================================================

      isPopular: {
        type: Boolean,
        default: false,
      },

      // =====================================================
      // ACTIVE STATUS
      // =====================================================

      isActive: {
        type: Boolean,
        default: true,
      },

      // =====================================================
      // DISPLAY ORDER
      // =====================================================

      order: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

// =========================================================
// MODEL
// =========================================================

export const DepartmentModel =
  (mongoose.models.Department as Model<IDepartment>) ||
  mongoose.model<IDepartment>(
    "Department",
    DepartmentSchema
  );
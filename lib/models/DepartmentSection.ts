import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// =========================================================
// INTERFACE
// =========================================================

export interface IDepartmentSection
  extends Document {
  title: string;

  description: string;

  searchPlaceholder: string;

  popularSearches: string[];

  imageOne: string;

  imageTwo: string;

  studentCount: string;

  studentCountText: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

// =========================================================
// SCHEMA
// =========================================================

const DepartmentSectionSchema =
  new Schema<IDepartmentSection>(
    {
      // =====================================================
      // SECTION TITLE
      // =====================================================

      title: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // SECTION DESCRIPTION
      // =====================================================

      description: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // SEARCH PLACEHOLDER
      // =====================================================

      searchPlaceholder: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // POPULAR SEARCHES
      // =====================================================

      popularSearches: {
        type: [String],
        default: [],
      },

      // =====================================================
      // RIGHT IMAGE ONE
      // =====================================================

      imageOne: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // RIGHT IMAGE TWO
      // =====================================================

      imageTwo: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // STUDENT / DEPARTMENT COUNT
      // =====================================================

      studentCount: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // STUDENT COUNT TEXT
      // =====================================================

      studentCountText: {
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

export const DepartmentSectionModel =
  (mongoose.models.DepartmentSection as Model<IDepartmentSection>) ||
  mongoose.model<IDepartmentSection>(
    "DepartmentSection",
    DepartmentSectionSchema
  );
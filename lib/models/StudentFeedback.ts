import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// =========================================================
// INTERFACE
// =========================================================

export interface IStudentFeedback
  extends Document {
  name: string;

  designation: string;

  feedback: string;

  image: string;

  rating: number;

  isPublished: boolean;

  order: number;

  createdAt: Date;

  updatedAt: Date;
}

// =========================================================
// SCHEMA
// =========================================================

const StudentFeedbackSchema =
  new Schema<IStudentFeedback>(
    {
      // =====================================================
      // STUDENT NAME
      // =====================================================

      name: {
        type: String,

        required: [
          true,
          "Student name is required.",
        ],

        trim: true,

        minlength: [
          2,
          "Student name must be at least 2 characters.",
        ],

        maxlength: [
          100,
          "Student name cannot exceed 100 characters.",
        ],
      },

      // =====================================================
      // DESIGNATION
      // =====================================================

      designation: {
        type: String,

        required: [
          true,
          "Designation is required.",
        ],

        trim: true,

        minlength: [
          2,
          "Designation must be at least 2 characters.",
        ],

        maxlength: [
          100,
          "Designation cannot exceed 100 characters.",
        ],
      },

      // =====================================================
      // FEEDBACK
      // =====================================================

      feedback: {
        type: String,

        required: [
          true,
          "Feedback is required.",
        ],

        trim: true,

        minlength: [
          5,
          "Feedback must be at least 5 characters.",
        ],

        maxlength: [
          1000,
          "Feedback cannot exceed 1000 characters.",
        ],
      },

      // =====================================================
      // CLOUDINARY IMAGE
      // =====================================================

      image: {
        type: String,

        required: [
          true,
          "Student image is required.",
        ],

        trim: true,
      },

      // =====================================================
      // RATING
      // =====================================================

      rating: {
        type: Number,

        required: [
          true,
          "Rating is required.",
        ],

        min: [
          1,
          "Rating must be at least 1.",
        ],

        max: [
          5,
          "Rating cannot be more than 5.",
        ],

        default: 5,
      },

      // =====================================================
      // PUBLISHED
      // =====================================================

      isPublished: {
        type: Boolean,

        default: true,
      },

      // =====================================================
      // DISPLAY ORDER
      // =====================================================

      order: {
        type: Number,

        default: 0,

        min: [
          0,
          "Order cannot be negative.",
        ],
      },
    },

    {
      timestamps: true,
    }
  );

// =========================================================
// MODEL
// =========================================================

const StudentFeedback: Model<IStudentFeedback> =
  mongoose.models.StudentFeedback ||
  mongoose.model<IStudentFeedback>(
    "StudentFeedback",
    StudentFeedbackSchema
  );

// =========================================================
// EXPORT
// =========================================================

export default StudentFeedback;
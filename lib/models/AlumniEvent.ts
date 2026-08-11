import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// =========================================================
// INTERFACE
// =========================================================

export interface IAlumniEvent
  extends Document {
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// =========================================================
// SCHEMA
// =========================================================

const AlumniEventSchema =
  new Schema<IAlumniEvent>(
    {
      // =====================================================
      // EVENT TITLE
      // =====================================================

      title: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // EVENT DATE
      // =====================================================

      date: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // EVENT TIME
      // =====================================================

      time: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // EVENT LOCATION
      // =====================================================

      location: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // CLOUDINARY IMAGE URL
      // =====================================================

      image: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // PUBLISH STATUS
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
      },
    },
    {
      timestamps: true,
    }
  );

// =========================================================
// MODEL
// =========================================================

const AlumniEvent: Model<IAlumniEvent> =
  mongoose.models.AlumniEvent ||
  mongoose.model<IAlumniEvent>(
    "AlumniEvent",
    AlumniEventSchema
  );

export default AlumniEvent;
import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// =========================================================
// INTERFACE
// =========================================================

export interface INews extends Document {
  title: string;

  slug: string;

  category: string;

  description: string;

  image: string;

  author: string;

  date: Date;

  isPublished: boolean;

  order: number;

  createdAt: Date;

  updatedAt: Date;
}

// =========================================================
// SCHEMA
// =========================================================

const NewsSchema =
  new Schema<INews>(
    {
      // =====================================================
      // TITLE
      // =====================================================

      title: {
        type: String,

        required: true,

        trim: true,
      },

      // =====================================================
      // SLUG
      // Used for client details page:
      // /news/[slug]
      // =====================================================

      slug: {
        type: String,

        required: true,

        unique: true,

        trim: true,

        lowercase: true,
      },

      // =====================================================
      // CATEGORY
      // =====================================================

      category: {
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
      // IMAGE
      // Cloudinary URL
      // =====================================================

      image: {
        type: String,

        required: true,

        trim: true,
      },

      // =====================================================
      // AUTHOR
      // =====================================================

      author: {
        type: String,

        required: true,

        trim: true,
      },

      // =====================================================
      // DATE
      // =====================================================

      date: {
        type: Date,

        required: true,
      },

      // =====================================================
      // PUBLISHED
      // =====================================================

      isPublished: {
        type: Boolean,

        default: true,
      },

      // =====================================================
      // ORDER
      // =====================================================

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

// =========================================================
// INDEX
// =========================================================

NewsSchema.index({
  isPublished: 1,

  order: 1,
});

NewsSchema.index({
  slug: 1,
});

// =========================================================
// MODEL
// =========================================================

const News: Model<INews> =
  mongoose.models.News ||
  mongoose.model<INews>(
    "News",
    NewsSchema
  );

export default News;
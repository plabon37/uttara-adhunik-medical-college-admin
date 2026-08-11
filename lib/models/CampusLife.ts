import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// =========================================================
// CAMPUS LIFE ITEM INTERFACE
// =========================================================

export interface ICampusLifeItem {
  _id?: mongoose.Types.ObjectId;

  title: string;

  image: string;

  link: string;

  isActive: boolean;

  order: number;
}

// =========================================================
// CAMPUS LIFE DOCUMENT INTERFACE
// =========================================================

export interface ICampusLife
  extends Document {
  tagline: string;

  title: string;

  description: string;

  items: ICampusLifeItem[];

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

// =========================================================
// CAMPUS LIFE ITEM SCHEMA
// =========================================================

const CampusLifeItemSchema =
  new Schema<ICampusLifeItem>(
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
      // IMAGE
      // =====================================================

      image: {
        type: String,

        required: true,

        trim: true,
      },

      // =====================================================
      // LINK
      // =====================================================

      link: {
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

      // =====================================================
      // ORDER
      // =====================================================

      order: {
        type: Number,

        default: 0,
      },
    },
    {
      _id: true,
    }
  );

// =========================================================
// CAMPUS LIFE MAIN SCHEMA
// =========================================================

const CampusLifeSchema =
  new Schema<ICampusLife>(
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
      // SECTION TITLE
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
      // CAMPUS LIFE CARDS
      // =====================================================

      items: {
        type: [CampusLifeItemSchema],

        required: true,

        validate: {
          validator: function (
            items: ICampusLifeItem[]
          ) {
            return (
              Array.isArray(items) &&
              items.length > 0
            );
          },

          message:
            "At least one Campus Life item is required.",
        },
      },

      // =====================================================
      // PUBLISH STATUS
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
// PREVENT MODEL OVERWRITE ERROR
// =========================================================

export const CampusLifeModel: Model<ICampusLife> =
  (mongoose.models
    .CampusLife as Model<ICampusLife>) ||
  mongoose.model<ICampusLife>(
    "CampusLife",
    CampusLifeSchema
  );
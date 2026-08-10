import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";


export interface IFacilityItem {
  name: string;

  title: string;

  description: string;

  detailsText: string;

  detailsLink: string;

  isActive: boolean;

  order: number;
}

// =========================================================
// FACILITIES INTERFACE
// =========================================================

export interface IFacilities
  extends Document {
  tagline: string;

  title: string;

  image: string;

  facilities: IFacilityItem[];

  programButtonText: string;

  programButtonLink: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

// =========================================================
// FACILITY ITEM SCHEMA
// =========================================================

const FacilityItemSchema =
  new Schema<IFacilityItem>(
    {
      // =====================================================
      // FACILITY NAME
      // =====================================================

      name: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // FACILITY TITLE
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
      // DETAILS TEXT
      // =====================================================

      detailsText: {
        type: String,
        default: "View Details",
        trim: true,
      },

      // =====================================================
      // DETAILS LINK
      // =====================================================

      detailsLink: {
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
// MAIN FACILITIES SCHEMA
// =========================================================

const FacilitiesSchema =
  new Schema<IFacilities>(
    {
      // =====================================================
      // SECTION TAGLINE
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
      // SECTION IMAGE
      // =====================================================

      image: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // FACILITIES LIST
      // =====================================================

      facilities: {
        type: [FacilityItemSchema],
        default: [],
      },

      // =====================================================
      // PROGRAM BUTTON TEXT
      // =====================================================

      programButtonText: {
        type: String,
        default: "View Our Program",
        trim: true,
      },

      // =====================================================
      // PROGRAM BUTTON LINK
      // =====================================================

      programButtonLink: {
        type: String,
        default: "/programs",
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
// FACILITIES MODEL
// =========================================================

export const FacilitiesModel =
  (mongoose.models.Facilities as Model<IFacilities>) ||
  mongoose.model<IFacilities>(
    "Facilities",
    FacilitiesSchema
  );
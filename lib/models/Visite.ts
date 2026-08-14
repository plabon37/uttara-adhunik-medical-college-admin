import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IVisite extends Document {
  title: string;

  description: string;

  secondaryDescription: string;

  phoneNumber: string;

  phoneText: string;

  buttonText: string;

  buttonLink: string;

  imageOne: string;

  imageTwo: string;

  badgeNumber: string;

  badgeText: string;

  isPublished: boolean;

  createdAt: Date;

  updatedAt: Date;
}

const VisiteSchema = new Schema<IVisite>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    secondaryDescription: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    phoneText: {
      type: String,
      required: true,
      trim: true,
    },

    buttonText: {
      type: String,
      required: true,
      trim: true,
      default: "View Our Program",
    },

    buttonLink: {
      type: String,
      required: true,
      trim: true,
      default: "#",
    },

    imageOne: {
      type: String,
      required: true,
      trim: true,
    },

    imageTwo: {
      type: String,
      required: true,
      trim: true,
    },

    badgeNumber: {
      type: String,
      required: true,
      trim: true,
    },

    badgeText: {
      type: String,
      required: true,
      trim: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Visite: Model<IVisite> =
  mongoose.models.Visite ||
  mongoose.model<IVisite>(
    "Visite",
    VisiteSchema,
  );

export default Visite;
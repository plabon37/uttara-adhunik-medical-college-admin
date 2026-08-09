import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IStatistics
  extends Document {
  backgroundImage: string;

  statisticOneValue: string;
  statisticOneTitle: string;

  statisticTwoValue: string;
  statisticTwoTitle: string;

  statisticThreeValue: string;
  statisticThreeTitle: string;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const StatisticsSchema =
  new Schema<IStatistics>(
    {
      // =========================================
      // BACKGROUND IMAGE
      // =========================================

      backgroundImage: {
        type: String,
        required: true,
        trim: true,
      },

      // =========================================
      // STATISTIC ONE
      // =========================================

      statisticOneValue: {
        type: String,
        required: true,
        trim: true,
      },

      statisticOneTitle: {
        type: String,
        required: true,
        trim: true,
      },

      // =========================================
      // STATISTIC TWO
      // =========================================

      statisticTwoValue: {
        type: String,
        required: true,
        trim: true,
      },

      statisticTwoTitle: {
        type: String,
        required: true,
        trim: true,
      },

      // =========================================
      // STATISTIC THREE
      // =========================================

      statisticThreeValue: {
        type: String,
        required: true,
        trim: true,
      },

      statisticThreeTitle: {
        type: String,
        required: true,
        trim: true,
      },

      // =========================================
      // ACTIVE STATUS
      // =========================================

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const StatisticsModel =
  (mongoose.models
    .Statistics as Model<IStatistics>) ||
  mongoose.model<IStatistics>(
    "Statistics",
    StatisticsSchema
  );
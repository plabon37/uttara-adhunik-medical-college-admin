import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface INewsletterSubscriber
  extends Document {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSubscriberSchema =
  new Schema<INewsletterSubscriber>(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },
    },
    {
      timestamps: true,
    }
  );

const NewsletterSubscriber: Model<INewsletterSubscriber> =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model<INewsletterSubscriber>(
    "NewsletterSubscriber",
    NewsletterSubscriberSchema
  );

export default NewsletterSubscriber;
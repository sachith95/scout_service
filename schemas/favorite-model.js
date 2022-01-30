import mongoose from "mongoose";

const { Schema } = mongoose;
// restaurant favorite collection by user
const favorite = new Schema(
  {
    name: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    restaurantId: {
      type: [Schema.Types.ObjectId],
      ref: "RestaurantModel",
      required: false,
      
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    collection: "favorite",
  }
);

module.exports = mongoose.model("FavoriteModel", favorite);

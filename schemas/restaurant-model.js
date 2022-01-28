import mongoose from 'mongoose'

const { Schema } = mongoose

const restaurant = new Schema(
  {
    name: { type: String, required: true },
    opening_hours: { type: String },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, collection: 'restaurant' }
)

module.exports = mongoose.model('RestaurantModel', restaurant)
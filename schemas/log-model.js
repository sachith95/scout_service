import mongoose from 'mongoose'

const { Schema } = mongoose

const LogModel = new Schema(
  {
    action: { type: String, required: true },
    category: { type: String, required: true },
    createdBy: { type: String, required: true },
    message: { type: String, required: true },
    diff: { type: Schema.Types.Mixed }
  },
  { timestamps: { createdAt: 'createdAt' }, collection: 'log' }
)

module.exports = mongoose.model('LogModel', LogModel)
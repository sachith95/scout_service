import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import to from 'await-to-js'

const { Schema } = mongoose

const UserModel = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Include your name']
    },
    email: {
      type: String,
      required: [true, 'Please Include your email']
    },
    password: {
      type: String,
      required: [true, 'Please Include your password']
    },
    token: {
      type: String
    },
    status: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, collection: 'user' }
)

// this method will hash the password before saving the user model
UserModel.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

// this method generates an auth token for the user
UserModel.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY)
  user.token = token
  await user.save()
  return token
}

// this method search for a user by email and password.
UserModel.statics.findByCredentials = async (email, password) => {
  // eslint-disable-next-line no-use-before-define
  const [error, user] = await to(User.findOne({ email, status: true }))
  if (error || user === null) {
    throw new Error('Invalid login details')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Invalid login details')
  }
  return user
}



// this method use to reset password
UserModel.statics.resetPassword = async (email, password) => {
  // eslint-disable-next-line no-use-before-define
  const [error, user] = await to(User.findOne({ email }))
  if (error) {
    throw new Error('Invalid Email')
  }
  const newPassword = await bcrypt.hash(password, 8)
  const [updateError, updatedUser] = await to(User.findByIdAndUpdate(user._id, { password: newPassword }))
  if (updateError) {
    throw new Error('Password reset failed.Please contact admin')
  }
  return updatedUser
}


const User = mongoose.model('UserModel', UserModel)
module.exports = User
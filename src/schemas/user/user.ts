import { type Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
  userName: string
  email: string
  password: string
  userPhoto: string
  followers?: number
  verified?: boolean
}

export const schema = new Schema<IUser>(
  {
    userName: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      unique: true,
      required: true
    },
    userPhoto: {
      type: String,
      required: true
    },
    followers: {
      type: Number,
      required: false,
      default: 0
    },
    verified: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: true
  }
)

schema.index({ userName: 1, email: 1 })

const UserSchema = model<IUser>('users', schema)

export { UserSchema }

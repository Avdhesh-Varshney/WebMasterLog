import crypto from 'crypto'
import mongoose, { Schema, model } from 'mongoose'

export interface IUrl {
  url: string
  slug: string
  visitors: number
  created_at: number
}

const UrlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    default: () => crypto.randomBytes(5).toString('hex')
  },
  visitors: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Url || model<IUrl>('Url', UrlSchema)
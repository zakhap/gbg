import mongoose from 'mongoose'

export interface IGame {
  _id?: string
  pseudonym: string
  title: string
  trajectory: string
  conceptCommentary: string
  commentary: string
  createdAt: Date
}

const GameSchema = new mongoose.Schema<IGame>({
  pseudonym: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  trajectory: {
    type: String,
    required: true,
    maxlength: 5000
  },
  conceptCommentary: {
    type: String,
    required: true,
    maxlength: 3000
  },
  commentary: {
    type: String,
    required: true,
    maxlength: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema)

import mongoose from 'mongoose'
// const ObjectId = mongoose.Schema.Types.ObjectId

const schema = {
  name: String,
  filepath: { type: String, required: true },
  author: { type: String, required: true },
  type: { type: String, enum: ['dot', 'contour', 'mask'], required: true },
}

const Annotation = mongoose.model('Annotation', new mongoose.Schema(schema, { timestamps: true }))

export default Annotation

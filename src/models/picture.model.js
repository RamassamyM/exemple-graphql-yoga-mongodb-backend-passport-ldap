import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = {
  name: String,
  filepath: { type: String, required: true },
  captureTimestamp: { type: String, required: true },
  captureSource: { type: String, enum: ['microscope', 'camera'], required: true },
  captureZoom: { type: Number, min: 1 },
  scale: Number,
  experienceCode: String,
  author: { type: String, required: true },
  pictureObjects: [{ type: ObjectId, ref: 'PictureObject', index: true }],
  metadata: {
    type: Map,
    of: String,
  },
  tags: [{ type: String, index: true }],
  extension: { type: String, enum: ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'tif', 'tiff'] },
  description: String,
  annotations: [{ type: ObjectId, ref: 'Annotation' }],
}
const PictureSchema = new mongoose.Schema(schema, { timestamps: true })
PictureSchema.index({ annotations: 1 })

const Picture = mongoose.model('Picture', PictureSchema)

export default Picture

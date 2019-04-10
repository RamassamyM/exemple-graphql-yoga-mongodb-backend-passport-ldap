import mongoose from 'mongoose'
// const ObjectId = mongoose.Schema.Types.ObjectId
// import Picture from '../../models/picture.model'

const schema = {
  name: { type: String, unique: true },
  type: { type: String, enum: ['cell', 'biomaterial', 'spheroid'] },
  metadata: {
    type: Map,
    of: String,
  },
}
const PictureObjectSchema = new mongoose.Schema(schema, { timestamps: true })
// PictureObjectSchema.pre('remove', function (next) {
//   Picture.updateMany({ pictureObjects: this._id }, { $pullAll: { pictureObjects: this._id } })
//   next()
// })
const PictureObject = mongoose.model('PictureObject', PictureObjectSchema)

export default PictureObject

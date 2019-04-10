import PictureObject from '../../models/pictureObject.model'
import Picture from '../../models/picture.model'

export default {
  Query: {
    getPictureObjects: async (root, context) => PictureObject.find({}),
    getPictureObject: async (root, args, context) => PictureObject.findOne({ _id: args._id }),
  },
  PictureObject: {
    pictures (root, args, context) {
      return Picture.find({ pictureObjects: root._id })
    },
  },
  Mutation: {
    createPictureObject: async (root, args, context) => {
      try {
        console.log(args)
        const pictureObjectWithSameName = await PictureObject.findOne({ name: args.name })
        if (pictureObjectWithSameName) {
          console.log(`A connexion ask to create a pictureObject with name already used : ${args.name}`)
          throw new Error('Error while trying to create a pictureObject already referenced')
        }
        return PictureObject.create(args)
      } catch (err) {
        throw err
      }
    },
    editPictureObject: async (root, args, context) => {
      try {
        const query = { _id: args._id }
        const options = { new: true, runValidators: true }
        await delete args.__id
        return PictureObject.findOneAndUpdate(query, args, options)
      } catch (err) {
        console.log(err)
        throw new Error('Error while trying to edit PictureObject')
      }
    },
    deletePictureObject: async (root, args, context) => {
      try {
        const pictureObject = await PictureObject.findById(args)
        await Picture.updateMany({ pictureObjects: pictureObject._id }, { $pull: { pictureObjects: pictureObject._id } })
        const deletedPictureObject = await pictureObject.remove()
        console.log(deletedPictureObject)
        if (!deletedPictureObject) {
          throw new Error('Error while deleting')
        }
        return deletedPictureObject
      } catch (err) {
        throw err
      }
    },
  },
}

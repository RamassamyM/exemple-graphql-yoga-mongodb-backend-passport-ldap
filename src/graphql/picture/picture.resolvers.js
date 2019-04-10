import Picture from '../../models/picture.model'
import PictureObject from '../../models/pictureObject.model'

export default {
  Query: {
    getPictures: async (root, context) => Picture.find({}).populate('pictureObjects').populate('annotations'),
    getPicture: async (root, args, context) => Picture.findOne({ _id: args._id }).populate('pictureObjects').populate('annotations'),
  },
  Picture: {
  },
  Mutation: {
    createPicture: async (root, args, context) => {
      try {
        const pictureWithSameFilepath = await Picture.findOne({ filepath: args.input.filepath })
        if (pictureWithSameFilepath) {
          console.log(`A connexion ask to create a picture with filepath already used : ${args.input.filepath}`)
          throw new Error('Error while trying to create a pitcure already referenced')
        }
        let pictureObjects = []
        const pictureObjectNames = args.input.pictureObjectNames
        let i
        for (i in pictureObjectNames) {
          let pictureObject = await PictureObject.findOne({ name: pictureObjectNames[i] }, '_id')
          if (pictureObject) {
            pictureObjects.push(pictureObject)
          } else {
            console.log(`Error: could not link to object ${pictureObjectNames[i]} that does not exist`)
          }
        }
        args.input.pictureObjects = pictureObjects
        return Picture.create(args.input)
      } catch (err) {
        throw err
      }
    },
    editPicture: async (root, args, context) => {
      try {
        const query = { _id: args.input._id }
        const options = { new: true, runValidators: true }
        await delete args.input.__id
        const pictureObjectNames = args.input.pictureObjectNames
        let pictureObjects = []
        for (let i = 0, len = pictureObjectNames.length; i < len; i++) {
          let { _id } = await PictureObject.findOne({ name: pictureObjectNames[i] }, '_id')
          if (_id) {
            await pictureObjects.push(_id)
            console.log(pictureObjects)
          } else {
            console.log(`Error: could not link to object ${pictureObjectNames[i]} that does not exist`)
          }
        }
        args.input.pictureObjects = pictureObjects
        return Picture.findOneAndUpdate(query, args.input, options)
      } catch (err) {
        console.log(err)
        throw new Error('Error while trying to edit Picture')
      }
    },
    deletePicture: async (root, args, context) => {
      const picture = await Picture.findByIdAndRemove(args)
      if (!picture) {
        throw new Error('Error while deleting')
      }
      return picture
    },
  },
}

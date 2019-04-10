import Annotation from '../../models/annotation.model'
import Picture from '../../models/picture.model'

export default {
  Query: {
    getAnnotations: async (root, context) => Annotation.find({}),
    getAnnotation: async (root, args, context) => Annotation.findOne({ _id: args._id }),
  },
  Annotation: {
    pictures (root, args, context) {
      return Picture.find({ annotations: root._id })
    },
  },
  Mutation: {
    createAnnotation: async (root, args, context) => {
      try {
        const annotationWithSameFilepath = await Annotation.findOne({ filepath: args.input.filepath })
        if (annotationWithSameFilepath) {
          console.log(`A connexion ask to create a annotation with filepath already used : ${args.input.filepath}`)
          throw new Error('Error while trying to create a annotation already referenced')
        }
        const annotation = await Annotation.create(args.input)
        if (!annotation) {
          throw new Error('Could not create new annotation')
        }
        const result = await Picture.updateMany({ _id: { $in: args.input.pictureIds } }, { $push: { annotations: annotation._id } })
        console.log(result)
        return annotation
      } catch (err) {
        throw err
      }
    },
    editAnnotation: async (root, args, context) => {
      try {
        const options = { new: true, runValidators: true }
        const query = { _id: args._id }
        await delete args.__id
        return Annotation.findOneAndUpdate(query, args, options)
      } catch (err) {
        console.log(err)
        throw new Error('Error while trying to edit Annotation')
      }
    },
    deleteAnnotation: async (root, args, context) => {
      try {
        const annotation = await Annotation.findById(args)
        await Picture.updateMany({ annotations: annotation._id }, { $pull: { annotations: annotation._id } })
        const deletedAnnotation = await annotation.remove()
        console.log(deletedAnnotation)
        if (!deletedAnnotation) {
          throw new Error('Error while deleting')
        }
        return deletedAnnotation
      } catch (err) {
        throw err
      }
    },
  },
}

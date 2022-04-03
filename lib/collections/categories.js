import SimpleSchema from 'simpl-schema';

CategoriesSchema = new SimpleSchema({
  title: String,
  description: {
    type: String,
    optional: true
  },
  slugUrl: {
    type: String,
    //TODO "unique" is not a supported property 
    //unique: true
  },
  isImportant: Boolean,
  metaContent: {
    type: MetaContentSchema,
    optional: true
  }
});
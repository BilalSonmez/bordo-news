import SimpleSchema from 'simpl-schema';

Categories = new Mongo.Collection('categories');

CategorySchema = new SimpleSchema({
  title: String,
  description: {
    type: String,
    optional: true
  },
  slugUrl: {
    type: String,
    //TODO: "unique" is not a supported property 
    //unique: true
  },
  metaContent: {
    type: MetaContentSchema,
    optional: true
  }
});

Categories.attachSchema(CategorySchema);
Categories.softRemovable();
Categories.autoDates();
Categories.lastEditUser();
Categories.createdUser();
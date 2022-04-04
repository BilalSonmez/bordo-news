import SimpleSchema from 'simpl-schema';

News = new Mongo.Collection('news');

NewSchema = new SimpleSchema({
  title: String,
  subTitle: {
    type: String,
    optional: true
  },
  content: String,
  slugUrl: {
    type: String,
    unique: true
  },
  featuredImage: SimpleSchema.RegEx.Id,
  categories: {
    type: Array
  },
  "categories.$": SimpleSchema.RegEx.Id,
  communityData: CommunitySchema,
  isImportant: Boolean,
  metaContent: {
    type: MetaContentSchema,
    optional: true
  }
});

News.attachSchema(NewSchema);
News.softRemovable();
News.autoDates();
News.lastEditUser();
News.createdUser();
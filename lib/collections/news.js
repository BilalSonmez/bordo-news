import SimpleSchema from 'simpl-schema';

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
  metaContent: {
    type: MetaContentSchema,
    optional: true
  }
});
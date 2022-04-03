import SimpleSchema from 'simpl-schema';

MetaContentSchema = new SimpleSchema({
  metaTitle: {
    type: String,
    optional: true
  },
  metaDescription: {
    type: String,
    optional: true
  },
  noIndex: {
    type: Boolean,
    optional: true
  },
  noFollow: {
    type: Boolean,
    optional: true
  },
});
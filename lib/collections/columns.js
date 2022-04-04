import SimpleSchema from 'simpl-schema';

Columns = new Mongo.Collection('columns');

ColumnSchema = new SimpleSchema({
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
  communityData: CommunitySchema,
  metaContent: {
    type: MetaContentSchema,
    optional: true
  }
});

Columns.attachSchema(ColumnSchema);
Columns.softRemovable();
Columns.autoDates();
Columns.lastEditUser();
Columns.createdUser();
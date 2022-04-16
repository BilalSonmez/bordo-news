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
  featuredImage: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
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
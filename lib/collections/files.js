import SimpleSchema from 'simpl-schema';

Files = new Mongo.Collection('files');

FileSchema = new SimpleSchema({
  name: String,
  path: String,
  type: String,
});

Files.attachSchema(FileSchema);
Files.softRemovable();
Files.autoDates();
Files.lastEditUser();
Files.createdUser();
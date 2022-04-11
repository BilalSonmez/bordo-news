import SimpleSchema from 'simpl-schema';

Files = new Mongo.Collection('files');

FileSchema = new SimpleSchema({
  name: String,
  url: String,
  extension: String,
  type: String,
});

Files.attachSchema(FileSchema);
Files.softRemovable();
Files.autoDates();
Files.lastEditUser();
Files.createdUser();
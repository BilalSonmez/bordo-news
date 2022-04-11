import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'file.create',
  validate: new SimpleSchema({
    file: FileSchema
  }).validator(),
  run: function(data){
    this.unblock();
    const { file } = data
    const id = Files.insert(file);
    return Files.findOne({ _id: id});
  }
});
import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'file.delete',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    Files.remove({ _id: _id });
  }
});

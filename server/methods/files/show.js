import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'file.show',
  validate: new SimpleSchema({
    name: String,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { name } = data;

    return Files.findOne({
      name: name
    });
  }
});



import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'column.show.url',
  validate: new SimpleSchema({
    slugUrl: String,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { slugUrl } = data;
    const column = Columns.findOne({
      slugUrl: slugUrl
    });
    column.featuredImage = Files.findOne({
      _id: column.featuredImage
    });
    const writer = Meteor.users.findOne({
      _id:column.createdUserId,
    });
    column.writer={
      name:writer.profile.name,
      lastName:writer.profile.lastName,
      picture:writer.profile.picture.url,
    }

    return column;
  }
});



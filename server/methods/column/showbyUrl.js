import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'column.show.url',
  validate: new SimpleSchema({
    slugUrl: String,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { slugUrl } = data;
    const column = await Columns.findOne({
      slugUrl: slugUrl
    });
    column.featuredImage = await Files.findOne({
      _id: column.featuredImage
    });
    const writer = await Meteor.users.findOne({
      _id:column.createdUserId,
    });
    column.writer={
      name:writer.profile.name,
      lastName:writer.profile.lastName,
      picture:writer.profile.picture.url,
    }

    Columns.update({slugUrl: slugUrl}, {$set:{
      "communityData.views": column.communityData.views + 1,
    }});

    return column;
  }
});



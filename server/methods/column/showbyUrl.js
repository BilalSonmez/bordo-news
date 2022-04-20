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
      _id:writer._id,
      name:writer.profile.name,
      lastName:writer.profile.lastName,
      picture:writer.profile.picture.url,
    }

    Columns.update({slugUrl: slugUrl}, {$set:{
      "communityData.views": column.communityData.views + 1,
    }});
    let totalLike=0;
    let totalDislike=0;
    column.communityData.like.forEach((like)=>{
      if(like.status){
        totalLike++;
      }else{
        totalDislike++;
      }
    })
    column.totalLike=totalLike;
    column.totalDislike=totalDislike;

    return column;
  }
});



Template.publicPagesAbout.events({
  "click .pictureChance": function (event, template) {
    event.preventDefault();
    console.log("hello world");
    const obj = {
      picture: {
        name:"test2",
        url:"https://www.tarimtv.gov.tr/uploads/video/esme-koyunu-yeni1-3dzJutsCYH/resize-adaptive-quadrant/300/esme-koyunu-yeni1-3dzJutsCYH.jpg",
      },
    };
    Meteor.call("user.picture.update", obj, function (error, success) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(success);

    });
  },
});
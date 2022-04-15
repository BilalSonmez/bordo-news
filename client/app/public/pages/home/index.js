Template.publicPagesHome.onCreated(function () {
  this.state = new ReactiveDict(null, {
    breakingNews: [],
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 5,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'name',
    sortOrder: 'asc'
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.publicPagesHome.onRendered(function () {
  const self = this;

  const listOptions = {
    options: {
      filtering: {  isImportant: { $eq: true }  },
      sorting: {
        sortField: 'createdAt',
        sortOrder: 'desc',
      }
    }
  };
  this.autorun(function () {
    Meteor.call("news.list",listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.state.set("breakingNews", result.news);
    })
  });
});


Template.publicPagesHome.events({
  'mouseenter .btnCarousel': function (event, template) {
    $(event.target).click();
  },
  "click .btnMore": function (event, template) {
    let moretext = document.getElementById("more");
    if (moretext.style.display == "none" ) {
      moretext.style.display = "inline";
      //moretext.value ="Daha Az Göster";
    }else{
      moretext.style.display = "none";
      //moretext.value ="Daha Fazla Göster";
    }
  },

});
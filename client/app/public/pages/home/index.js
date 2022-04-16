Template.publicPagesHome.onCreated(function () {
  this.state = new ReactiveDict(null, {
    breakingNews: [],
    news: [],
  });

  this.newsPagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 6,
    totalCount: 0,
    totalPages: 0
  });

});

Template.publicPagesHome.onRendered(function () {
  const self = this;
  this.autorun(function () {
    const listOptions = {
      options: {
        pagination: {
          currentPage: self.newsPagination.get("currentPage"),
          pageItems: self.newsPagination.get("pageItems"),
        },
        filtering: {},
        sorting: {
          sortField: 'createdAt',
          sortOrder: 'desc',
        }
      }
    };

    Meteor.call("news.list",listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.newsPagination.set("totalCount", result.options.pagination.totalCount);
      self.newsPagination.set("totalPages", Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems));
      console.log(self.newsPagination);
      self.state.set("news", self.state.get('news').concat(result.news));
    })
  });
  
  this.autorun(function () {
    const listOptions = {
      options: {
        filtering: {  isImportant: { $eq: true }  },
        sorting: {
          sortField: 'createdAt',
          sortOrder: 'desc',
        }
      }
    };
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
  'click .btnNewsMore': function (event, template) {
    template.newsPagination.set("currentPage",template.newsPagination.get("currentPage")+1);
    if (template.newsPagination.get("currentPage")>=template.newsPagination.get("totalPages")) {
      $(event.target).hide();
    }
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
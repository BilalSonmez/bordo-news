
Template.publicPagesAllNews.onCreated(function () {
  this.state = new ReactiveDict(null, {
    news: [],
    categories: [],
  });
  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 8,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'asc'
  });

  this.filtering = new ReactiveDict(null, {});
});
Template.publicPagesAllNews.onRendered(function () {
  const self = this;

  $(window).on('scroll', (event) => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      if (!(self.pagination.get("currentPage") >= self.pagination.get("totalPages"))) {
        self.pagination.set("currentPage", self.pagination.get("currentPage") + 1);
      }
    }

  })
  
  this.autorun(function () {
    Meteor.call("category.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.state.set("categories",result.categories) ;
    })
  });

  this.autorun(function () {
   
    const listOptions = {
      options: {
        pagination: {
          currentPage: self.pagination.get("currentPage"),
          pageItems: self.pagination.get("pageItems"),
        },
        filtering: {},
        sorting: {
          sortField: self.sorting.get("sortField"),
          sortOrder: self.sorting.get("sortOrder"),
        }
      }
    };
    Meteor.call("news.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.pagination.set("totalCount", result.options.pagination.totalCount);
      const pages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);
      self.pagination.set("totalPages", pages);
      self.state.set("news", self.state.get('news').concat(result.news));
    })
  });


});

Template.publicPagesAllNews.events({


  'click .btnNewsMore': function (event, template) {
    template.pagination.set("currentPage", template.pagination.get("currentPage") + 1);
    if (template.pagination.get("currentPage") >= template.pagination.get("totalPages")) {
      $(event.target).hide();
    }
  },
  'click .btnCategoryMore': function (event, template) {
    let moretext = document.getElementsByClassName("moreCategoriesSpan");;
    for (let data of moretext) {
      data.classList.remove('d-none');
    }
    $(event.target).hide();
  },
});
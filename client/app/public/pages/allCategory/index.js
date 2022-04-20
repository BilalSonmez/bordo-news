Template.publicPagesAllCategory.events({


  'click .btnNewsMore': function (event, template) {
    template.newsPagination.set("currentPage", template.newsPagination.get("currentPage") + 1);
    if (template.newsPagination.get("currentPage") >= template.newsPagination.get("totalPages")) {
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
Template.publicPagesAllCategory.onCreated(function () {
  this.state = new ReactiveDict(null, {
  
    news: [],
    categories: [],
  });
  this.categoryPagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 5,
    totalCount: 0,
    totalPages: 0
  });
  this.categorysorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'asc'
  });

  this.categoryfiltering = new ReactiveDict(null, {});
  this.newsPagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 8,
    totalCount: 0,
    totalPages: 0
  });

  this.newssorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'asc'
  });

  this.newsfiltering = new ReactiveDict(null, {});
});
Template.publicPagesAllCategory.onRendered(function () {
  const self = this;
  this.autorun(function () {
    AppUtil.refreshTokens.get("category");
    const listOptions = {
      options: {
        pagination: {
          currentPage: self.categoryPagination.get("currentPage"),
          pageItems: self.categoryPagination.get("pageItems"),
        },
        filtering: {},
        sorting: {
          sortField: self.categorysorting.get("sortField"),
          sortOrder: self.categorysorting.get("sortOrder"),
        }
      }
    };

    Meteor.call("category.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.categoryPagination.set("totalCount", result.options.pagination.totalCount);
      const pages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);
      self.categoryPagination.set("totalPages", pages);
      self.state.set("categories", self.state.get('categories').concat(result.categories));
    })
  });

  this.autorun(function () {
   
    const listOptions = {
      options: {
        pagination: {
          currentPage: self.newsPagination.get("currentPage"),
          pageItems: self.newsPagination.get("pageItems"),
        },
        filtering: {},
        sorting: {
          sortField: self.newssorting.get("sortField"),
          sortOrder: self.newssorting.get("sortOrder"),
        }
      }
    };
    Meteor.call("news.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.newsPagination.set("totalCount", result.options.pagination.totalCount);
      const pages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);
      self.newsPagination.set("totalPages", pages);
      self.state.set("news", self.state.get('news').concat(result.news));
    })
  });


});
Template.publicPagesAllColumns.onCreated(function () {
  this.state = new ReactiveDict(null, {
    columns: [],
    columnists: [],
  });
  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 6,
    totalCount: 0,
    totalPages: 0
  });
  this.sorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'asc'
  });

  this.filtering = new ReactiveDict(null, {});

});
Template.publicPagesAllColumns.onRendered(function () {
  const self = this;
  $(window).on('scroll', (event) => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      if (!(self.pagination.get("currentPage") >= self.pagination.get("totalPages"))) {
        self.pagination.set("currentPage", self.pagination.get("currentPage") + 1);
      }
    }

  })
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

    Meteor.call("column.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.pagination.set("totalCount", result.options.pagination.totalCount);
      const pages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);
      self.pagination.set("totalPages", pages);
      self.state.set("columns", self.state.get('columns').concat(result.columns));
    })
  });
  this.autorun(function () {

    Meteor.call("columnist.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("columnists",result);
    })
  });

});
Template.publicPagesAllColumns.events({
  'click .btnColumnsMore': function (event, template) {
    template.pagination.set("currentPage", template.pagination.get("currentPage") + 1);
    if (template.pagination.get("currentPage") >= template.pagination.get("totalPages")) {
      $(event.target).hide();
    }
  },
  "click .btnMoreColumns": function (event, template) {
    let moretext = document.getElementsByClassName("moreColumnsSpan");;
    for (let data of moretext) {
      data.classList.remove('d-none');
    }
    $(event.target).hide();
  },
});
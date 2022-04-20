Template.publicPagesAllColumns.events({


  'click .btnColumnsMore': function (event, template) {
    template.columnsPagination.set("currentPage", template.columnsPagination.get("currentPage") + 1);
    if (template.columnsPagination.get("currentPage") >= template.columnsPagination.get("totalPages")) {
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
Template.publicPagesAllColumns.onCreated(function () {
  this.state = new ReactiveDict(null, {
  
    columns: [],
    columnwriter: [],
  });
  this.columnsPagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 6,
    totalCount: 0,
    totalPages: 0
  });
  this.columnssorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'asc'
  });

  this.columnsfiltering = new ReactiveDict(null, {});
 
  

});
Template.publicPagesAllColumns.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("columns");
    const listOptions = {
      options: {
        pagination: {
          currentPage: self.columnsPagination.get("currentPage"),
          pageItems: self.columnsPagination.get("pageItems"),
        },
        filtering: {},
        sorting: {
          sortField: self.columnssorting.get("sortField"),
          sortOrder: self.columnssorting.get("sortOrder"),
        }
      }
    };

    Meteor.call("column.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
     
      self.columnsPagination.set("totalCount", result.options.pagination.totalCount);
      const pages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);
      self.columnsPagination.set("totalPages", pages);
      self.state.set("columns", self.state.get('columns').concat(result.columns));
    })
  });

  this.autorun(function () {
    Meteor.call("column.show.url", {
      slugUrl: slugUrl
    }, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("columnwriter", result);
      console.log('',result);
    });
  });

});
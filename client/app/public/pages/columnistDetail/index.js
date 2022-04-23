import { FlowRouter } from "meteor/ostrio:flow-router-extra";
Template.publicPagesColumnistDetail.onCreated(function () {
  this.state = new ReactiveDict(null, {
    columns: [],
    columnist: {},
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 6,
    totalCount: 0,
    totalPages: 0,
  });

  this.sorting = new ReactiveDict(null, {
    sortField: "createdAt",
    sortOrder: "desc",
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.publicPagesColumnistDetail.onRendered(function () {
  const self = this;
  const _userName = FlowRouter.getParam("_userName");
  let _id = null;
  $(window).scrollTop(0);

  $(window).on("scroll", (event) => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      if (!(self.pagination.get("currentPage") >= self.pagination.get("totalPages"))) {
        self.pagination.set("currentPage", self.pagination.get("currentPage") + 1);
      }
    }
  });

  this.autorun(function () {
    Meteor.call("columnist.show", { userName: _userName }, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.state.set("columnist", result);
      _id = result._id;
      self.state.set("columns", []);
    });
  });

  this.autorun(function () {
    self.state.get("columnist");
    const currentPage = self.pagination.get("currentPage");
    const pageItems = self.pagination.get("pageItems");
    const sorting = self.sorting.all();

    const listOptions = {
      options: {
        pagination: {
          currentPage: currentPage,
          pageItems: pageItems,
        },
        filtering: {
          createdUserId: _id,
        },
        sorting: sorting,
      },
    };
    Meteor.call("column.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.pagination.set("totalCount", result.options.pagination.totalCount);
      const pages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);
      self.pagination.set("totalPages", pages);
      self.state.set("columns", self.state.get("columns").concat(result.columns));
    });
  });
});
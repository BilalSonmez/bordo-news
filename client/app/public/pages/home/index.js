import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import bootstrap from "bootstrap";
Template.publicPagesHome.onCreated(function () {
  this.state = new ReactiveDict(null, {
    breakingNews: [],
    news: [],
    columns: [],
    topNews: [],
    topColumns: [],
  });
  
  this.newsPagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 6,
    totalCount: 0,
    totalPages: 0,
  });

  this.columnsPagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 4,
    totalCount: 0,
    totalPages: 0,
  });
});

Template.publicPagesHome.onRendered(function () {
  const self = this;
  $(window).scrollTop(0);

  const user = Meteor.user();

  if (user) {
    console.log(user);
  }

  if (!user) {
    return;
  }
  console.log(user);

  this.autorun(function () {
    const listOptions = {
      options: {
        pagination: {
          currentPage: self.newsPagination.get("currentPage"),
          pageItems: self.newsPagination.get("pageItems"),
        },
        filtering: {},
        sorting: {
          sortField: "createdAt",
          sortOrder: "desc",
        },
      },
    };

    Meteor.call("news.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.newsPagination.set("totalCount", result.options.pagination.totalCount);
      self.newsPagination.set("totalPages", Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems));
      self.state.set("news", self.state.get("news").concat(result.news));
    });
  });

  this.autorun(function () {
    const listOptions = {
      options: {
        pagination: {
          currentPage: 1,
          pageItems: 10,
        },
        filtering: {},
        sorting: {
          sortField: "communityData.views",
          sortOrder: "desc",
        },
      },
    };

    Meteor.call("news.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("topNews", result.news);
    });
  });

  this.autorun(function () {
    const listOptions = {
      options: {
        pagination: {
          currentPage: 1,
          pageItems: 10,
        },
        filtering: {},
        sorting: {
          sortField: "communityData.views",
          sortOrder: "desc",
        },
      },
    };

    Meteor.call("column.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("topColumns", result.columns);
    });
  });

  this.autorun(function () {
    const listOptions = {
      options: {
        pagination: {
          currentPage: self.columnsPagination.get("currentPage"),
          pageItems: self.columnsPagination.get("pageItems"),
        },
        filtering: {},
        sorting: {
          sortField: "createdAt",
          sortOrder: "desc",
        },
      },
    };

    Meteor.call("column.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.columnsPagination.set("totalCount", result.options.pagination.totalCount);
      self.columnsPagination.set("totalPages", Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems));
      self.state.set("columns", self.state.get("columns").concat(result.columns));
    });
  });

  this.autorun(function () {
    const listOptions = {
      options: {
        filtering: {
          isImportant: {
            $eq: true,
          },
        },
        sorting: {
          sortField: "createdAt",
          sortOrder: "desc",
        },
      },
    };
    Meteor.call("news.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("breakingNews", result.news);
    });
  });
});

Template.publicPagesHome.events({
  "mouseenter .btnCarousel": function (event, template) {
    $("#carouselExampleControls").carousel(parseInt(event.currentTarget.dataset.bsTargetSlide));
  },
  "click .btnCarousel": function (event, template) {
    FlowRouter.go("public.news", {
      slugUrl: this.slugUrl,
    });
  },
  "click .btnNewsMore": function (event, template) {
    template.newsPagination.set("currentPage", template.newsPagination.get("currentPage") + 1);
    if (template.newsPagination.get("currentPage") >= template.newsPagination.get("totalPages")) {
      $(event.target).hide();
    }
  },
  "click .btnColumnsMore": function (event, template) {
    template.columnsPagination.set("currentPage", template.columnsPagination.get("currentPage") + 1);
    if (template.columnsPagination.get("currentPage") >= template.columnsPagination.get("totalPages")) {
      $(event.target).hide();
    }
  },
  "click .btnMoreNews": function (event, template) {
    let moretext = document.getElementsByClassName("moreNewsSpan");
    for (let data of moretext) {
      data.classList.remove("d-none");
    }
    $(event.target).hide();
  },
  "click .btnMoreColumns": function (event, template) {
    let moretext = document.getElementsByClassName("moreColumnsSpan");
    for (let data of moretext) {
      data.classList.remove("d-none");
    }
    $(event.target).hide();
  },
});

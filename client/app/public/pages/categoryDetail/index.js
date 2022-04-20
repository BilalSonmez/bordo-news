import {
  FlowRouter
} from 'meteor/ostrio:flow-router-extra';
Template.publicPagesCategoryDetail.onCreated(function () {
  this.state = new ReactiveDict(null, {
    category: {},
    news: [],
    topNews:[],
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 4,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'asc'
  });

  this.filtering = new ReactiveDict(null, {
    categories: {}
  });
});

Template.publicPagesCategoryDetail.onRendered(function () {
  const self = this;
  const slugUrl = FlowRouter.getParam("slugUrl");


  $(window).on('scroll', (event) => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      if (!(self.pagination.get("currentPage") >= self.pagination.get("totalPages"))) {
        self.pagination.set("currentPage", self.pagination.get("currentPage") + 1);
      }
    }

  })

  this.autorun(function () {
    Meteor.call("category.show.url", {
      slugUrl: slugUrl
    }, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      document.getElementById("categoryDetailContent").innerHTML = result.description;
      self.state.set("category", result);
      self.filtering.set("categories", {
        $in: [result._id],
      })
      console.log(result);
    });
  });
  this.autorun(function () {
    const currentPage = self.pagination.get('currentPage');
    const pageItems = self.pagination.get('pageItems');
    const filtering = self.filtering.all();
    const sorting = self.sorting.all();

    const listOptions = {
      options: {
        pagination: {
          currentPage: currentPage,
          pageItems: pageItems
        },
        filtering: filtering,
        sorting: sorting
      }
    };

    Meteor.call("news.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.pagination.set("totalCount", result.options.pagination.totalCount);
      const pages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);
      self.pagination.set("totalPages", pages);
      self.state.set("news", self.state.get('news').concat(result.news));

    })
  });
  this.autorun(function () {
    const listOptions = {
      options: {
        pagination: {
          currentPage: 1,
          pageItems: 10,
        },
        filtering: self.filtering.all(),
        sorting: {
          sortField: 'communityData.views',
          sortOrder: 'desc',
        }
      }
    };

    Meteor.call("news.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("topNews", result.news);
    })
  });
});

Template.publicPagesCategoryDetail.events({
  "click .btnMoreNews": function (event, template) {
    let moretext = document.getElementsByClassName("moreNewsSpan");;
    for (let data of moretext) {
      data.classList.remove('d-none');
    }
    $(event.target).hide();
  },
});
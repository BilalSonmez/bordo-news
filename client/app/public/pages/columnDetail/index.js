import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
Template.publicPagesColumnDetail.onCreated(function () {
  this.state = new ReactiveDict(null, {
  column:{},
  popNews:[],
  topColumns:[],
  });
});

Template.publicPagesColumnDetail.onRendered(function () {
  const self = this;
  const slugUrl = FlowRouter.getParam("slugUrl");
  this.autorun(function () {
    const listOptions = {
      options: {
        pagination: {
          currentPage: 1,
          pageItems: 10,
        },
        filtering: {},
        sorting: {
          sortField: 'communityData.views',
          sortOrder: 'desc',
        }
      }
    };

    Meteor.call("column.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("topColumns", result.columns);
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
      self.state.set("column", result);
      document.getElementById("columnDetailContent").innerHTML=result.content;
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
      self.state.set("popNews", result.news);
      
    })
  });
});

Template.publicPagesColumnDetail.events({
  "click .btnMoreNews": function (event, template) {
    let moretext = document.getElementsByClassName("moreNewsSpan");;
    for (let data of moretext) {
      data.classList.remove('d-none');
    }
    $(event.target).hide();
  },
  "click .btnMoreColumns": function (event, template) {
    let moretext = document.getElementsByClassName("moreColumnsSpan");;
    for (let data of moretext) {
      data.classList.remove('d-none');
    }
    $(event.target).hide();
  },
});
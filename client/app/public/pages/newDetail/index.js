import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
Template.publicPagesNewDetail.onCreated(function () {
  this.state = new ReactiveDict(null, {
  news:{},
  popNews:[],
  });
});

Template.publicPagesNewDetail.onRendered(function () {
  const self = this;
  const slugUrl = FlowRouter.getParam("slugUrl");
  
  this.autorun(function () {
    Meteor.call("news.show.url", {
      slugUrl: slugUrl
    }, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      document.getElementById("newsDetailContent").innerHTML=result.content;
      self.state.set("news", result);
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

Template.publicPagesNewDetail.events({
  "click .btnMoreNews": function (event, template) {
    let moretext = document.getElementsByClassName("moreNewsSpan");;
    for (let data of moretext) {
      data.classList.remove('d-none');
    }
    $(event.target).hide();
  },
});
import {
  FlowRouter
} from 'meteor/ostrio:flow-router-extra';
Template.publicPagesNewDetail.onCreated(function () {
  this.state = new ReactiveDict(null, {
    news: {},
    popNews: [],
    currentUserLike: Boolean,
  });
});

Template.publicPagesNewDetail.onRendered(function () {
  const self = this;
  const slugUrl = FlowRouter.getParam("slugUrl");
  $(window).scrollTop(0);
  this.autorun(function () {
    AppUtil.refreshTokens.get("newsDetail");
    self.state.set("currentUserLike", Boolean);
    Meteor.call("news.show.url", {
      slugUrl: slugUrl
    }, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      document.getElementById("newsDetailContent").innerHTML = result.content;
      self.state.set("news", result);
      console.log(result);
      result.communityData.like.forEach((data) => {
        if (data.userId === Meteor.userId()) {
          self.state.set("currentUserLike", data.status);
          return;
        }
      })
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
    let moretext = document.getElementsByClassName("moreNewsSpan");
    for (let data of moretext) {
      data.classList.remove('d-none');
    }
    $(event.target).hide();
  },
  "click .btnLike": function (event, template) {
    if (!Meteor.userId()) {
      ErrorHandler.show("Lütfen kullanıcı girişi yapınız.");
      return;
    }
    const likeStatus = template.state.get("currentUserLike");
    if (likeStatus === undefined) {
      const obj = {
        _id: template.state.get("news")._id,
        like: {
          status: true,
        }
      }
      Meteor.call("like.create.news", obj, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        AppUtil.refreshTokens.set("newsDetail", Random.id());
      });
    }else if(likeStatus === true){
      const obj = {
        _id: template.state.get("news")._id,
      }
      Meteor.call("like.delete.news", obj, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        AppUtil.refreshTokens.set("newsDetail", Random.id());
      });
    }else if(likeStatus === false){
      Meteor.call("like.delete.news",{_id: template.state.get("news")._id}, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        const obj = {
          _id: template.state.get("news")._id,
          like: {
            status: true,
          }
        }
        Meteor.call("like.create.news", obj, function (error, success) {
          if (error) {
            ErrorHandler.show(error.message);
            return;
          }
          AppUtil.refreshTokens.set("newsDetail", Random.id());
        });
      });
    }
    
  },
  "click .btnDislike": function (event, template) {
    if (!Meteor.userId()) {
      ErrorHandler.show("Lütfen kullanıcı girişi yapınız.");
      return;
    }
    const likeStatus = template.state.get("currentUserLike");
    if (likeStatus === undefined) {
      const obj = {
        _id: template.state.get("news")._id,
        like: {
          status: false,
        }
      }
      Meteor.call("like.create.news", obj, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        AppUtil.refreshTokens.set("newsDetail", Random.id());
      });
    }else if(likeStatus === false){
      const obj = {
        _id: template.state.get("news")._id,
      }
      Meteor.call("like.delete.news", obj, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        AppUtil.refreshTokens.set("newsDetail", Random.id());
      });
    }else if(likeStatus === true){
      Meteor.call("like.delete.news",{_id: template.state.get("news")._id}, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        const obj = {
          _id: template.state.get("news")._id,
          like: {
            status: false,
          }
        }
        Meteor.call("like.create.news", obj, function (error, success) {
          if (error) {
            ErrorHandler.show(error.message);
            return;
          }
          AppUtil.refreshTokens.set("newsDetail", Random.id());
        });
      });
    }
    
  },
});
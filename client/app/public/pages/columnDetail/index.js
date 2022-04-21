import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
Template.publicPagesColumnDetail.onCreated(function () {
  this.state = new ReactiveDict(null, {
  column:{},
  topColumns:[],
  currentUserLike: Boolean,
  });
});

Template.publicPagesColumnDetail.onRendered(function () {
  const self = this;
  const slugUrl = FlowRouter.getParam("slugUrl");
  $(window).scrollTop(0);
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
    AppUtil.refreshTokens.get("columnDetail");
    self.state.set("currentUserLike", Boolean);
    Meteor.call("column.show.url", {
      slugUrl: slugUrl
    }, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("column", result);
      document.getElementById("columnDetailContent").innerHTML=result.content;
      result.communityData.like.forEach((data) => {
        if (data.userId === Meteor.userId()) {
          self.state.set("currentUserLike", data.status);
          return;
        }
      })
    });
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
  "click .btnLike": function (event, template) {
    if (!Meteor.userId()) {
      ErrorHandler.show("Lütfen kullanıcı girişi yapınız.");
      return;
    }
    const likeStatus = template.state.get("currentUserLike");
    if (likeStatus === undefined) {
      const obj = {
        _id: template.state.get("column")._id,
        like: {
          status: true,
        }
      }
      Meteor.call("like.create.column", obj, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        AppUtil.refreshTokens.set("columnDetail", Random.id());
      });
    }else if(likeStatus === true){
      const obj = {
        _id: template.state.get("column")._id,
      }
      Meteor.call("like.delete.column", obj, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        AppUtil.refreshTokens.set("columnDetail", Random.id());
      });
    }else if(likeStatus === false){
      Meteor.call("like.delete.column",{_id: template.state.get("column")._id}, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        const obj = {
          _id: template.state.get("column")._id,
          like: {
            status: true,
          }
        }
        Meteor.call("like.create.column", obj, function (error, success) {
          if (error) {
            ErrorHandler.show(error.message);
            return;
          }
          AppUtil.refreshTokens.set("columnDetail", Random.id());
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
        _id: template.state.get("column")._id,
        like: {
          status: false,
        }
      }
      Meteor.call("like.create.column", obj, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        AppUtil.refreshTokens.set("columnDetail", Random.id());
      });
    }else if(likeStatus === false){
      const obj = {
        _id: template.state.get("column")._id,
      }
      Meteor.call("like.delete.column", obj, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        AppUtil.refreshTokens.set("columnDetail", Random.id());
      });
    }else if(likeStatus === true){
      Meteor.call("like.delete.column",{_id: template.state.get("column")._id}, function (error, success) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        const obj = {
          _id: template.state.get("column")._id,
          like: {
            status: false,
          }
        }
        Meteor.call("like.create.column", obj, function (error, success) {
          if (error) {
            ErrorHandler.show(error.message);
            return;
          }
          AppUtil.refreshTokens.set("columnDetail", Random.id());
        });
      });
    }
    
  },
});
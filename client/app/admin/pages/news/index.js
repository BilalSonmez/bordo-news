import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';
Template.adminPageNew.onCreated(function () {
  this.state = new ReactiveDict(null, {
    news:[],
  });
  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 10,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'asc'
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.adminPageNew.onRendered(function () {
  const self = this;
  this.autorun(function () {
    AppUtil.refreshTokens.get("news");
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
    
    Meteor.call("news.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.pagination.set("totalCount",result.options.pagination.totalCount);
      const pages=Math.ceil(result.options.pagination.totalCount/result.options.pagination.pageItems);
      self.pagination.set("totalPages",pages);
      self.state.set("news", result);
    })

  });
});

Template.adminPageNew.events({
  'click .btnNewsAdd': function (event, template) {
    FlowRouter.go("admin.new.add",{});
  },
  "click .btnNewsEdit": function (event, template) {
    FlowRouter.go("admin.new.edit", {_id: this._id});
  },
  "click .btnNewsDelete": function (event, template) {
    event.preventDefault();
    const news = this;
    Swal.fire({
      title: 'Do you want to delete News?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call(
          "news.delete",{_id: news._id},function (error, result) {
            if (error) {
              ErrorHandler.show(error.message);
              return;
            }
            Swal.fire('Deleted!', '', 'success');
            AppUtil.refreshTokens.set("news", Random.id());
          }
        );
        
      }
    })
  },
});

Template.adminPageNew.onDestroyed(function () {

});

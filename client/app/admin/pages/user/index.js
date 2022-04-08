import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';
Template.adminPageUser.onCreated(function () {
  this.state = new ReactiveDict(null, {
    users:[],
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

Template.adminPageUser.onRendered(function () {
  const self = this;
  this.autorun(function () {
    AppUtil.refreshTokens.get("user");
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

    Meteor.call("user.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.state.set("users", result);
      self.pagination.set("totalCount", result.options.pagination.totalCount);
      const pages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);
      self.pagination.set("totalPages", pages);
    });
    

  });
});


Template.adminPageUser.events({
  "click .btnUserDelete": function (event, template) {
    event.preventDefault();
    const user = this;
    console.log(user);
    Swal.fire({
      title: 'Do you want to delete User?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call(
          "user.delete",{_id: user._id},function (error, result) {
            if (error) {
              ErrorHandler.show(error.message);
              return;
            }
            Swal.fire('Deleted!', '', 'success');
            AppUtil.refreshTokens.set("user", Random.id());
          }
        );
        
      }
    })
  },
  "click .btnSetAdminRole": function (event, template) {
    event.preventDefault();
    const user = this;
    console.log(user);
    Swal.fire({
      title: 'Do you want to give Admin Role?',
      showCancelButton: true,
      confirmButtonText: 'Give',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call(
          "role.set.admin",{_id: user._id,},
          function (error, result) {
            if (error) {
              ErrorHandler.show(error.message);
              return;
            }
            Swal.fire('Admin Role Setted!', '', 'success');
            AppUtil.refreshTokens.set("user", Random.id());
          }
        );
      }
    })  
  },
  "click .btnSetEditorRole": function (event, template) {
    event.preventDefault();
    const user = this;
    console.log(user);
    Swal.fire({
      title: 'Do you want to give Editor Role?',
      showCancelButton: true,
      confirmButtonText: 'Give',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call(
          "role.set.editor",{_id: user._id,},
          function (error, result) {
            if (error) {
              ErrorHandler.show(error.message);
              return;
            }
            Swal.fire('Editor Role Setted!', '', 'success');
            AppUtil.refreshTokens.set("user", Random.id());
          }
        );
      }
    })  
  },
  "click .btnCancelAdminRole": function (event, template) {
    event.preventDefault();
    const user = this;
    console.log(user);
    Swal.fire({
      title: 'Do you want to cancel Admin Role?',
      showCancelButton: true,
      confirmButtonText: 'Okey',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call(
          "role.cancel.admin",{_id: user._id,},
          function (error, result) {
            if (error) {
              ErrorHandler.show(error.message);
              return;
            }
            Swal.fire('Admin Role Canceled!', '', 'success');
            AppUtil.refreshTokens.set("user", Random.id());
          }
        );
      }
    })  
  },
  "click .btnCancelEditorRole": function (event, template) {
    event.preventDefault();
    const user = this;
    console.log(user);
    Swal.fire({
      title: 'Do you want to cancel Editor Role?',
      showCancelButton: true,
      confirmButtonText: 'Okey',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call(
          "role.cancel.editor",{_id: user._id,},
          function (error, result) {
            if (error) {
              ErrorHandler.show(error.message);
              return;
            }
            Swal.fire('Editor Role Canceled!', '', 'success');
            AppUtil.refreshTokens.set("user", Random.id());
          }
        );
      }
    })  
  },
});

Template.adminPageUser.onDestroyed(function () {

});

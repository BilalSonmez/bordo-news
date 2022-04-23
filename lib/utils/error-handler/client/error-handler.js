import Swal from 'sweetalert2';

ErrorHandler = {
  show: function (error, template) {
    console.log(error, template);
    let message;
    
    if (typeof error === 'string') {
      message = error;
    } else {
      message = error.reason;
    }

    Swal.fire({
      title: 'Oops...',
      text: message,
      icon: 'error',
      confirmButtonText: 'Okey :(',
    });
  },
};

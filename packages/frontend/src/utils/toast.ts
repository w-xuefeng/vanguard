import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: void 0,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

interface INotificationOption {
  message: string;
  description: string;
}

const notification = {
  success: (options: INotificationOption) =>
    toastr.success(options.description, options.message),
  info: (options: INotificationOption) =>
    toastr.info(options.description, options.message),
  warning: (options: INotificationOption) =>
    toastr.warning(options.description, options.message),
  error: (options: INotificationOption) =>
    toastr.error(options.description, options.message),
};

export { notification, toastr };

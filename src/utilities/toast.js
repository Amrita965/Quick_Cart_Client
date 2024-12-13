import Toastify from "toastify-js";

const successToast = (message) => {
  Toastify({
    text: message,
    close: true,
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
};

const errorToast = (message) => {
  Toastify({
    text: message,
    position: "center",
    style: {
      background: "linear-gradient(to right, #ff0000, #ff6666)",
    },
  }).showToast();
};

export { successToast, errorToast };

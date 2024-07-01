import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    position: "bottom-right",
       theme:'colored',
                autoClose: 3000,

    
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
  });
};

export const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    position: "bottom-right",
        autoClose: 3000,
        theme:'colored',
  
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
  });
};

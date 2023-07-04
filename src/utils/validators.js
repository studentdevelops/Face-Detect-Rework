import { toast } from "react-toastify";

export const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pattern.test(email)) {
        return true;
    }
    toast.warn("Please enter a valid Email Address.", { position: toast.POSITION.TOP_RIGHT })
    return false;

}

export const validatePassword = (password) => {
    var pattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    if (pattern.test(password)) {
        return true;
    }
    toast.warn("Please enter a password that is at least 8 characters long and contains both letters and numbers.", { position: toast.POSITION.TOP_RIGHT })
    return false;
}
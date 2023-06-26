
export const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export const validatePassword = (password) => {
    var pattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    // toast.warn("Please enter a password that is at least 8 characters long and contains both letters and numbers.", { position: toast.POSITION.TOP_RIGHT })
    return pattern.test(password);
}
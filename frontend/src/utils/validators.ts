
export const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePassword = (password: string) => {
    return password.length >= 6;
  };
  
  export const validatePhone = (phone: string) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };
  
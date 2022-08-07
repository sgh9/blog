export const validate = (user)=> {
    const { email, password } = user;
    const errors = {
        email: "invalid email",
    };
    return errors;
}

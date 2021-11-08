import { bcrypt } from "../../deps.js"
import * as userService from "../../services/userService.js"
import { validasaur } from "../../deps.js"

const validationRules = {
    email: [validasaur.isEmail, validasaur.required],
    password: [validasaur.required, validasaur.minLength(4)],
}

const getUserData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
      email: params.get("email"),
      password: params.get("password"),
    };
  };

const showRegisterForm = async ({render}) => {
    let data = {
        email: "",
    }
    render("registration.eta",data)
}

const registerUser = async ({request, response, render}) => {
    const userData = await getUserData(request)
    const [passes, errors] = await validasaur.validate(userData,validationRules)
    if(!passes){
        let data = {
            error: "Please make sure to be using an email and to have a password at least 4 chars long",
            email: userData.email
        }
        render("registration.eta",data)
        return
    } else {
        await userService.addUser(
            userData.email,
            await bcrypt.hash(userData.password),
        );
    }

  response.redirect("/auth/login");
};

export { registerUser, showRegisterForm }
import { bcrypt } from "../../deps.js"
import * as userService from "../../services/userService.js"

const showRegisterForm = async ({render}) => {
    render("registration.eta")
}

const registerUser = async ({request, response}) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    await userService.addUser(
        params.get("email"),
        await bcrypt.hash(params.get("password")),
    );

  response.redirect("/auth/login");
};

export { registerUser, showRegisterForm }
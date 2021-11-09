import * as userService from "../../services/userService.js"
import { bcrypt } from "../../deps.js";

const showLoginForm = ({ render }) => {
    render("login.eta");
  };

const login = async ({ request, response, state, render }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
  
    const userFromDatabase = await userService.findUserByEmail(
      params.get("email"),
    );

    if (userFromDatabase.length === 0) {
        let data = {
            error: "Login failed",
        }
      render("login.eta", data);
      return;
    }
  
    const user = userFromDatabase[0];
    const passwordMatches = await bcrypt.compare(
      params.get("password"),
      user.password,
    );
  
    if (!passwordMatches) {
        let data = {
            error: "Login failed",
        }
        render("login.eta", data);
      return;
    }
  
    await state.session.set("user", user);
    response.redirect("/questions");
};

export { showLoginForm, login}
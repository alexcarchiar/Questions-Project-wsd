import { Application, Session } from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";
import { router } from "./routes/routes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = new Application();

const session = new Session();
app.use(session.initMiddleware());

app.use(errorMiddleware);
app.use(serveStaticMiddleware);
app.use(renderMiddleware);
app.use(authMiddleware)
app.use(router.routes());

export { app };

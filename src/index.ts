import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference, Scalar } from "@scalar/hono-api-reference";
import { missionsRoute } from "./modules/missions/route";

const app = new OpenAPIHono();

// Logic: Daftarkan rute dengan prefix "/api/missions"
app.route("/api/missions", missionsRoute);




app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "rdr2 API",
    version: "1.0.0",
  },
});

app.get(
  "/",
  Scalar({
    pageTitle: " rdr2 API",
    url: "/openapi.json",
  })
);

export default app;
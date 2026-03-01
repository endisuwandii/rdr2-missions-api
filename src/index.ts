import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { missionsRoute } from "./modules/missions/route";


const app = new OpenAPIHono();

// Daftarkan rute-rute modul
app.route("/api/missions", missionsRoute);


app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: { 
    title: "RDR2 API", 
    version: "1.0.0",
    description: "API Portofolio Endi Suwandi - Universitas Sebelas April"
  },
});

app.get("/", Scalar({ spec: { url: "/openapi.json" }, theme: "purple" }));

export default app;
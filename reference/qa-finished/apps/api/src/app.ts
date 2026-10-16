import Fastify, { type FastifyInstance } from "fastify";
import { createFactorRepository } from "./modules/factors/repository.js";
import { createFactorService } from "./modules/factors/service.js";
import { registerFactorRoutes } from "./modules/factors/routes.js";

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false });

  app.get("/health", async () => ({ status: "ok" }));

  const factorRepository = createFactorRepository();
  factorRepository.seed();
  registerFactorRoutes(app, createFactorService(factorRepository));

  return app;
}

import type { FastifyInstance, FastifyReply } from "fastify";
import type { FactorService } from "./service.js";
import { ACTIVITY_TYPES } from "./types.js";

interface ListQuery {
  scope?: string;
  activityType?: string;
}

const PROBLEM_BASE = "https://carbonhub.example/problems";

function badRequest(reply: FastifyReply, slug: string, title: string, detail: string) {
  return reply
    .code(400)
    .type("application/problem+json")
    .send({ type: `${PROBLEM_BASE}/${slug}`, title, status: 400, detail });
}

export function registerFactorRoutes(app: FastifyInstance, service: FactorService): void {
  app.get<{ Querystring: ListQuery }>("/api/v1/factors", async (request, reply) => {
    const { scope, activityType } = request.query;

    if (scope !== undefined && scope !== "1" && scope !== "2") {
      return badRequest(
        reply,
        "invalid-scope",
        "Invalid scope",
        `scope must be 1 or 2, got "${scope}".`
      );
    }

    if (
      activityType !== undefined &&
      !(ACTIVITY_TYPES as readonly string[]).includes(activityType)
    ) {
      return badRequest(
        reply,
        "invalid-activity-type",
        "Invalid activity type",
        `activityType must be one of ${ACTIVITY_TYPES.join(", ")}, got "${activityType}".`
      );
    }

    const items = service.list({
      scope: scope === undefined ? undefined : Number(scope),
      activityType
    });

    return { count: items.length, items };
  });
}

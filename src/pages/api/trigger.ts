import type { APIRoute } from "astro";

export const prerender = false;

const DEFAULT_REPO = "javier1234559/blog_astro";
const DISPATCH_EVENT = "notion_publish";

export const GET: APIRoute = async () => {
  const githubToken = import.meta.env.GITHUB_TOKEN;
  const githubRepo = import.meta.env.GITHUB_REPO ?? DEFAULT_REPO;

  if (!githubToken) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Server is missing GITHUB_TOKEN",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const [owner, repo] = githubRepo.split("/");
  if (!owner || !repo) {
    return new Response(
      JSON.stringify({ ok: false, error: "Invalid GITHUB_REPO format" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: DISPATCH_EVENT,
          client_payload: {
            triggered_at: new Date().toISOString(),
            source: "blog_astro_api",
          },
        }),
      }
    );

    if (!response.ok) {
      const details = await response.text();
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Failed to trigger GitHub workflow",
          details,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Sync workflow triggered",
        event_type: DISPATCH_EVENT,
        repository: `${owner}/${repo}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Unexpected error while triggering workflow",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

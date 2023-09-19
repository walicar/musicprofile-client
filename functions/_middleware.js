import * as cheerio from "cheerio";

export async function onRequest({ request, next, env }) {
  const isDark = request.headers.get("Cookie")?.includes("dark");
  const isHtml = request.headers.get("Sec-Fetch-Dest") === "document";
  if (isDark && isHtml) {
    const res = await env.ASSETS.fetch(request.url);
    const html = await res.text();
    const $ = cheerio.load(html);
    $("body").attr("style", "background: #111827");
    const updated = $.html();
    const data = toReadableStream(updated);
    return new Response(data);
  } else {
    return env.ASSETS.fetch(request.url);
  }
}

function toReadableStream(str) {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(str));
      controller.close();
    },
  });
}

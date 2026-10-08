import { afterEach, describe, expect, mock, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";

let content = {};

// Keep these rendering checks isolated from the live CMS database.
mock.module("@/lib/actions/content", () => ({
  getAllContent: async () => content,
}));

const { default: Home } = await import("../src/app/page");
const editor = readFileSync(new URL("../src/app/admin/(protected)/AdminEditor.tsx", import.meta.url), "utf8");
const homeKeys = [...editor.match(/const homeKeys = \[([\s\S]*?)\];/)[1].matchAll(/"(home\.[^"]+)"/g)].map((match) => match[1]);

afterEach(() => { content = {}; });

describe("home page CMS content", () => {
  test("renders every field saved by the admin Home tab", async () => {
    expect(homeKeys).toHaveLength(21);
    content = Object.fromEntries(homeKeys.map((key, i) => [key, `CMS field ${i} saved successfully`]));

    const html = renderToStaticMarkup(await Home());

    for (const key of homeKeys) {
      expect(html).toContain(content[key]);
    }
  });

  test("reads updated content on the next render and keeps hero and CTA independent", async () => {
    content = { "home.welcome.title": "Original heading", "home.hero.tagline": "Hero only", "home.cta.tagline": "CTA only" };
    const first = renderToStaticMarkup(await Home());
    content["home.welcome.title"] = "Updated heading";
    const second = renderToStaticMarkup(await Home());

    expect(first).toContain("Original heading");
    expect(second).toContain("Updated heading");
    expect(second).not.toContain("Original heading");
    expect(second.match(/Hero only/g)).toHaveLength(1);
    expect(second.match(/CTA only/g)).toHaveLength(1);
  });

  test("uses defaults for missing fields, but honors explicitly cleared content", async () => {
    const fallback = renderToStaticMarkup(await Home());
    expect(fallback).toContain("A boutique lesson barn, built around the rider.");
    expect(fallback).toContain("Come to have fun, relax, and ride.");
    expect(fallback).not.toContain("Our Mission");

    content = Object.fromEntries(homeKeys.map((key) => [key, ""]));
    const cleared = renderToStaticMarkup(await Home());
    expect(cleared).not.toContain("where passion makes progress");
    expect(cleared).not.toContain("A boutique lesson barn, built around the rider.");
    expect(cleared).not.toContain("Come to have fun, relax, and ride.");
    expect(cleared).not.toContain("Safety First");
    expect(cleared).not.toContain("Follow your passions");
  });

  test("renders a restored section even when only its title is saved", async () => {
    content = { "home.mission.title": "New mission title", "home.basics.paragraph1": "New basics paragraph" };
    const html = renderToStaticMarkup(await Home());
    expect(html).toContain("New mission title");
    expect(html).toContain("New basics paragraph");
    expect(html).toContain("From Basics to Beyond");
  });
});

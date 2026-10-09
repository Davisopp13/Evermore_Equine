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

  test("moves the editable tagline explanation beneath the photo and omits an empty closing band", async () => {
    const explanation = 'At Evermore Equine, we created our tagline, "where passion makes progress", encouraging our riders to follow their passions, in and out of the barn.';
    content = {
      "home.mission.paragraph2": `Keep this mission paragraph.\n\n${explanation}`,
      "home.cta.tagline": "",
      "home.cta.paragraph1": "",
      "home.cta.paragraph2": "",
    };
    const html = renderToStaticMarkup(await Home());
    const sections = [...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map((match) => match[0]);
    const valuesIndex = sections.findIndex((section) => section.includes('id="values"'));
    const photoSection = sections[valuesIndex + 1];
    const missionSection = sections.find((section) => section.includes("Keep this mission paragraph."));

    expect(photoSection).toContain("A rider and chestnut horse clearing a jump in front of the barn");
    expect(photoSection.indexOf("At Evermore Equine")).toBeGreaterThan(photoSection.indexOf("<img"));
    expect(missionSection).not.toContain("At Evermore Equine");
    expect(html.match(/At Evermore Equine/g)).toHaveLength(1);
    expect(html).not.toContain("A boutique riding lesson facility focused on safety");

    content["home.mission.paragraph2"] = 'Keep this mission paragraph.\n\nAt Evermore Equine, we created our tagline, "updated tagline", to inspire every rider.';
    const updated = renderToStaticMarkup(await Home());
    expect(updated).toContain("updated tagline");
    expect(updated).not.toContain("encouraging our riders to follow their passions");
  });
});

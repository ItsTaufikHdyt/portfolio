import { XMLParser } from "fast-xml-parser";
import { medium } from "../data/medium.js";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_"
});

const safeHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
};

const decodeEntities = (value) => String(value || "")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">")
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'");

const plainText = (html) => decodeEntities(String(html || "")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " "))
  .replace(/\s+/g, " ")
  .trim();

const firstImage = (html) => {
  const match = String(html || "").match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
  return safeHttpUrl(match?.[1] || "");
};

const excerpt = (html) => {
  const text = plainText(html);
  return text.length > 170 ? `${text.slice(0, 167).trim()}...` : text;
};

const categories = (value) => {
  if (Array.isArray(value)) return value.map(plainText).filter(Boolean);
  const category = plainText(value);
  return category ? [category] : [];
};

const normalizeDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const normalizeRssItem = (item) => {
  const content = item["content:encoded"] || item.description || "";
  const enclosure = item.enclosure?.["@_url"] || item.enclosure?.url || "";
  const thumbnail = item["media:thumbnail"]?.["@_url"] || "";

  return {
    title: plainText(item.title) || "Untitled article",
    publishedAt: normalizeDate(item.pubDate),
    excerpt: excerpt(item.description || content) || "Read the full article on Medium.",
    url: safeHttpUrl(item.link),
    thumbnail: safeHttpUrl(thumbnail || enclosure) || firstImage(content),
    categories: categories(item.category),
    author: plainText(item["dc:creator"] || "")
  };
};

const normalizeJsonItem = (item) => ({
  title: plainText(item.title) || "Untitled article",
  publishedAt: normalizeDate(item.pubDate),
  excerpt: excerpt(item.description || item.content) || "Read the full article on Medium.",
  url: safeHttpUrl(item.link),
  thumbnail: safeHttpUrl(item.thumbnail || item.enclosure?.link || "") || firstImage(item.content),
  categories: categories(item.categories),
  author: plainText(item.author || "")
});

const fetchDirectFeed = async () => {
  const response = await fetch(medium.feedUrl, {
    headers: {
      Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
      "User-Agent": "Taufik-Hidayat-Portfolio-Build/1.0"
    }
  });

  if (!response.ok) throw new Error(`Medium RSS returned ${response.status}`);

  const parsed = parser.parse(await response.text());
  const items = parsed?.rss?.channel?.item;
  return (Array.isArray(items) ? items : items ? [items] : []).map(normalizeRssItem);
};

const fetchJsonFallback = async () => {
  const requestUrl = `${medium.feedToJsonEndpoint}${encodeURIComponent(medium.feedUrl)}`;
  const response = await fetch(requestUrl);
  if (!response.ok) throw new Error(`Medium JSON fallback returned ${response.status}`);

  const data = await response.json();
  if (data.status && data.status !== "ok") throw new Error("Medium JSON fallback returned an error");
  return (Array.isArray(data.items) ? data.items : []).map(normalizeJsonItem);
};

export const getMediumArticles = async () => {
  if (!medium.username) return [];

  try {
    const articles = await fetchDirectFeed();
    return articles.filter((article) => article.url).slice(0, medium.maxArticles);
  } catch (directError) {
    console.warn("Direct Medium RSS fetch failed; trying JSON fallback.", directError);

    try {
      const articles = await fetchJsonFallback();
      return articles.filter((article) => article.url).slice(0, medium.maxArticles);
    } catch (fallbackError) {
      console.warn("Medium articles could not be loaded during the build.", fallbackError);
      return [];
    }
  }
};

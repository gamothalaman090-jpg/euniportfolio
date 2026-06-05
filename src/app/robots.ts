export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://euniportfolio.vercel.app/sitemap.xml",
  };
}

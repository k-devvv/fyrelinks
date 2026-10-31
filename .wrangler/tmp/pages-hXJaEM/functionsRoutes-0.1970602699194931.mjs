import { onRequestGet as __go__slug__js_onRequestGet } from "D:\\fyrelinks\\functions\\go\\[slug].js"
import { onRequestGet as __feed_xml_js_onRequestGet } from "D:\\fyrelinks\\functions\\feed.xml.js"

export const routes = [
    {
      routePath: "/go/:slug",
      mountPath: "/go",
      method: "GET",
      middlewares: [],
      modules: [__go__slug__js_onRequestGet],
    },
  {
      routePath: "/feed.xml",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__feed_xml_js_onRequestGet],
    },
  ]
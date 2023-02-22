const pkg = require("./package");

export default {
  target: "static",
  publicRuntimeConfig: {},
  privateRuntimeConfig: {},
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/png", href: "/icon.png" }]
  },
  css: [{ src: "@assets/scss/global.scss", lang: "scss" }],
  plugins: [
    { src: "~plugins/vue-agile.js", ssr: false},
    { src: "~plugins/cookieconsent.js", ssr: false },
    { src: "~/plugins/prismicLinks", ssr: false },
    { src:'~plugins/global-functions.js'}
  ],
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/moment',
    "@nuxtjs/prismic",
    "@nuxtjs/pwa",
    [
      "nuxt-lazy-load",
      {
        directiveOnly: true,
        observerConfig: {
          rootMargin: "0px 0px 2600px 0px",
          threshold: 0
        }
      }
    ]
  ],
  pwa: {
    workbox: {
      clientsClaim: true
    },
    manifest: {
      name: "Nuxt Prismic Scaffold",
      lang: "de",
      useWebmanifestExtension: false
    },
    meta: { theme_color: "#000000", lang: "de", nativeUI: true },
    icon: "icon.png"
  },
  prismic: {
    endpoint: process.env.PRISMIC_API_ENDPOINT,
    disableGenerator: false,
    modern: true,
    preview: '/preview',
    components: false,
    apiOptions: {
      routes: [
        {
          type: 'page',
          path: '/:uid',
        },
        {
          type: 'custom-form',
          path: '/forms/:uid',
        },
        {
          type: 'blog_post',
          path: '/blog/:category/:uid',
          resolvers: {
            // A list of “path variables” mapped to the API ID
            // of a Content Relationship field in the Custom Type.
            category: 'category'
          }
        },
        {
          type: 'blog_category',
          path: '/blog/:uid',
        },
      ]
    },
  },
  buildModules: ["@nuxtjs/prismic"],
  build: {
    extend(config, ctx) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    }
  },
  generate: {
    fallback: "404.html"
  }
};

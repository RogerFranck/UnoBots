/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: ""
  },
  basePath: "/UnoBots",
  assetPrefix: "/UnoBots"
}

module.exports = nextConfig

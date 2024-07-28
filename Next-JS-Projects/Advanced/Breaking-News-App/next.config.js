/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.si.com", "fashionista.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: '**'
      },
      {
        protocol: "http",
        hostname: '**'
      },
    ]
  }
}

module.exports = nextConfig

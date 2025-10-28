/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "media-exp1.licdn.com",
      "res.cloudinary.com",
      "easystayafrica.s3.eu-north-1.amazonaws.com",
    ], //  TODO: Remove once linked up to the real API
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;

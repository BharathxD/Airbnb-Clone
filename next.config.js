/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "media-bucket-project.s3.ap-south-1.amazonaws.com",
    ],
    imageSizes: [16, 32, 48, 64, 96, 100],
  },
};

module.exports = nextConfig;

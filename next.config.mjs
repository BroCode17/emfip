/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
images: {

  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cloud.appwrite.io',
      port: '',
      // pathname: '/account123/**',
    },
  ]
},
};

export default nextConfig;

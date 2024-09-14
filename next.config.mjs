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
// env: {
//   EMAIL: process.env.EMAIL,
//   EMAIL_PASS: process.env.EMAIL_PASS,
//   ADMIN_EMAIL: process.env.ADMIN_EMAIL,
// },
};

export default nextConfig;

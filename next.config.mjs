/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL
    },
    eslint: {
        ignoreDuringBuilds: true
    },
};

export default nextConfig;

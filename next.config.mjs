/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    // dominio del vercel blob de las imagenes
    images: {
        domains: ["htvxc87v1ptrmkyt.public.blob.vercel-storage.com"],
    },
};

export default nextConfig;

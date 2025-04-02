import crypto from "crypto";

/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";
const nonce = crypto.randomBytes(16).toString("base64");

const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        domains: ["htvxc87v1ptrmkyt.public.blob.vercel-storage.com"],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
                    // version 1
                    // { 
                    //     key: "Content-Security-Policy", 
                    //     value: isDev
                    //         ? `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://code.jquery.com https://sdk.mercadopago.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline';`
                    //         : `default-src 'self'; script-src 'self' https://code.jquery.com https://sdk.mercadopago.com https://www.google-analytics.com https://vercel.live 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}';`
                    // },
                    // version 2 -> permite mercadopago
                    // {
                    //     key: "Content-Security-Policy",
                    //     value: isDev
                    //       ? `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://code.jquery.com https://sdk.mercadopago.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; frame-ancestors 'self' https://www.mercadopago.com; connect-src 'self' https://api.mercadopago.com; form-action 'self' https://www.mercadopago.com;`
                    //       : `default-src 'self'; script-src 'self' https://code.jquery.com https://sdk.mercadopago.com https://www.google-analytics.com https://vercel.live 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; frame-ancestors 'self' https://www.mercadopago.com; connect-src 'self' https://api.mercadopago.com; form-action 'self' https://www.mercadopago.com;`
                    // },
                    {
                        key: "Content-Security-Policy",
                        value: isDev
                            ? `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://code.jquery.com https://sdk.mercadopago.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; frame-ancestors 'self' https://www.mercadopago.com; connect-src 'self' https://api.mercadopago.com; form-action 'self' https://www.mercadopago.com;`
                            : `default-src 'self'; script-src 'self' https://code.jquery.com https://sdk.mercadopago.com https://www.google-analytics.com https://vercel.live 'nonce-${nonce}' 'unsafe-eval'; style-src 'self' 'nonce-${nonce}'; frame-ancestors 'self' https://www.mercadopago.com; connect-src 'self' https://api.mercadopago.com; form-action 'self' https://www.mercadopago.com;`
                    },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "geolocation=(self), microphone=()" }
                ],
            },
        ];
    }
};

export default nextConfig;
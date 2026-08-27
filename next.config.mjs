/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "192.199.120.91",
    "vineyard-flaky-reliant.ngrok-free.dev",
  ],
  async headers() {
    const devCSP =
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.mercadopago.com https://www.mercadopago.com.co https://www.google.com https://www.gstatic.com https://www.recaptcha.net; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https://api.mercadopago.com https://api.mapbox.com https://events.mapbox.com; " +
      "worker-src 'self' blob:; " +
      "child-src 'self' blob:;";

    const prodCSP =
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://www.mercadopago.com https://www.mercadopago.com.co https://www.google.com https://www.gstatic.com https://www.recaptcha.net; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https://api.mercadopago.com https://api.mapbox.com https://events.mapbox.com; " +
      "worker-src 'self' blob:; " +
      "child-src 'self' blob:;";

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: process.env.NODE_ENV === "development" ? devCSP : prodCSP,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: `/ua`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

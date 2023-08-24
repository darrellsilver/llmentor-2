/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  webpack(config) {
    // config.experiments = { ...config.experiments, topLevelAwait: true };
    // Add hnswlib-node support
    config.externals = [...config.externals, 'hnswlib-node'];
    return config;
  }
}

export default nextConfig

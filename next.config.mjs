/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // serverActions: true, Reason: Server Actions are available by default now, `experimental.serverActions` option can be safely removed.
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;

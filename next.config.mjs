/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export. No server at runtime, so no headers() and no image optimizer.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // Next 16 writes a nextjs-agent-rules block into CLAUDE.md on every dev run.
  // CLAUDE.md is the project spec, not a generated file, so this stays off.
  agentRules: false,
};

export default nextConfig;

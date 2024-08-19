/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/ConfigK8s",
  output: "export", // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;

import { withContentlayer } from "next-contentlayer";
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
};

export default withContentlayer(nextConfig);

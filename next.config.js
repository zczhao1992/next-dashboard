/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    // 禁用一些实验性功能的运行时检查
    esmExternals: "loose",

    // 禁用运行时 JS
    // runtime: "nodejs",
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
   output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  reactCompiler: true,
};

export default nextConfig;


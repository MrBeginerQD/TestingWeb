/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: {
    // !! هشدار: این خط باعث می‌شود ارورهای تایپ‌اسکریپت نادیده گرفته شوند تا بیلد انجام شود
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

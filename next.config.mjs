/** @type {import('next').NextConfig} */

const isExporting = process.env.NEXT_EXPORT === "true";

export default {
    // Disable API routes during 'next-export'
    rewrites: async () => {
        if (isExporting) {
          return [
            // Redirect API routes to a placeholder during export
            {
              source: '/api/:path*',
              destination: '/api_disabled',
            },
          ];
        }
        // No rewrites needed during normal operation
        return [];
      },
}
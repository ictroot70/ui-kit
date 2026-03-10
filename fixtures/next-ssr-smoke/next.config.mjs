import path from 'node:path'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['@ictroot/ui-kit'],
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react/jsx-runtime': path.resolve('./node_modules/react/jsx-runtime.js'),
      'react/jsx-dev-runtime': path.resolve('./node_modules/react/jsx-dev-runtime.js'),
    }

    return config
  },
}

export default nextConfig

import {fileURLToPath} from 'node:url';
export default {
  basePath: '/wildweights',
  async redirects() {
    return [{ source: '/', destination: 'https://www.fyrelinkz.com/wildweights', permanent: true, basePath: false }];
  },
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
};

import {fileURLToPath} from 'node:url';
export default {outputFileTracingRoot:fileURLToPath(new URL('.',import.meta.url)),distDir:process.env.NODE_ENV==='development'?'.next-dev':'.next'};

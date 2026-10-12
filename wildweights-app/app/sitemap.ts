import {models,site} from '@/lib/catalog';
export default function sitemap(){return ['', '/privacy','/standards',...models.map(m=>'/models/'+m.slug)].map(path=>({url:site+path,lastModified:new Date('2026-10-12')}))}

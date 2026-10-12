import {site} from '@/lib/catalog';
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:['/signup','/auth/','/account/']},sitemap:site+'/sitemap.xml'}}

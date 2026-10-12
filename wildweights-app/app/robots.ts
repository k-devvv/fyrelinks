import {site} from '@/lib/catalog';
export default function robots(){return {rules:{userAgent:'*',allow:'/wildweights/',disallow:['/wildweights/signup','/wildweights/auth/','/wildweights/account/']},sitemap:site+'/sitemap.xml'}}

"use client";

import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

declare global {
  interface Window {dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void;}
}
const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const configured = /^G-[A-Z0-9]+$/.test(id);
const consentKey = "fyre-analytics-consent";
const allowedEvents = new Set(["estimate_view","estimate_share","model_select","plan_select","provider_visit","source_visit","rss_subscribe","related_read","planner_start","planner_complete","planner_market","planner_guide_click","planner_source_click"]);
const plannerValues:Record<string,Set<string>>={
  market:new Set(["us","uk","ca","de"]),
  workload:new Set(["comfyui-image","comfyui-video","local-llm","mixed"]),
  path:new Set(["desktop-build","desktop-upgrade","laptop"]),
  placement:new Set(["planner","result-card","methodology"])
};

function privateMode() {
  return navigator.doNotTrack === "1" || (navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl === true;
}
function cleanPageLocation() {
  const url = new URL(window.location.origin + window.location.pathname);
  const input = new URLSearchParams(window.location.search);
  for (const key of ["utm_source","utm_medium","utm_campaign","utm_content"]) {
    const value = input.get(key);
    if (value && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) url.searchParams.set(key,value);
  }
  return url.href;
}
function disableTracking() {
  (window as unknown as Record<string,unknown>)[`ga-disable-${id}`] = true;
  window.gtag?.("consent","update",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    const hostname=window.location.hostname;
    for (const domain of [hostname,hostname.replace(/^www\./,"")]) document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${domain}; SameSite=Lax`;
  }
}
export default function Analytics() {
  const pathname=usePathname();
  const [consent,setConsent]=useState<"yes"|"no"|null>(null);
  const [ready,setReady]=useState(false);
  const [show,setShow]=useState(false);
  useEffect(()=>{
    if (!configured) return;
    let saved:string|null=null;
    try {saved=localStorage.getItem(consentKey);} catch {}
    const choice=privateMode()?"no":saved==="yes"?"yes":saved==="no"?"no":null;
    setConsent(choice);setShow(choice===null);
  },[]);
  useEffect(()=>{
    if (!configured||consent!=="yes"||privateMode()) return;
    (window as unknown as Record<string,unknown>)[`ga-disable-${id}`]=false;
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer!.push(arguments);};
    window.gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
    window.gtag("consent","update",{analytics_storage:"granted"});
    window.gtag("js",new Date());
    window.gtag("config",id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:cleanPageLocation(),page_referrer:document.referrer?new URL(document.referrer).origin:""});
    let script=document.getElementById("fyre-google-tag") as HTMLScriptElement|null;
    if (!script) {
      script=document.createElement("script");script.id="fyre-google-tag";script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script);
    }
    setReady(true);
    return ()=>{setReady(false);};
  },[consent]);
  useEffect(()=>{
    if (!ready||consent!=="yes"||privateMode()) return;
    window.gtag?.("event","page_view",{page_title:document.title,page_location:cleanPageLocation()});
  },[pathname,ready,consent]);
  useEffect(()=>{
    if (!ready||consent!=="yes") return;
    const event=(e:Event)=>{
      if (privateMode()) return;
      const detail=(e as CustomEvent).detail;
      if (!detail||!allowedEvents.has(detail.name)) return;
      const fields:Record<string,string|number>={};
      const plannerEvent=detail.name.startsWith("planner_");
      const keys=plannerEvent?["market","workload","path","placement"]:["provider","model","plan","billing","fits","placement"];
      for (const key of keys) {
        const value=detail.properties?.[key];
        if (typeof value==="string"&&/^[a-zA-Z0-9_-]{1,150}$/.test(value)) {
          if (plannerEvent ? plannerValues[key]?.has(value) : true) fields[key]=value;
        }
      }
      window.gtag?.("event",detail.name,fields);
    };
    const click=(e:MouseEvent)=>{
      if (privateMode()) return;
      const link=(e.target as Element)?.closest?.("a[href]") as HTMLAnchorElement|null;
      if (!link) return;
      const url=new URL(link.href);
      if (url.pathname==="/feed.xml"&&url.origin===location.origin) window.gtag?.("event","rss_subscribe",{placement:"site"});
      else if (link.closest(".sources-box,.inline-sources")&&url.protocol==="https:") window.gtag?.("event","source_visit",{source_domain:url.hostname});
      else if (link.closest(".related-section")&&url.origin===location.origin) window.gtag?.("event","related_read",{article_path:url.pathname});
    };
    window.addEventListener("fyre:measure",event);document.addEventListener("click",click);
    return ()=>{window.removeEventListener("fyre:measure",event);document.removeEventListener("click",click);};
  },[ready,consent]);
  const choose=(value:"yes"|"no")=>{
    const choice=privateMode()?"no":value;
    if (choice==="no") disableTracking();
    try {localStorage.setItem(consentKey,choice);} catch {}
    setConsent(choice);setShow(false);
  };
  if (!configured) return null;
  return <><button className="analytics-settings" type="button" onClick={()=>setShow(true)}>Analytics preferences</button>{show&&<section className="consent-banner" aria-label="Analytics preferences"><h2>Help us make this more useful.</h2><p>With your permission, Google Analytics measures page visits and tool interactions. Search text and custom budget inputs are not sent. Advertising personalization stays off. <Link href="/privacy">Privacy details</Link></p><div><button type="button" className="button-secondary" onClick={()=>choose("no")}>Decline analytics</button><button type="button" className="button-primary" onClick={()=>choose("yes")}>Allow analytics</button></div></section>}</>;
}

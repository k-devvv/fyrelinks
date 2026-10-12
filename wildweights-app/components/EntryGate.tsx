'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
export default function EntryGate({children}:{children:React.ReactNode}){
 const path=usePathname();const[accepted,setAccepted]=useState(false);const enter=useRef<HTMLButtonElement>(null);
 const publicPolicy=path==='/privacy'||path==='/standards';const blocked=!accepted&&!publicPolicy;
 useEffect(()=>{try{setAccepted(sessionStorage.getItem('wildweights-age')==='adult')}catch{}},[]);
 useEffect(()=>{if(!blocked)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';enter.current?.focus();return()=>{document.body.style.overflow=previous}},[blocked]);
 function accept(){try{sessionStorage.setItem('wildweights-age','adult')}catch{}setAccepted(true)}
 return <><div inert={blocked?true:undefined} aria-hidden={blocked?true:undefined}>{children}</div>{blocked&&<div className="entry-screen"><section className="entry-card" role="dialog" aria-modal="true" aria-labelledby="age-title" aria-describedby="age-detail" onKeyDown={e=>{if(e.key==='Tab'){const buttons=Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button,a'));const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}}><p className="eyebrow">WILDWEIGHTS / ENTRY CHECK</p><div className="age-mark" aria-hidden="true">18<span>+</span></div><h1 id="age-title">Before you enter.</h1><p id="age-detail">This directory is for adults aged 18 or older. Explore local AI models and non-explicit setup guides.</p><div className="entry-actions"><button ref={enter} onClick={accept}>I am 18 or older →</button><a className="exit" href="https://www.fyrelinkz.com">Under 18 / Leave ↗</a></div><p className="entry-fine">Self-declaration only. Does not verify age or grant advertising consent. Remembered for this tab session.</p><div className="entry-legal"><Link href="/privacy">Privacy</Link><Link href="/standards">Content & terms</Link></div></section></div>}</>}

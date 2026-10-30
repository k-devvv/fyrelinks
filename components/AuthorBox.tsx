import Image from "next/image";
import { AUTHOR } from "@/lib/author";

export default function AuthorBox() {
  if (!AUTHOR.name || !AUTHOR.bio) return null;
  return (
    <aside className="author-box" aria-label="About the author">
      {AUTHOR.photo && <Image src={AUTHOR.photo} alt={AUTHOR.name} width={72} height={72} className="author-photo" />}
      <div>
        <span className="eyebrow">WRITTEN BY</span>
        <strong>{AUTHOR.name}{AUTHOR.role && <small> · {AUTHOR.role}</small>}</strong>
        <p>{AUTHOR.bio}</p>
        {AUTHOR.testRig && <p className="author-rig"><b>Test rig:</b> {AUTHOR.testRig}</p>}
        {AUTHOR.links.length > 0 && <p className="author-links">{AUTHOR.links.map(l => <a key={l.href} href={l.href} rel="me noopener noreferrer" target="_blank">{l.label} ↗</a>)}</p>}
      </div>
    </aside>
  );
}

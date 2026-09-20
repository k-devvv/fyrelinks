import Link from "next/link";
export default function Brand() {
  return <Link href="/" className="brand" aria-label="FyreLinkz home">fyrelinkz<span className="brand-spark" aria-hidden="true">✳</span><span className="brand-period">.</span></Link>;
}

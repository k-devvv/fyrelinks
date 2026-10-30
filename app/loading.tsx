import Brand from "@/components/Brand";

export default function Loading() {
  return <div className="route-loading wrap" aria-busy="true" aria-label="Loading FyreLinkz">
    <Brand />
    <p className="eyebrow" role="status">Putting together your next good read…</p>
    <div className="skeleton loading-title" />
    <div className="skeleton loading-line" />
    <div className="skeleton loading-line loading-short" />
    <div className="skeleton loading-image" />
    <style>{`.route-loading .brand{color:var(--ink)}.route-loading .brand-mark-letter{stroke:var(--ink)}.route-loading>.eyebrow{display:block;margin:34px 0 18px;color:var(--muted)}.loading-title{height:46px;width:min(690px,82%)}.loading-line{height:12px;width:min(590px,75%);margin-top:15px}.loading-short{width:min(380px,52%)}.loading-image{height:clamp(190px,32vw,370px);width:min(900px,100%);margin-top:40px}.loading-title,.loading-image{border-radius:5px}`}</style>
  </div>;
}

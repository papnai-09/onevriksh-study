export function ProgressRing({ value, label, size=120 }) {
  const r=44,c=2*Math.PI*r,offset=c-(value/100)*c;
  return <div className="progress-ring" style={{width:size,height:size}}><svg viewBox="0 0 100 100"><circle className="ring-track" cx="50" cy="50" r={r}/><circle className="ring-value" cx="50" cy="50" r={r} strokeDasharray={c} strokeDashoffset={offset}/></svg><div><strong>{value}%</strong>{label&&<small>{label}</small>}</div></div>
}

'use client';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function PerformanceChart(){
  const data=[{name:'Test 1',you:68,avg:62},{name:'Test 2',you:76,avg:65},{name:'Test 3',you:72,avg:68},{name:'Test 4',you:84,avg:70},{name:'Test 5',you:88,avg:73}];
  return <ResponsiveContainer width="100%" height={240}><AreaChart data={data}><defs><linearGradient id="score" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1685f8" stopOpacity={.28}/><stop offset="95%" stopColor="#1685f8" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="you" stroke="#1685f8" strokeWidth={3} fill="url(#score)"/><Area type="monotone" dataKey="avg" stroke="#9aa6b2" strokeWidth={2} fill="transparent" strokeDasharray="5 5"/></AreaChart></ResponsiveContainer>
}
export function RevenueChart(){
  const data=[{m:'Jan',v:4.2},{m:'Feb',v:5.1},{m:'Mar',v:4.8},{m:'Apr',v:6.4},{m:'May',v:7.1},{m:'Jun',v:8.4}];
  return <ResponsiveContainer width="100%" height={250}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="m" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip formatter={(v)=>['₹'+v+'L','Revenue']}/><Bar dataKey="v" fill="#1685f8" radius={[5,5,0,0]} barSize={28}/></BarChart></ResponsiveContainer>
}
export function EnrollmentDonut(){
 const data=[{name:'Marketing',value:38,color:'#1685f8'},{name:'Languages',value:34,color:'#993366'},{name:'Design',value:18,color:'#20a779'},{name:'Communication',value:10,color:'#f4a224'}];
 return <ResponsiveContainer width="100%" height={230}><PieChart><Pie data={data} dataKey="value" innerRadius={62} outerRadius={88} paddingAngle={3}>{data.map(d=><Cell key={d.name} fill={d.color}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer>
}

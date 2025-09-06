import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function AllocationChart({ data }:{data:any[]}){
  const colors = ['#0b5cff','#00b894','#ffc658'];
  const total = data.reduce((s,d)=>s+d.value,0);
  const display = data.map(d=>({...d, percent: Math.round((d.value/total)*100)}));
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={display} dataKey="value" nameKey="name" outerRadius={90} innerRadius={40} paddingAngle={4}>
          {display.map((_,i)=> <Cell key={i} fill={colors[i%colors.length]} />)}
        </Pie>
        <Tooltip formatter={(val:any)=>`₹${Number(val).toLocaleString('en-IN')}`} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export const rules = {arrival:'First come, first served',duration:'Shortest job first',due:'Earliest deadline first'};
// Synthetic order book. Times are minutes from opening. Array order breaks ties.
export const orders = [
 ['Expo backdrop',0,45,75],['Sponsor wall',4,58,135],['Menu boards',9,12,90],
 ['Feather flags',13,24,115],['Window decals',18,8,70],['Tent roof',28,55,195],
 ['Table runner',39,14,165],['Sponsor boards',63,20,178],['Wayfinding',87,10,155],
 ['Photo wall',100,44,245],['Counter wrap',125,18,222],['Name plates',150,7,205]
].map(([name,arrival,duration,due],id)=>({id,name,arrival,duration,due}));

export function simulate(jobs, rule, presses=1) {
 if (!Object.hasOwn(rules,rule) || !Number.isInteger(presses) || presses<1) throw Error('Invalid schedule settings');
 const pending=[...jobs], available=Array(presses).fill(0), rows=[];
 while(pending.length){
   const press=available.indexOf(Math.min(...available));
   const start=Math.max(available[press],Math.min(...pending.map(j=>j.arrival)));
   const ready=pending.filter(j=>j.arrival<=start);
   ready.sort((a,b)=>a[rule]-b[rule] || a.arrival-b.arrival || a.id-b.id);
   const job=ready[0], end=start+job.duration;
   rows.push({...job,press:press+1,start,end,late:Math.max(0,end-job.due)});
   available[press]=end;
   pending.splice(pending.indexOf(job),1);
 }
 return rows;
}
export function metrics(rows){
 return {late:rows.filter(r=>r.late>0).length,meanTurnaround:rows.length?rows.reduce((s,r)=>s+r.end-r.arrival,0)/rows.length:0,
 maxDelay:Math.max(0,...rows.map(r=>r.late))};
}

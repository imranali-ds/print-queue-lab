import assert from 'node:assert/strict';
import {orders,rules,simulate,metrics} from './engine.mjs';
const fixture=[{id:0,arrival:5,duration:3,due:8},{id:1,arrival:6,duration:4,due:11}];
assert.deepEqual(simulate(fixture,'due').map(r=>[r.start,r.end,r.late]),[[5,8,0],[8,12,1]]);
assert.deepEqual(simulate(fixture,'due',2).map(r=>[r.start,r.end,r.late]),[[5,8,0],[6,10,0]]);
const results=[];
for(const presses of [1,2]) for(const rule of Object.keys(rules)){
 const plan=simulate(orders,rule,presses);
 assert.equal(new Set(plan.map(r=>r.id)).size,orders.length);
 const free=Array(presses).fill(0),pending=new Set(orders);
 for(const r of plan){
  const ready=[...pending].filter(j=>j.arrival<=r.start);
  assert.equal(r[rule],Math.min(...ready.map(j=>j[rule])));
  assert.ok(r.start>=r.arrival && r.start>=free[r.press-1]);
  assert.equal(r.end-r.start,r.duration);free[r.press-1]=r.end;
  pending.delete(orders[r.id]);
 }
 results.push({presses,rule,...metrics(plan)});
}
console.log(JSON.stringify(results,null,2));

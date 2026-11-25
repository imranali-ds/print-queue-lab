import {rules,orders,simulate,metrics} from './engine.mjs';
const el=id=>document.getElementById(id);
for(const [value,title] of Object.entries(rules)) el('policy').add(new Option(title,value));
function row(values){
 const tr=document.createElement('tr');
 for(const value of values){const td=document.createElement('td');td.textContent=value;tr.append(td);}
 return tr;
}
function refresh(){
 const presses=Number(el('capacity').value), policy=el('policy').value;
 el('compare').replaceChildren();
 for(const [rule,title] of Object.entries(rules)){
  const schedule=simulate(orders,rule,presses), stats=metrics(schedule);
  const line=row([title,stats.late,stats.meanTurnaround.toFixed(1)+' min',stats.maxDelay+' min']);
  el('compare').append(line);
  if(rule===policy){
   line.className='selected';
   el('summary').textContent=title+' · '+(orders.length-stats.late)+' of '+orders.length+' orders on time';
   el('log').replaceChildren(...schedule.map(j=>row([j.name,j.press,j.arrival,j.start,j.end,j.due,j.late])));
  }
 }
}
el('capacity').onchange=refresh;el('policy').onchange=refresh;refresh();

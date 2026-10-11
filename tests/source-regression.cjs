// Source-level tests with minimal DOM/storage doubles. These are not browser/device tests.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(process.argv[2]||'index.html','utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements=new Map(), storage=new Map();let blocked=false,alertMessage='';
const element=id=>{if(!elements.has(id))elements.set(id,{value:id==='promptKind'?'two':'',textContent:'',innerHTML:'',addEventListener(){},click(){},remove(){},focus(){},select(){}});return elements.get(id)};
const context={document:{getElementById:element,createElement:()=>element('link'),body:{appendChild(){}}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},window:{},navigator:{},Blob,URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},setTimeout(){},alert:m=>alertMessage=m,console};
vm.createContext(context);
vm.runInContext(js.replace('load();renderPrompt();render();',`window.test={defaultRun,validSave,importSave,exportSave,flipCard,guess,audit,auditNext,boot,actCrisis,signalTap,stateUpdate,load,setApp:x=>app=x,getApp:()=>app};load();renderPrompt();render();`),context);
const t=context.window.test,clone=x=>JSON.parse(JSON.stringify(x));
const state=id=>({pair:Math.floor(id/2),slot:id%2,plays:0,game:clone(t.defaultRun(id))});
const result=r=>assert.equal(t.getApp().game.result,r);
async function main(){
 let malformed={pair:0,slot:0,plays:0,game:{id:0}};
 assert.equal(t.validSave(malformed),false);
 let before=clone(t.getApp());await t.importSave({text:async()=>JSON.stringify({format:'VGamer1991-Arcade-2.0',app:malformed})});assert.deepEqual(clone(t.getApp()),before);assert.match(element('saveStatus').textContent,/previous progress was kept/);
 for(let id=0;id<6;id++){
  let x=state(id);t.setApp(x);assert.equal(t.validSave(x),true);
  await t.importSave({text:async()=>JSON.stringify({format:'VGamer1991-Arcade-2.0',app:x})});assert.deepEqual(clone(t.getApp()),x);
  x=t.getApp();let g=x.game;
  if(id===0){for(let n=0;n<4;n++)for(let i=0;i<8;i++)if(g.board[i]===n)t.flipCard(i)}
  if(id===1){g.draft=g.secret;t.guess()}
  if(id===2){for(let i=0;i<5;i++){const a=g.invoices[g.index];t.audit(a[1]*a[2]+a[3]);t.auditNext()}}
  if(id===3){for(let i=0;i<4;i++)t.boot(i)}
  if(id===4){for(const high of [true,true,true,false])t.actCrisis(high)}
  if(id===5){for(let i=0;i<3;i++){g.phase='repeat';for(const n of g.sequences[i])t.signalTap(n)}}
  result('win');assert.equal(t.validSave(t.getApp()),true);let win=clone(t.getApp());await t.importSave({text:async()=>JSON.stringify({format:'VGamer1991-Arcade-2.0',app:win})});result('win');context.window.VGamerArcade.newRun();result(null);
  if(id===0)continue;
  g=t.getApp().game;
  if(id===1){const wrong=['123','124'].find(v=>v!==g.secret);for(let i=0;i<6;i++){g.draft=wrong;t.guess()}}
  if(id===2){for(let i=0;i<5;i++){t.audit(-100);t.auditNext()}}
  if(id===3){for(let i=0;i<3;i++)t.boot(1)}
  if(id===4){for(let i=0;i<4;i++)t.actCrisis(false)}
  if(id===5){for(let i=0;i<3;i++){g.phase='repeat';t.signalTap((g.sequences[0][0]+1)%4)}}
  result('lose');assert.equal(t.validSave(t.getApp()),true);
 }
 before=clone(t.getApp());await t.importSave({text:async()=>'{bad'});assert.deepEqual(clone(t.getApp()),before);
 blocked=true;await t.importSave({text:async()=>JSON.stringify({format:'VGamer1991-Arcade-2.0',app:state(1)})});assert.match(element('saveStatus').textContent,/for this session/);
 t.exportSave();assert.match(element('saveStatus').textContent,/Export requested/);
 // Demonstrate the old acceptance/render failure without altering the baseline.
 if(process.argv[3]){const old=fs.readFileSync(process.argv[3],'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
 const oldContext={...context,window:{}};vm.createContext(oldContext);vm.runInContext(old.replace('load();renderPrompt();render();','window.test={validSave,importSave,getApp:()=>app};load();renderPrompt();render();'),oldContext);
 assert.equal(oldContext.window.test.validSave(malformed),true);await oldContext.window.test.importSave({text:async()=>JSON.stringify({format:'VGamer1991-Arcade-2.0',app:malformed})});assert.match(alertMessage,/Could not import/);assert.equal(oldContext.window.test.getApp().game.board,undefined);}
 console.log('PASS: six wins, five losses, replay, six active/ended save imports, invalid JSON/shape preservation, storage failure, export request; optional baseline corruption reproduction. DOM doubles: no layout, touch, downloads or Safari verification.');
}
main().catch(e=>{console.error(e);process.exitCode=1});

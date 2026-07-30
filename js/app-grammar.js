// =============================================
// LINGUA — Grammar (grammar + corpus + daily)
// =============================================
// ---- Grammar Editor (15-Step Textbook Format) ----
const GR_STEPS=[
  {id:'greet',num:'01',icon:''+icon('wave')+'',
    title:{jp:'挨拶・基本表現',en:'Greetings & Basics',zh:'问候与基础',es:'Saludos y básicos'},
    hint:{jp:'「こんにちは」「ありがとう」「はい/いいえ」など、最初に使う定型表現を記録しましょう。挨拶は言語の第一印象です。',en:'Record foundational formulas like "hello", "thank you", "yes/no". Greetings form the language\'s first impression.',zh:'记录"你好""谢谢""是/不是"等最初使用的套语。问候是语言的第一印象。',es:'Registra fórmulas básicas como "hola", "gracias", "sí/no". Los saludos forman la primera impresión del idioma.'}},
  {id:'numbers',num:'02',icon:''+icon('hash')+'',
    title:{jp:'数字・数詞',en:'Numbers & Numerals',zh:'数字与数词',es:'Números y numerales'},
    hint:{jp:'1〜10の基本数詞、序数（第一・第二）、大きな数の作り方を定義します。数字は語彙の基盤になります。',en:'Define numerals 1–10, ordinals (first, second), and how larger numbers compose. Numbers anchor the lexicon.',zh:'定义1-10基本数词、序数（第一、第二）和大数的构成。数字是词汇的基础。',es:'Define numerales 1–10, ordinales (primero, segundo) y cómo se forman números grandes. Los números anclan el léxico.'}},
  {id:'pronouns',num:'03',icon:''+icon('user')+'',
    title:{jp:'代名詞',en:'Pronouns',zh:'代词',es:'Pronombres'},
    hint:{jp:'一人称（私・われわれ）、二人称（あなた）、三人称（彼・彼女・それ）の区別を設定します。包括的vs排他的複数も検討を。',en:'Set first (I, we), second (you), third (he/she/it) person. Consider inclusive vs. exclusive plurals.',zh:'设定第一人称（我、我们）、第二人称（你）、第三人称（他/她/它）。考虑包括式与排他式复数。',es:'Establece primera (yo, nosotros), segunda (tú) y tercera (él/ella/ello) persona. Considera plural inclusivo vs exclusivo.'}},
  {id:'possessives',num:'04',icon:''+icon('tag')+'',
    title:{jp:'所有格',en:'Possessives',zh:'所有格',es:'Posesivos'},
    hint:{jp:'「私の〜」「あなたの〜」という所有の表現方法。接辞なのか、独立した語なのかを決めましょう。',en:'How to express "my", "your". Decide whether they are affixes or independent words.',zh:'"我的""你的"等所有表达方式。决定是词缀还是独立词。',es:'Cómo expresar "mi", "tu". Decide si son afijos o palabras independientes.'}},
  {id:'demonstratives',num:'05',icon:''+icon('pointR')+'',
    title:{jp:'指示詞',en:'Demonstratives',zh:'指示词',es:'Demostrativos'},
    hint:{jp:'「これ・それ・あれ」の近称/中称/遠称の区別。2段階か3段階かを設計します。',en:'Proximal / medial / distal distinctions like "this/that/yonder". Design a 2- or 3-way system.',zh:'"这/那/那"的近/中/远称区分。设计二分或三分系统。',es:'Distinciones cercano/medio/lejano como "este/ese/aquel". Diseña un sistema de 2 o 3 niveles.'}},
  {id:'nouns',num:'06',icon:''+icon('box')+'',
    title:{jp:'名詞の変化',en:'Noun Inflection',zh:'名词变化',es:'Flexión nominal'},
    hint:{jp:'性（男性/女性/中性）、数（単数/複数）、格変化（主格/対格/属格…）を決定します。',en:'Decide gender (M/F/N), number (sg/pl), and case (nominative/accusative/genitive...).',zh:'决定性（阳/阴/中）、数（单/复）、格变化（主格/宾格/属格……）。',es:'Decide género (M/F/N), número (sg/pl) y caso (nominativo/acusativo/genitivo...).'}},
  {id:'basicverbs',num:'07',icon:''+icon('bolt')+'',
    title:{jp:'基本動詞',en:'Core Verbs',zh:'基本动词',es:'Verbos básicos'},
    hint:{jp:'「〜だ/ある」「〜する」「〜いく/くる」「〜食べる」「〜見る」など、最重要動詞の語形を登録します。',en:'Register top-priority verbs: "be", "do", "go/come", "eat", "see".',zh:'登记最重要的动词："是/有""做""去/来""吃""看"。',es:'Registra los verbos prioritarios: "ser", "hacer", "ir/venir", "comer", "ver".'}},
  {id:'tense',num:'08',icon:''+icon('stopwatch')+'',
    title:{jp:'時制',en:'Tense',zh:'时态',es:'Tiempo verbal'},
    hint:{jp:'過去・現在・未来の表現法。接辞か助動詞か、アスペクト（完了/未完了）も含めて整理します。',en:'Past/present/future expression. Consider affix vs. auxiliary, and aspect (perfective/imperfective).',zh:'过去、现在、未来的表达方式。考虑词缀或助动词，以及体（完成/未完成）。',es:'Expresión de pasado/presente/futuro. Considera afijos vs. auxiliares y aspecto (perfectivo/imperfectivo).'}},
  {id:'negation',num:'09',icon:''+icon('ban')+'',
    title:{jp:'否定',en:'Negation',zh:'否定',es:'Negación'},
    hint:{jp:'「〜ではない」「〜しない」の否定形。否定辞の位置（前置/後置/接辞）を決めましょう。',en:'Negative forms ("is not", "does not"). Decide negator position (pre/post/affix).',zh:'"不是""不做"的否定形式。决定否定词位置（前/后/词缀）。',es:'Formas negativas ("no es", "no hace"). Decide la posición del negador (pre/post/afijo).'}},
  {id:'modals',num:'10',icon:''+icon('chat')+'',
    title:{jp:'助動詞',en:'Modals',zh:'助动词',es:'Modales'},
    hint:{jp:'「〜できる」「〜しなければ」「〜したい」などの法助動詞。独立語か接辞かを設計します。',en:'Modal auxiliaries: "can", "must", "want to". Design as separate words or affixes.',zh:'"能""必须""想要"等法助动词。设计为独立词或词缀。',es:'Auxiliares modales: "poder", "deber", "querer". Diseña como palabras o afijos.'}},
  {id:'questions',num:'11',icon:''+icon('help')+'',
    title:{jp:'疑問詞',en:'Question Words',zh:'疑问词',es:'Interrogativos'},
    hint:{jp:'「誰・何・どこ・いつ・なぜ・どのように」の疑問詞と、Yes/No疑問文の作り方を定義します。',en:'Define "who/what/where/when/why/how" and how yes/no questions are formed.',zh:'定义"谁/什么/哪里/何时/为何/如何"和是非疑问句的构成。',es:'Define "quién/qué/dónde/cuándo/por qué/cómo" y cómo se forman las preguntas sí/no.'}},
  {id:'conjunctions',num:'12',icon:''+icon('link')+'',
    title:{jp:'接続詞',en:'Conjunctions',zh:'连词',es:'Conjunciones'},
    hint:{jp:'「〜と〜」「〜か〜」「〜けれど」「〜から」など文や節をつなぐ語を整備します。',en:'Words that link clauses: "and", "or", "but", "because".',zh:'连接句子或从句的词："和""或""但是""因为"。',es:'Palabras que enlazan cláusulas: "y", "o", "pero", "porque".'}},
  {id:'adpositions',num:'13',icon:''+icon('pin')+'',
    title:{jp:'前置詞・後置詞',en:'Adpositions',zh:'介词与后置词',es:'Adposiciones'},
    hint:{jp:'「〜に」「〜で」「〜から」などの場所・方向・手段を表す語。SOV言語なら後置詞が自然です。',en:'Words marking location/direction/means ("in", "at", "from"). SOV languages usually prefer postpositions.',zh:'标记位置/方向/手段的词（"在""在……里""从"）。SOV语言通常使用后置词。',es:'Palabras que marcan lugar/dirección/medio ("en", "a", "desde"). Las lenguas SOV prefieren posposiciones.'}},
  {id:'wordorder',num:'14',icon:''+icon('corpus')+'',
    title:{jp:'語順',en:'Word Order',zh:'语序',es:'Orden de palabras'},
    hint:{jp:'主語・動詞・目的語の基本語順（SOV/SVO等）と、修飾語の位置を確定させましょう。',en:'Fix the basic order of S/V/O (SOV, SVO, etc.) and the placement of modifiers.',zh:'确定主语、动词、宾语的基本语序（SOV/SVO等）和修饰语的位置。',es:'Fija el orden básico de S/V/O (SOV, SVO, etc.) y la posición de los modificadores.'}},
  {id:'cases',num:'15',icon:''+icon('cap')+'',
    title:{jp:'格変化',en:'Case Inflection',zh:'格变化',es:'Declinación'},
    hint:{jp:'格変化がある場合、各格のルールを記述します。規則変化と不規則変化も整理しましょう。',en:'If the language has cases, describe each. Also catalog regular vs. irregular inflection.',zh:'若存在格变化，描述各格的规则。同时整理规则与不规则变化。',es:'Si hay casos, describe cada uno. Cataloga inflexión regular e irregular.'}},
];
function buildGrEd(){
  const g=S.grammar||{};
  if(!g.chapters)g.chapters={};
  const cid=_grChap||'greet';
  const ch=GR_STEPS.find(c=>c.id===cid)||GR_STEPS[0];
  const L=_lang||'jp';
  const getTitle=c=>c.title[L]||c.title.jp;
  const getHint=c=>c.hint[L]||c.hint.jp;
  const nav='<div class="gr-chapnav">'+GR_STEPS.map(c=>{
    const hasCnt=!!(g.chapters[c.id]&&g.chapters[c.id].trim());
    return `<button class="gr-chapbtn${cid===c.id?' act':''}" onclick="setGrChap('${c.id}')" title="${getTitle(c)}"><span class="gr-ch-n">${c.num}</span><span>${c.icon}${hasCnt?icon('check'):''}</span></button>`;
  }).join('')+'</div>';
  const stepLabel=(L==='en'?`STEP ${ch.num} / 15`:L==='zh'?`第 ${ch.num} 步 / 15`:L==='es'?`PASO ${ch.num} / 15`:`STEP ${ch.num} / 15`);
  const head=`<div class="gr-page-head"><span style="font-size:1.5rem">${ch.icon}</span><div><div class="gr-ch-num">${stepLabel}</div><div class="gr-ch-title">${getTitle(ch)}</div></div></div>`;
  const hintLabel=t('buildHint');
  const hint=`<div class="card" style="background:var(--purd);border-color:var(--purb);margin-bottom:14px"><div style="font-size:.62rem;font-weight:700;color:var(--pur);letter-spacing:.1em;margin-bottom:5px">${icon('bulb')} ${hintLabel}</div><div style="font-size:.76rem;color:var(--txs);line-height:1.7">${getHint(ch)}</div></div>`;
  const ta=`<div class="field-block"><label class="fl">${icon('book')} ${getTitle(ch)} — ${t('grammarRuleLabel')}</label><textarea class="inp inp-ta gr-ta" placeholder="${t('grammarRulePh')}" oninput="setGrNotes('${cid}',this.value)">${esc(g.chapters[cid]||'')}</textarea></div>`;
  let footer='<div style="display:flex;gap:8px;margin-top:8px">';
  const idx=GR_STEPS.findIndex(c=>c.id===cid);
  if(idx>0)footer+=`<button class="btn btn-gh" onclick="setGrChap('${GR_STEPS[idx-1].id}')">${icon('arrL')} ${t('prevChap')}</button>`;
  footer+=`<button class="btn btn-p" onclick="schSave();showToast(t('saved'),'success')">${t('save')}</button>`;
  if(idx<GR_STEPS.length-1)footer+=`<button class="btn btn-gh" style="margin-left:auto" onclick="setGrChap('${GR_STEPS[idx+1].id}')">${t('nextChap')} ${icon('arrR')}</button>`;
  footer+='</div>';
  return `<div class="gr-book">${nav}<div class="gr-page">${head}${hint}${ta}${footer}</div></div>`;
}
function setGr(k,v,btn){if(!S.grammar)S.grammar={};S.grammar[k]=v;btn.closest('.field-block').querySelectorAll('.btn').forEach(b=>b.classList.remove('btn-p'));btn.classList.add('btn-p');schSave();}
function togGrCase(c,btn){if(!S.grammar.cases)S.grammar.cases=[];const i=S.grammar.cases.indexOf(c);if(i>=0)S.grammar.cases.splice(i,1);else S.grammar.cases.push(c);btn.classList.toggle('btn-p',S.grammar.cases.includes(c));schSave();}
function setGrChap(id){_grChap=id;const bd=document.getElementById('ed-body');if(bd)bd.innerHTML=buildGrEd();}
function setGrNotes(cid,val){if(!S.grammar.chapters)S.grammar.chapters={};S.grammar.chapters[cid]=val;schSave();}

// ---- Corpus Editor ----
function buildCpEd(){return`<div style="margin-bottom:16px"><div style="font-family:'Cinzel',serif;font-size:1.1rem;font-weight:700;margin-bottom:4px">${icon('corpus')} ${t('corpusTitle')}</div><div style="font-size:.74rem;color:var(--txs)">${t('corpusDesc')}</div></div>
<div class="tabbar"><button class="tabbtn active" onclick="swTab(this,'ctab-add')">${t('add')}</button><button class="tabbtn" onclick="swTab(this,'ctab-list');document.getElementById('ctab-list').innerHTML=S.corpus.map((c,i)=>ccHtml(c,i)).join('')">${t('listTab')} (${S.corpus.length})</button></div>
<div id="ctab-add" class="tabpn active">
<div class="field-block"><label class="fl">${t('conlangSentence')}</label><input type="text" class="inp" id="cp-cl" placeholder="Aelindra vael korum" spellcheck="false"></div>
<div class="field-block"><label class="fl">${t('readingOptional')}</label><input type="text" class="inp" id="cp-rd" placeholder="" spellcheck="false"></div>
<div class="field-block"><label class="fl">${t('translationLabel')}</label><input type="text" class="inp" id="cp-jp" placeholder=""></div>
<button class="btn btn-p btn-bl" onclick="addCorpus()">${t('addCorpusBtn')}</button>
</div>
<div id="ctab-list" class="tabpn">${S.corpus.map((c,i)=>ccHtml(c,i)).join('')}</div>`;}
function ccHtml(c,i){return`<div class="cc"><div class="ccl">${esc(c.cl||c.conlang||'')}</div>${c.read||c.kana?'<div class="cck">'+esc(c.read||c.kana)+'</div>':''}<div class="ccj">${esc(c.jp||c.meaning||'')}</div><div style="display:flex;gap:6px;margin-top:8px"><button class="btn btn-xs" data-idx="${i}" onclick="spkC(this)" aria-label="${t('speakAria')}">${icon('speaker')}</button><button class="btn btn-xs btn-r" onclick="delCorpus(${i})" aria-label="${t('delete')}">${icon('x')} ${t('delete')}</button></div></div>`;}
function addCorpus(){const cl=document.getElementById('cp-cl')?.value.trim(),jp=document.getElementById('cp-jp')?.value.trim();if(!cl||!jp){showToast(t('corpusRequired'),'error');return;}S.corpus.push({cl,conlang:cl,read:document.getElementById('cp-rd')?.value.trim()||'',jp});schSave();document.getElementById('cp-cl').value='';document.getElementById('cp-rd').value='';document.getElementById('cp-jp').value='';const lp=document.getElementById('ctab-list');if(lp)lp.innerHTML=S.corpus.map((c,i)=>ccHtml(c,i)).join('');showToast(t('corpusAdded'),'success');}
function delCorpus(i){S.corpus.splice(i,1);schSave();const lp=document.getElementById('ctab-list');if(lp)lp.innerHTML=S.corpus.map((c,i)=>ccHtml(c,i)).join('');}

// ---- Daily Editor ----
const DAILY_PROMPTS=[
  {scene:'夜明け前、誰かが旅立つ朝',hint:'別れ・出発にまつわる言葉が必要になるかも。見送る側の感情は？'},
  {scene:'市場で初めて見る果物を手に取った瞬間',hint:'感嘆・色・形・匂いを表す語。交易語はある？'},
  {scene:'古い神殿の壁に刻まれた碑文',hint:'神聖語・格式語・過去形。この言語の文字体系は？'},
  {scene:'嵐の前の静けさ、村人が空を見上げる',hint:'天候・予兆・集団を表す語。自然現象の擬音は？'},
  {scene:'子どもが初めて魔法を使えた瞬間の叫び',hint:'感嘆詞・興奮。この言語に感情爆発の表現はある？'},
  {scene:'旅人が焚き火を囲んで名前を名乗り合う',hint:'自己紹介・所属・出身地の語。名前の構造は？'},
  {scene:'戦士が戦場に向かう前に呟く言葉',hint:'覚悟・祈り・誓い。簡潔で力強い表現を作ろう'},
  {scene:'森の奥で聞いたことのない鳥の声',hint:'音の擬音語・比喩・発見の感情。音韻が活きる場面'},
  {scene:'老人が孫に昔話を語り始める',hint:'昔話の語り口・時制・世代を示す語'},
  {scene:'二人が初めて心を通わせた夜',hint:'感情・距離感・やわらかい言葉。この言語の敬語は？'},
  {scene:'商人が値段を吊り上げようとする場面',hint:'交渉・数・価値判断の語。語気を強める副詞は？'},
  {scene:'王が民に向けて勅令を読み上げる',hint:'権威語・命令形・公式文体。文語と口語の差は？'},
  {scene:'死者を弔う儀式で唱えるひとこと',hint:'死後の概念・魂・送り出す言葉。宗教語彙は？'},
  {scene:'敵だったはずの相手に助けられた後',hint:'感謝・不信・複雑な感情。この言語に皮肉はある？'},
  {scene:'地図にない場所を発見した探検家',hint:'方向・地形・命名する行為。名詞の造語法は？'},
  {scene:'子守唄を歌う親の声',hint:'やさしい音韻・反復・安心感。この言語のリズムは？'},
  {scene:'祭りの夜、群衆が一斉に叫ぶ言葉',hint:'集合的な感情表現・掛け声・リズム'},
  {scene:'裏切り者が最後に残した手紙',hint:'告白・弁明・後悔。この言語の一人称は何種類ある？'},
  {scene:'山頂で一人、遠くの故郷を眺める',hint:'郷愁・遠近・風景描写。感傷的な語彙はある？'},
  {scene:'初雪が降った朝、子どもたちが外へ飛び出す',hint:'季節・無邪気な喜び・動きを表す動詞'},
  {scene:'見知らぬ言語で書かれた手紙を受け取る',hint:'困惑・期待・翻訳行為。この世界の言語観は？'},
  {scene:'空を飛ぶ生き物に初めて乗った瞬間',hint:'高さ・速度・恐怖と興奮の混在'},
  {scene:'師匠が弟子に最後の教えを授ける場面',hint:'知恵・継承・比喩的な表現。格言の形は？'},
  {scene:'廃墟となった都市を歩く者の独り言',hint:'喪失・過去の痕跡・現在との対比'},
  {scene:'海の底にある古代都市の碑',hint:'水・沈黙・永遠性。この言語に複数形はある？'},
  {scene:'闇の中で手探りに仲間を探す',hint:'暗闇・感覚・信頼。呼びかけの語はどんな形？'},
  {scene:'占い師が未来を告げる言葉',hint:'予言・曖昧さ・時制。この言語に推量形はある？'},
  {scene:'異なる種族が初めて言葉を交わす',hint:'接触・誤解・共通語の発生。どう歩み寄る？'},
  {scene:'英雄が名前を捨てる瞬間',hint:'アイデンティティ・否定・変容。否定形の作り方は？'},
  {scene:'世界の始まりを語る神話の冒頭',hint:'起源・無・創造。この言語で「無」はどう表す？'},
];
let _todayScene=null;

// Daily writing prompt — picked from the built-in DAILY_PROMPTS list.
// Default: deterministic by date (same prompt all day). forceNew: random different prompt.
function generateScene(forceNew=false){
  const today=new Date().toDateString();
  if(!forceNew&&_todayScene&&_todayScene.date===today)return _todayScene;
  if(!forceNew){
    try{const stored=JSON.parse(localStorage.getItem('lingua_scene')||'null');
    if(stored&&stored.date===today){_todayScene=stored;updateDailySent();return _todayScene;}}catch(e){}
  }
  const dateIdx=(new Date().getFullYear()*366+new Date().getMonth()*31+new Date().getDate())%DAILY_PROMPTS.length;
  let idx=dateIdx;
  if(forceNew&&DAILY_PROMPTS.length>1){
    const cur=_todayScene?_todayScene.scene:null;
    do{idx=Math.floor(Math.random()*DAILY_PROMPTS.length);}while(DAILY_PROMPTS[idx].scene===cur);
  }
  const p=DAILY_PROMPTS[idx];
  _todayScene={scene:p.scene,hint:p.hint,date:today};
  try{localStorage.setItem('lingua_scene',JSON.stringify(_todayScene));}catch(e){}
  updateDailySent();
  return _todayScene;
}

function getTodayPrompt(){
  const d=new Date();const idx=(d.getFullYear()*366+d.getMonth()*31+d.getDate())%DAILY_PROMPTS.length;
  return DAILY_PROMPTS[idx];
}
function buildDlEd(){
  const p=_todayScene||getTodayPrompt();
  return`<div style="margin-bottom:16px">
<div style="font-family:'Cinzel',serif;font-size:1.1rem;font-weight:700;margin-bottom:4px">${icon('calendar')} <span data-i18n="todaySentence">${t('todaySentence')}</span></div>
<div style="font-size:.74rem;color:var(--txs)" data-i18n="sceneHint">${t('sceneHint')}</div>
</div>
<div style="padding:12px 16px;border:1px solid var(--acb);border-radius:12px;background:var(--acd);margin-bottom:8px">
<div style="font-size:.68rem;color:var(--acc);font-weight:600;margin-bottom:4px" data-i18n="sceneLabel">${t('sceneLabel')}</div>
<div id="dl-scene-text" style="font-size:.9rem;color:var(--tx);font-weight:600;margin-bottom:6px">${p.scene}</div>
<div id="dl-scene-hint" style="font-size:.75rem;color:var(--txs);line-height:1.6">${p.hint}</div>
</div>
<button class="btn btn-sm btn-gh" style="margin-bottom:14px" onclick="generateScene(true);{const b=document.getElementById('dl-scene-text');const h=document.getElementById('dl-scene-hint');if(b&&_todayScene)b.textContent=_todayScene.scene;if(h&&_todayScene)h.textContent=_todayScene.hint;}" data-i18n="sceneNewBtn">${t('sceneNewBtn')}</button>
<div class="field-block"><label class="fl" data-i18n="writeSentence">${t('writeSentence')}</label><textarea class="inp inp-ta" id="dl-inp" data-i18n-placeholder="scenePlaceholder" placeholder="${t('scenePlaceholder')}" style="min-height:80px" oninput="chkDaily()"></textarea></div>
<div class="field-block"><label class="fl" data-i18n="sceneJpLabel">${t('sceneJpLabel')}</label><input class="inp" id="dl-jp" data-i18n-placeholder="sceneJpPh" placeholder="${t('sceneJpPh')}"></div>
<div id="dl-fb" style="margin-bottom:8px"></div>
<button class="btn btn-p btn-bl" onclick="subDaily()" data-i18n="save">${t('save')}</button>
<div id="dl-hist" style="margin-top:16px">${(S.sentences||[]).length>0?`<div style="font-size:.72rem;color:var(--txs);margin-bottom:8px">${t('sceneSavedCount')} (${S.sentences.length})</div>`+S.sentences.slice(-5).reverse().map(s=>`<div style="padding:8px 12px;border:1px solid var(--br);border-radius:8px;margin-bottom:6px;font-size:.82rem;color:var(--txs)">${esc(s)}</div>`).join(''):''}
</div>`;
}
function subDaily(){const i=document.getElementById('dl-inp');if(!i?.value.trim()){showToast(t('dailyRequired'),'error');return;}if(!S.sentences)S.sentences=[];S.sentences.push(i.value.trim());S.done.sentence=true;schSave();showToast(t('dailySaved'),'success');i.value='';updateDash();updateDailySent();}
function chkDaily(){const i=document.getElementById('dl-inp'),fb=document.getElementById('dl-fb');if(!i||!fb)return;const ws=i.value.toLowerCase().split(/\s+/).filter(Boolean),iss=ws.filter(w=>w.length>1&&!S.dictionary.find(d=>(d.word||d.conlang||'').toLowerCase()===w));if(!iss.length)fb.innerHTML=`<div style="padding:10px 14px;border:1px solid var(--okb);border-radius:8px;background:var(--okd);font-size:.78rem;color:var(--ok)">${icon('check')} ${t('allWordsInDict')}</div>`;else fb.innerHTML=`<div style="padding:10px 14px;border:1px solid var(--rsb);border-radius:8px;background:var(--rsd);font-size:.78rem;color:var(--rs)">${icon('warn')} ${t('unregisteredWords')}: ${iss.map(w=>'"'+w+'"').join('、')}</div>`;}

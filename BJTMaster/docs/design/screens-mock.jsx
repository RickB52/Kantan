// Mock test, result, AI sheet, paywall
const MockTestScreen = () => (
  <div className="bjt-screen" style={{ background:'white' }}>
    <div style={{ padding:'10px 16px 8px', background:'white', borderBottom:'1px solid var(--c-g200)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <button className="icon-btn">{Icon.close}</button>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Mock Test #1</div>
        <button style={{ padding:'6px 10px', fontSize: 11, fontWeight: 600, color:'var(--c-g600)', background:'var(--c-g100)', border:0, borderRadius:999 }}>一時停止</button>
      </div>
      {/* section indicator */}
      <div style={{ display:'flex', gap: 6, marginTop: 12 }}>
        {[
          {l:'聴解', sub:'Listening', s:'done'},
          {l:'聴読解', sub:'L+R', s:'on'},
          {l:'読解', sub:'Reading', s:''},
        ].map(s=>(
          <div key={s.l} style={{ flex:1, padding:'8px 6px', borderRadius: 8, background: s.s==='on'?'var(--c-p50)':s.s==='done'?'var(--c-suc50)':'var(--c-g50)', border:'1px solid '+(s.s==='on'?'var(--c-p500)':s.s==='done'?'var(--c-suc500)':'var(--c-g200)'), textAlign:'center' }}>
            <div className="jp" style={{ fontSize: 12, fontWeight: 600, color: s.s==='on'?'var(--c-p700)':s.s==='done'?'var(--c-suc600)':'var(--c-g500)' }}>{s.l}{s.s==='done' && ' ✓'}</div>
            <div style={{ fontSize: 9, color:'var(--c-g500)', marginTop: 1 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>

    {/* timer + counter */}
    <div style={{ padding: '14px 16px 0', display:'flex', alignItems:'center', gap: 12 }}>
      <div style={{ display:'flex', alignItems:'center', gap: 8, padding:'10px 14px', background:'#0F172A', color:'white', borderRadius: 10, fontFamily:'ui-monospace, monospace', fontWeight: 700, fontSize: 16, letterSpacing:'.05em' }}>
        ⏱ 01:23:45
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize: 11, color:'var(--c-g500)' }}>Question</div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>15 <span style={{ color:'var(--c-g400)', fontWeight: 500 }}>/ 80</span></div>
      </div>
    </div>
    <div style={{ padding:'8px 16px 0' }}><Progress pct={18.75}/></div>

    <div className="bjt-scroll" style={{ padding:'14px 16px' }}>
      <div className="jp" style={{ fontSize: 13, color:'var(--c-g600)', lineHeight: 1.7 }}>
        次の文の（　）に入る最も適切なものを選んでください。
      </div>
      <div className="jp" style={{ marginTop: 12, padding: 14, background:'var(--c-g50)', borderRadius: 12, fontSize: 16, lineHeight: 2, color:'var(--c-g900)', border:'1px solid var(--c-g200)' }}>
        「<ruby>今回<rt>こんかい</rt></ruby>の<ruby>件<rt>けん</rt></ruby>は<ruby>上司<rt>じょうし</rt></ruby>の（　　）を<ruby>得<rt>え</rt></ruby>てから<ruby>進<rt>すす</rt></ruby>めます。」
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap: 10, marginTop: 16 }}>
        {[
          {l:'A', t:'了承', s:''},
          {l:'B', t:'許可', s:'selected'},
          {l:'C', t:'承認', s:''},
          {l:'D', t:'賛成', s:''},
        ].map(c=>(
          <button key={c.l} className={`bjt-choice ${c.s}`}>
            <div className="letter">{c.l}</div>
            <span className="jp" style={{ fontSize: 16, fontWeight: 500 }}>{c.t}</span>
          </button>
        ))}
      </div>

      {/* question palette */}
      <div style={{ marginTop: 18, padding: 12, background:'var(--c-g50)', borderRadius: 12, border:'1px solid var(--c-g200)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color:'var(--c-g500)', textTransform:'uppercase', letterSpacing:'.06em' }}>このセクションの進捗</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(10,1fr)', gap: 4, marginTop: 8 }}>
          {Array.from({length: 30}).map((_,i)=>{
            const cur = i===14;
            const done = i<14;
            const flag = i===8 || i===11;
            return <div key={i} style={{ aspectRatio:'1/1', borderRadius: 5, background: cur?'var(--c-p600)': done?'var(--c-p100)':'white', color: cur?'white':done?'var(--c-p700)':'var(--c-g500)', border:'1px solid '+(cur?'var(--c-p600)':done?'var(--c-p200)':'var(--c-g200)'), display:'flex', alignItems:'center', justifyContent:'center', fontSize: 10, fontWeight: 600, position:'relative' }}>
              {i+1}
              {flag && <div style={{ position:'absolute', top:-3, right:-3, width:8, height:8, borderRadius:999, background:'var(--c-warn500)' }}/>}
            </div>;
          })}
        </div>
      </div>
    </div>

    <div style={{ padding: 14, background:'white', borderTop:'1px solid var(--c-g200)', display:'flex', gap: 10 }}>
      <button className="bjt-btn" style={{ background:'var(--c-g100)', color:'var(--c-g700)', flex:1 }}>◀ 前</button>
      <button className="bjt-btn primary" style={{ flex:2 }}>次の問題 ▶</button>
    </div>
  </div>
);

const MockResultScreen = () => (
  <div className="bjt-screen">
    <div className="bjt-appbar">
      <button className="icon-btn">{Icon.close}</button>
      <h1>テスト結果</h1>
      <button className="icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8M16 6l-4-4-4 4M12 2v14"/></svg></button>
    </div>
    <div className="bjt-scroll" style={{ padding:'16px 16px 24px' }}>
      {/* hero */}
      <div style={{ borderRadius: 20, padding: 22, color:'white', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#1E3A8A 0%,#3B82F6 60%,#7C3AED 110%)' }}>
        <div style={{ position:'absolute', top:-30, right:-30, width:160, height:160, borderRadius:999, background:'rgba(255,255,255,.08)' }}/>
        <div style={{ fontSize: 12, opacity:.8 }}>🎉 お疲れ様でした</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap: 10, marginTop: 6 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1, letterSpacing:'-.02em' }}>580</div>
          <div style={{ paddingBottom: 10, fontSize: 14, opacity:.7 }}>/ 800</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 8, marginTop: 10 }}>
          <span style={{ background:'rgba(124,58,237,.4)', border:'1px solid rgba(255,255,255,.25)', padding:'4px 12px', borderRadius:999, fontSize: 12, fontWeight: 700 }}>J2 相当</span>
          <span style={{ fontSize: 12, opacity:.85 }}>+24 điểm so với lần trước</span>
        </div>
      </div>

      {/* section breakdown */}
      <div className="bjt-section-h" style={{ marginTop: 22 }}>セクション別スコア</div>
      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        {[
          {l:'聴解', sub:'Listening', v:185, max:240, pct:78},
          {l:'聴読解', sub:'L+R combined', v:195, max:240, pct:82},
          {l:'読解', sub:'Reading', v:200, max:240, pct:84},
        ].map(s=>(
          <div key={s.l} className="bjt-card" style={{ padding: 12 }}>
            <div style={{ display:'flex', alignItems:'baseline', gap: 8 }}>
              <span className="jp" style={{ fontSize:14, fontWeight: 700 }}>{s.l}</span>
              <span style={{ fontSize: 11, color:'var(--c-g500)' }}>{s.sub}</span>
              <span style={{ marginLeft:'auto', fontSize: 18, fontWeight: 700 }}>{s.v}<span style={{ fontSize: 11, color:'var(--c-g400)', fontWeight: 500 }}> / {s.max}</span></span>
            </div>
            <div style={{ marginTop: 8, display:'flex', alignItems:'center', gap: 8 }}>
              <div style={{ flex:1 }}><Progress pct={s.pct} variant={s.pct>=80?'success':''}/></div>
              <div style={{ fontSize: 11, color: s.pct>=80?'var(--c-suc600)':'var(--c-g600)', fontWeight: 600 }}>{s.pct}%</div>
            </div>
          </div>
        ))}
      </div>

      {/* weak topics */}
      <div className="bjt-section-h" style={{ marginTop: 20 }}>弱点トップ3</div>
      <div className="bjt-card" style={{ padding: 4 }}>
        {[
          {n:1, t:'謙譲語の使い分け', sub:'Khiêm nhường ngữ', v:58},
          {n:2, t:'財務語彙', sub:'Vocab về tài chính', v:62},
          {n:3, t:'総合聴解 (会議)', sub:'Listening — meetings', v:70},
        ].map((w,i)=>(
          <div key={w.n} style={{ display:'flex', alignItems:'center', gap: 10, padding:'10px 12px', borderTop: i===0?0:'1px solid var(--c-g100)' }}>
            <div style={{ width: 26, height: 26, borderRadius: 999, background:'var(--c-err50)', color:'var(--c-err600)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight: 700, fontSize: 12 }}>{w.n}</div>
            <div style={{ flex:1, minWidth: 0 }}>
              <div className="jp" style={{ fontSize: 13, fontWeight: 600 }}>{w.t}</div>
              <div style={{ fontSize: 11, color:'var(--c-g500)' }}>{w.sub}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color:'var(--c-err600)' }}>{w.v}%</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, display:'flex', flexDirection:'column', gap: 10 }}>
        <button className="bjt-btn lg" style={{ background:'linear-gradient(135deg,#7C3AED,#5B21B6)', color:'white' }}>🤖 Xem AI phân tích →</button>
        <button className="bjt-btn lg secondary">答え合わせをする →</button>
      </div>
    </div>
  </div>
);

const AISheetScreen = () => (
  <div className="bjt-screen" style={{ background:'rgba(0,0,0,.4)' }}>
    {/* dimmed bg preview */}
    <div style={{ position:'absolute', inset: 0, background:'var(--c-g50)', opacity:.35, pointerEvents:'none' }}>
      <div className="bjt-appbar" style={{ opacity:.6 }}>
        <button className="icon-btn">{Icon.back}</button><h1 className="jp">敬語練習</h1><div style={{width:36}}/>
      </div>
    </div>

    {/* sheet */}
    <div style={{ marginTop:'auto', background:'white', borderTopLeftRadius:24, borderTopRightRadius:24, boxShadow:'0 -20px 40px rgba(0,0,0,.18)', position:'relative', maxHeight:'82%', display:'flex', flexDirection:'column' }}>
      <div style={{ display:'flex', justifyContent:'center', paddingTop: 10 }}>
        <div style={{ width:36, height:4, borderRadius:999, background:'var(--c-g300)' }}/>
      </div>

      <div style={{ padding:'14px 20px 8px', display:'flex', alignItems:'center', gap: 10 }}>
        <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#7C3AED,#5B21B6)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 18 }}>🤖</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>解説 · AI Tutor</div>
          <div style={{ fontSize: 11, color:'var(--c-g500)' }}>Phân tích chi tiết câu hỏi này</div>
        </div>
        <button className="icon-btn">{Icon.close}</button>
      </div>

      <div className="bjt-scroll" style={{ padding:'8px 20px 16px' }}>
        {/* answer */}
        <div style={{ display:'flex', alignItems:'center', gap: 8, padding: 12, background:'var(--c-suc50)', border:'1px solid var(--c-suc400)', borderRadius: 12 }}>
          <div style={{ width: 26, height:26, borderRadius:999, background:'var(--c-suc500)', color:'white', display:'flex', alignItems:'center', justifyContent:'center' }}><div style={{width:14,height:14}}>{Icon.check}</div></div>
          <div style={{ fontSize: 12, color:'var(--c-suc600)', fontWeight: 600 }}>正解</div>
          <div className="jp" style={{ fontSize: 14, fontWeight: 600, color:'var(--c-g900)' }}>B. いらっしゃって</div>
        </div>

        {/* explanation */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color:'var(--c-p700)', letterSpacing:'.06em', textTransform:'uppercase' }}>解説</div>
          <div className="jp" style={{ fontSize: 14, lineHeight: 1.8, color:'var(--c-g800)', marginTop: 4 }}>
            「<b>いらっしゃる</b>」は「いる・行く・来る」の<span style={{ background:'#FEF3C7', padding:'1px 4px', borderRadius:3 }}>尊敬語</span>です。
            上司の行動を高めて表現する場合に使います。
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color:'var(--c-err600)', letterSpacing:'.06em', textTransform:'uppercase' }}>なぜAは間違い？</div>
          <div className="jp" style={{ fontSize: 14, lineHeight: 1.8, color:'var(--c-g800)', marginTop: 4 }}>
            「<b>おられる</b>」は<span style={{ background:'#FEE2E2', padding:'1px 4px', borderRadius:3 }}>関西方言</span>由来で、
            標準語のビジネス場面では不自然と感じる人が多いです。
          </div>
        </div>

        {/* related */}
        <div style={{ marginTop: 16, padding: 12, background:'var(--c-g50)', borderRadius: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color:'var(--c-g600)' }}>📌 関連</div>
          <div style={{ marginTop: 6, fontSize: 13, fontWeight: 500 }}>敬語の指針 · 文化庁</div>
          <div style={{ fontSize: 11, color:'var(--c-g500)' }}>p.12 — 尊敬語の基本</div>
        </div>
      </div>

      <div style={{ padding: 14, borderTop:'1px solid var(--c-g100)', display:'flex', gap: 10 }}>
        <button className="bjt-btn" style={{ background:'var(--c-g100)', color:'var(--c-g700)', flex:1 }}>
          <div style={{width:14,height:14}}>{Icon.bookmark}</div> 保存
        </button>
        <button className="bjt-btn primary" style={{ flex:2 }}>次の問題 →</button>
      </div>
    </div>
  </div>
);

const PaywallScreen = () => (
  <div className="bjt-screen" style={{ background:'linear-gradient(180deg,#0F1A47 0%, #1E3A8A 60%, #1E40AF 100%)', color:'white' }}>
    <div style={{ padding:'12px 16px', display:'flex', justifyContent:'flex-end' }}>
      <button style={{ width:36, height:36, borderRadius:999, background:'rgba(255,255,255,.12)', color:'white', border:0 }}>
        <div style={{width:18,height:18, margin:'auto'}}>{Icon.close}</div>
      </button>
    </div>
    <div className="bjt-scroll" style={{ padding:'8px 20px 16px' }}>
      <div style={{ textAlign:'center', marginTop: 12 }}>
        <div style={{ display:'inline-flex', padding:'6px 12px', borderRadius:999, background:'rgba(245,158,11,.2)', border:'1px solid rgba(245,158,11,.5)', color:'#FBBF24', fontSize: 11, fontWeight: 700, letterSpacing:'.08em', textTransform:'uppercase' }}>⭐ Premium</div>
        <div style={{ fontSize: 26, fontWeight: 700, marginTop: 14, letterSpacing:'-.01em' }}>Mở khoá toàn bộ<br/>BJT Master</div>
        <div style={{ marginTop: 8, fontSize: 13, opacity:.8 }}>Bạn đã đạt giới hạn 5 câu/ngày của bản miễn phí</div>
      </div>

      <div style={{ marginTop: 22, padding: 18, background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)', borderRadius: 16, backdropFilter:'blur(10px)' }}>
        {[
          ['無制限', 'Luyện tập không giới hạn'],
          ['Mock', 'Toàn bộ mock test (8 đề)'],
          ['AI', 'AI giải thích · không giới hạn'],
          ['弱点', 'Phân tích điểm yếu chi tiết'],
          ['オフ', 'Học offline'],
        ].map(([k,v])=>(
          <div key={k} style={{ display:'flex', alignItems:'center', gap: 12, padding:'8px 0' }}>
            <div style={{ width:26, height:26, borderRadius:999, background:'rgba(34,197,94,.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#4ADE80' }}>
              <div style={{width:14,height:14}}>{Icon.check}</div>
            </div>
            <div style={{ fontSize: 14, flex:1 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, display:'flex', flexDirection:'column', gap: 10 }}>
        <div style={{ position:'relative', padding: 16, borderRadius: 14, border:'2px solid #F59E0B', background:'rgba(245,158,11,.1)' }}>
          <div style={{ position:'absolute', top:-10, right: 14, padding:'3px 10px', borderRadius:999, background:'#F59E0B', color:'#451A03', fontSize: 10, fontWeight: 700, letterSpacing:'.05em' }}>BEST VALUE · 42% OFF</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>年間プラン · Yearly</div>
              <div style={{ fontSize: 11, opacity:.7, marginTop: 2 }}>¥817 / tháng · tính theo năm</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>¥9,800</div>
              <div style={{ fontSize: 11, opacity:.7, textDecoration:'line-through' }}>¥16,800</div>
            </div>
          </div>
        </div>

        <div style={{ padding: 16, borderRadius: 14, border:'1px solid rgba(255,255,255,.18)', background:'rgba(255,255,255,.04)' }}>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>月額プラン · Monthly</div>
              <div style={{ fontSize: 11, opacity:.7, marginTop: 2 }}>Linh hoạt huỷ bất kỳ lúc nào</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>¥1,400<span style={{ fontSize:11, opacity:.7, fontWeight:500 }}>/tháng</span></div>
          </div>
        </div>
      </div>
    </div>

    <div style={{ padding:'16px 20px 20px' }}>
      <button className="bjt-btn lg" style={{ width:'100%', background:'#F59E0B', color:'#451A03', fontWeight: 700 }}>今すぐ始める →</button>
      <div style={{ textAlign:'center', marginTop: 10, fontSize: 11, opacity:.7 }}>
        Khôi phục mua hàng · Điều khoản · Bảo mật
      </div>
    </div>
  </div>
);

Object.assign(window, { MockTestScreen, MockResultScreen, AISheetScreen, PaywallScreen });

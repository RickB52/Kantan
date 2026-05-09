// Learn screens — Keigo Overview, Keigo Drill, Reading, Vocab Flashcard
const KeigoOverviewScreen = () => (
  <div className="bjt-screen">
    <div className="bjt-appbar">
      <button className="icon-btn">{Icon.back}</button>
      <h1 className="jp">敬語システム</h1>
      <button className="icon-btn">{Icon.bookmark}</button>
    </div>
    <div style={{ display:'flex', padding:'10px 16px 0', background:'white', gap: 6, borderBottom:'1px solid var(--c-g200)' }}>
      {[{l:'概要',on:true},{l:'練習'},{l:'テスト'}].map(t=>(
        <div key={t.l} className="jp" style={{ flex:1, textAlign:'center', padding:'10px 0', fontSize:14, fontWeight: 600, color: t.on?'var(--c-p700)':'var(--c-g500)', borderBottom: t.on?'2px solid var(--c-p600)':'2px solid transparent', marginBottom:-1 }}>{t.l}</div>
      ))}
    </div>
    <div className="bjt-scroll" style={{ padding:'18px 16px 24px' }}>
      <div style={{ fontSize: 11, color:'var(--c-p700)', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase' }}>Module A2 · 4 dạng</div>
      <div className="jp" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>敬語の3種類 + 丁寧語</div>
      <div style={{ fontSize: 13, color:'var(--c-g600)', marginTop: 4, lineHeight: 1.5 }}>
        Hệ thống kính ngữ trong tiếng Nhật doanh nghiệp gồm 4 nhóm. Tap vào từng card để xem chi tiết.
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap: 12, marginTop: 18 }}>
        {[
          { t:'尊敬語', r:'Sonkeigo', d:'Tôn kính ngữ — nâng hành động của đối phương', ex:'いる → いらっしゃる', c:'#DBEAFE', cd:'#1E40AF', pct:62 },
          { t:'謙譲語Ⅰ', r:'Kenjougo I', d:'Khiêm nhường ngữ — hạ hành động của mình', ex:'いる → おる', c:'#FEF3C7', cd:'#92400E', pct:38 },
          { t:'謙譲語Ⅱ', r:'Teichougo', d:'Trang trọng — trình bày với người nghe', ex:'いる → おります', c:'#FCE7F3', cd:'#9D174D', pct:12 },
          { t:'丁寧語', r:'Teineigo', d:'Lịch sự cơ bản — です・ます', ex:'食べる → 食べます', c:'#D1FAE5', cd:'#065F46', pct:88 },
        ].map(k=>(
          <div key={k.t} className="bjt-card" style={{ padding: 14 }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap: 12 }}>
              <div style={{ width:44, height:44, borderRadius:10, background:k.c, color:k.cd, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span className="jp" style={{ fontWeight:700, fontSize:16 }}>{k.t.slice(0,1)}</span>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
                  <span className="jp" style={{ fontSize:16, fontWeight:600 }}>{k.t}</span>
                  <span style={{ fontSize:11, color:'var(--c-g500)' }}>({k.r})</span>
                </div>
                <div style={{ fontSize:12, color:'var(--c-g700)', marginTop: 4, lineHeight:1.5 }}>{k.d}</div>
                <div className="jp" style={{ marginTop: 8, padding:'6px 10px', background:'var(--c-g50)', borderRadius:8, fontSize:13, fontWeight:500, color:'var(--c-g800)', display:'inline-block' }}>{k.ex}</div>
              </div>
              <div style={{ color:'var(--c-g400)', width:14, height:14, marginTop:6 }}>{Icon.chevR}</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap: 8, marginTop: 12 }}>
              <div style={{ flex:1 }}><Progress pct={k.pct}/></div>
              <div style={{ fontSize: 11, color:'var(--c-g500)', fontWeight:500 }}>{k.pct}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ padding: 14, background:'white', borderTop:'1px solid var(--c-g200)' }}>
      <button className="bjt-btn lg primary" style={{ width:'100%' }}>練習を始める →</button>
    </div>
  </div>
);

const KeigoDrillScreen = () => (
  <div className="bjt-screen">
    <div className="bjt-appbar">
      <button className="icon-btn">{Icon.back}</button>
      <h1 className="jp">敬語練習</h1>
      <div style={{ fontSize: 12, color:'var(--c-g500)', fontWeight:500 }}>2/10</div>
    </div>
    <div style={{ padding:'10px 16px', background:'white', borderBottom:'1px solid var(--c-g200)' }}>
      <div style={{ display:'flex', gap: 6, marginBottom: 10, overflowX:'auto' }}>
        {[
          {i:'📞',l:'電話'},{i:'🚪',l:'訪問',on:true},{i:'📧',l:'メール'},{i:'📋',l:'会議'}
        ].map(s=>(
          <div key={s.l} className="jp" style={{ flex:'0 0 auto', padding:'7px 14px', borderRadius:999, background: s.on?'var(--c-p600)':'var(--c-g100)', color: s.on?'white':'var(--c-g700)', fontSize: 12, fontWeight: 600, display:'flex', alignItems:'center', gap:5 }}>
            <span style={{fontSize:14}}>{s.i}</span>{s.l}
          </div>
        ))}
      </div>
      <Progress pct={20}/>
    </div>

    <div className="bjt-scroll" style={{ padding:'18px 16px 16px' }}>
      <div style={{ background:'#F0F4FF', border:'1px solid #C7D2FE', borderRadius: 12, padding: 12, marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight:700, color:'var(--c-navy700)', letterSpacing:'.08em', textTransform:'uppercase' }}>Tình huống</div>
        <div className="jp" style={{ fontSize: 14, fontWeight: 500, marginTop: 4, color:'var(--c-g900)', lineHeight: 1.6 }}>
          上司が外出するとき、来客に説明します。<br/>正しい敬語を選んでください。
        </div>
      </div>

      <div className="jp" style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.8, padding:'0 4px' }}>
        山田部長は今 <span style={{ display:'inline-block', minWidth: 80, textAlign:'center', padding:'2px 10px', borderBottom:'2.5px dashed var(--c-p500)', color:'var(--c-p600)', fontWeight:600 }}>　？　</span> います。
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap: 10, marginTop: 22 }}>
        {[
          {l:'A', t:'おられ', state:''},
          {l:'B', t:'いらっしゃって', state:'selected'},
          {l:'C', t:'おり', state:''},
          {l:'D', t:'います', state:''},
        ].map(c=>(
          <button key={c.l} className={`bjt-choice ${c.state}`}>
            <div className="letter">{c.l}</div>
            <span className="jp" style={{ fontSize: 16, fontWeight: 500 }}>{c.t}</span>
          </button>
        ))}
      </div>
    </div>

    <div style={{ padding: 14, background:'white', borderTop:'1px solid var(--c-g200)', display:'flex', gap: 10 }}>
      <button className="bjt-btn" style={{ background:'var(--c-g100)', color:'var(--c-g700)', width: 56 }}>
        <div style={{width:18,height:18}}>{Icon.bookmark}</div>
      </button>
      <button className="bjt-btn lg primary" style={{ flex:1 }}>確認する</button>
    </div>
  </div>
);

const ReadingScreen = () => (
  <div className="bjt-screen">
    <div className="bjt-appbar">
      <button className="icon-btn">{Icon.back}</button>
      <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
        <h1 className="jp">読解練習</h1>
        <JBadge level="J3"/>
      </div>
      <div style={{ fontSize: 12, color:'var(--c-g500)', fontWeight: 500 }}>3/10</div>
    </div>
    <div style={{ padding: '10px 16px', background:'white', borderBottom:'1px solid var(--c-g200)' }}>
      <Progress pct={30}/>
    </div>

    <div className="bjt-scroll" style={{ padding:'14px 16px 16px' }}>
      {/* passage */}
      <div className="bjt-card" style={{ padding: 14, position:'relative', background:'#FFFEF7', border:'1px solid #FDE68A' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
          <div style={{ fontSize: 10, fontWeight:700, color:'var(--c-warn600)', letterSpacing:'.08em', textTransform:'uppercase' }}>📧 Business email</div>
          <div style={{ display:'flex', alignItems:'center', gap: 6, fontSize: 11, color:'var(--c-g600)' }}>
            ふりがな
            <div style={{ width: 30, height: 18, background:'var(--c-p500)', borderRadius:999, position:'relative' }}>
              <div style={{ position:'absolute', top:2, right:2, width:14, height:14, borderRadius:999, background:'white' }}/>
            </div>
          </div>
        </div>
        <div className="jp" style={{ fontSize: 14, lineHeight: 2.0, color:'var(--c-g900)' }}>
          <ruby>田中<rt>たなか</rt></ruby><ruby>部長<rt>ぶちょう</rt></ruby>より<ruby>ご連絡<rt>れんらく</rt></ruby>がございました。
          <ruby>明日<rt>あした</rt></ruby>の<ruby>会議<rt>かいぎ</rt></ruby>についてですが、<ruby>場所<rt>ばしょ</rt></ruby>を
          <ruby>第2会議室<rt>だいにかいぎしつ</rt></ruby>から<ruby>本社<rt>ほんしゃ</rt></ruby>3<ruby>階<rt>かい</rt></ruby>
          <ruby>大会議室<rt>だいかいぎしつ</rt></ruby>に<ruby>変更<rt>へんこう</rt></ruby>するとのことです。
        </div>
      </div>

      {/* question */}
      <div className="jp" style={{ fontSize: 15, fontWeight: 600, marginTop: 18, lineHeight: 1.6 }}>
        <ruby>田中<rt>たなか</rt></ruby><ruby>部長<rt>ぶちょう</rt></ruby>の<ruby>連絡<rt>れんらく</rt></ruby>は<ruby>何<rt>なに</rt></ruby>ですか？
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap: 9, marginTop: 12 }}>
        {[
          {l:'A', t:'会議が中止になった', state:''},
          {l:'B', t:'会議室が変更になった', state:'correct'},
          {l:'C', t:'会議時間が変更になった', state:''},
          {l:'D', t:'田中部長が欠席する', state:'wrong'},
        ].map(c=>(
          <button key={c.l} className={`bjt-choice ${c.state}`}>
            <div className="letter">{c.l}</div>
            <span className="jp" style={{ fontSize: 14, flex:1 }}>{c.t}</span>
            {c.state==='correct' && <div style={{width:16,height:16,color:'var(--c-suc600)'}}>{Icon.check}</div>}
            {c.state==='wrong' && <div style={{width:14,height:14,color:'var(--c-err600)'}}>{Icon.x}</div>}
          </button>
        ))}
      </div>

      {/* AI hint cta */}
      <div style={{ marginTop: 14, padding: 12, background:'linear-gradient(135deg,#EEF2FF,#F5F3FF)', borderRadius: 12, display:'flex', alignItems:'center', gap: 10, border:'1px solid #DDD6FE' }}>
        <div style={{ width:32, height:32, borderRadius:8, background:'white', display:'flex', alignItems:'center', justifyContent:'center', color:'#7C3AED' }}>🤖</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color:'#5B21B6' }}>Hỏi AI giải thích chi tiết</div>
          <div style={{ fontSize: 11, color:'var(--c-g600)' }}>Vì sao đáp án B đúng?</div>
        </div>
        <div style={{ color:'#7C3AED', width:14, height:14 }}>{Icon.chevR}</div>
      </div>
    </div>

    <div style={{ padding: 14, background:'white', borderTop:'1px solid var(--c-g200)', display:'flex', gap: 10 }}>
      <button className="bjt-btn" style={{ background:'var(--c-g100)', color:'var(--c-g700)', width: 56 }}>
        <div style={{width:18,height:18}}>{Icon.bookmark}</div>
      </button>
      <button className="bjt-btn lg primary" style={{ flex:1 }}>次の問題 →</button>
    </div>
  </div>
);

const VocabFlashcardScreen = () => (
  <div className="bjt-screen" style={{ background:'#F8FAFC' }}>
    <div className="bjt-appbar">
      <button className="icon-btn">{Icon.close}</button>
      <h1 className="jp">語彙復習</h1>
      <div style={{ fontSize: 12, color:'var(--c-g600)', fontWeight: 600, padding:'4px 10px', background:'var(--c-warn50)', color:'var(--c-warn600)', borderRadius:999 }}>残り 8</div>
    </div>
    <div style={{ padding: '10px 16px', background:'white', borderBottom:'1px solid var(--c-g200)' }}>
      <Progress pct={62}/>
    </div>

    <div className="bjt-scroll" style={{ padding:'18px 16px 14px', display:'flex', flexDirection:'column' }}>
      {/* card */}
      <div style={{ background:'white', borderRadius: 20, boxShadow:'0 10px 30px rgba(15,26,71,.08), 0 0 0 1px var(--c-g200)', padding: 24, position:'relative', overflow:'hidden', minHeight: 320 }}>
        <div style={{ position:'absolute', top: 14, left: 14, fontSize: 10, fontWeight: 700, color:'var(--c-p700)', letterSpacing:'.1em', textTransform:'uppercase' }}>Business · 経営</div>
        <div style={{ position:'absolute', top: 14, right: 14, display:'flex', gap: 6 }}>
          <div style={{ width:30, height:30, borderRadius:999, background:'var(--c-g100)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--c-g700)' }}>
            <div style={{width:14,height:14}}>{Icon.bookmark}</div>
          </div>
        </div>

        {/* front */}
        <div style={{ marginTop: 36, textAlign:'center' }}>
          <div className="jp" style={{ fontSize: 12, color:'var(--c-g500)' }}>とりしまりやく</div>
          <div className="jp" style={{ fontSize: 56, fontWeight: 700, color:'var(--c-g900)', lineHeight: 1.1, marginTop: 4, letterSpacing:'.04em' }}>取締役</div>
          <button style={{ marginTop: 14, padding:'8px 18px', borderRadius:999, background:'var(--c-p50)', color:'var(--c-p700)', border:'1.5px solid var(--c-p200)', fontSize: 13, fontWeight: 600, display:'inline-flex', alignItems:'center', gap:6 }}>
            <div style={{width:14,height:14}}>{Icon.speaker}</div> 発音
          </button>
        </div>

        {/* divider + meaning */}
        <div style={{ marginTop: 22, paddingTop: 16, borderTop:'1px dashed var(--c-g200)' }}>
          <div style={{ fontSize: 10, color:'var(--c-g500)', textTransform:'uppercase', letterSpacing:'.08em', fontWeight:600 }}>Meaning</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, color:'var(--c-g900)' }}>Board Director</div>
          <div style={{ fontSize: 13, color:'var(--c-g600)', marginTop: 2 }}>Thành viên Hội đồng Quản trị</div>
          <div className="jp" style={{ marginTop: 10, padding: 10, background:'var(--c-g50)', borderRadius: 10, fontSize: 12, lineHeight: 1.7, color:'var(--c-g700)' }}>
            例: 弊社の取締役会は月1回開催されます。
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18, fontSize: 12, color:'var(--c-g600)', textAlign:'center' }}>Bạn nhớ thẻ này được bao nhiêu?</div>

      {/* SRS quality buttons */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap: 8, marginTop: 12 }}>
        {[
          {e:'😓', l:'Quên', sub:'<1d', c:'#FEE2E2', cd:'#B91C1C'},
          {e:'😐', l:'Khó', sub:'1d', c:'#FEF3C7', cd:'#92400E'},
          {e:'🙂', l:'Tốt', sub:'4d', c:'#DBEAFE', cd:'#1E40AF'},
          {e:'😄', l:'Dễ', sub:'10d', c:'#DCFCE7', cd:'#166534'},
        ].map(q=>(
          <button key={q.l} style={{ background:q.c, color:q.cd, border:'1.5px solid '+q.cd+'30', borderRadius: 12, padding:'10px 4px', display:'flex', flexDirection:'column', alignItems:'center', gap: 2 }}>
            <div style={{ fontSize: 22 }}>{q.e}</div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{q.l}</div>
            <div style={{ fontSize: 10, opacity:.75 }}>{q.sub}</div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

Object.assign(window, { KeigoOverviewScreen, KeigoDrillScreen, ReadingScreen, VocabFlashcardScreen });

// Home + Profile screens
const HomeScreen = () => (
  <div className="bjt-screen">
    <div className="bjt-appbar">
      <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
        <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#1E3A8A,#2563EB)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-jp)', fontWeight:700, fontSize:14 }}>能</div>
        <h1>BJT Master</h1>
      </div>
      <div style={{ display:'flex', gap: 8 }}>
        <button className="icon-btn" style={{ position:'relative' }}>
          <div style={{width:18,height:18}}>{Icon.bell}</div>
          <div style={{ position:'absolute', top:6, right:7, width:8, height:8, borderRadius:999, background:'var(--c-err500)', border:'2px solid white' }}/>
        </button>
        <div style={{ width:36, height:36, borderRadius:999, background:'#DBEAFE', color:'var(--c-p700)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14 }}>NA</div>
      </div>
    </div>

    <div className="bjt-scroll" style={{ padding: '14px 16px 24px' }}>
      {/* Streak hero */}
      <div style={{ background: 'linear-gradient(135deg,#1E3A8A,#3B4B8C)', borderRadius: 16, padding: 16, color:'white', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:-10, top:-10, width:120, height:120, borderRadius:999, background:'rgba(245,158,11,.18)' }}/>
        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
          <div style={{ width:36, height:36, borderRadius:999, background:'rgba(245,158,11,.25)', color:'#FBBF24', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{width:18,height:18}}>{Icon.fire}</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, lineHeight:1 }}>7 ngày</div>
            <div style={{ fontSize: 11, opacity: .8, marginTop: 2 }}>chuỗi học liên tiếp</div>
          </div>
          <div style={{ marginLeft:'auto', textAlign:'right' }}>
            <div style={{ fontSize: 11, opacity:.7 }}>Hôm nay</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>12 / 15 phút</div>
          </div>
        </div>
        <div style={{ height: 6, background:'rgba(255,255,255,.18)', borderRadius:999, marginTop: 14, overflow:'hidden' }}>
          <div style={{ height:'100%', width:'80%', background:'linear-gradient(90deg,#FBBF24,#F59E0B)', borderRadius:999 }}/>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop: 10 }}>
          {['T2','T3','T4','T5','T6','T7','CN'].map((d,i)=>(
            <div key={d} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <div style={{ width:22, height:22, borderRadius:999, background: i<6?'rgba(245,158,11,.9)':'rgba(255,255,255,.15)', display:'flex', alignItems:'center', justifyContent:'center', color: i<6?'#451A03':'rgba(255,255,255,.5)', fontSize:10, fontWeight:700 }}>{i<6?'✓':'·'}</div>
              <div style={{ fontSize: 9, opacity:.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Today plan */}
      <div className="bjt-section-h" style={{ marginTop: 22 }}>📅 Kế hoạch hôm nay</div>
      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        {[
          { tag:'Keigo', tagJp:'敬語', t:'Ôn tập 敬語', sub:'12 items đến hạn', cta:'Tiếp tục', urgent:true, c1:'#FED7AA', c2:'#F59E0B' },
          { tag:'Reading', tagJp:'読解', t:'Reading J3', sub:'10 câu mới · ~8 phút', cta:'Bắt đầu', c1:'#BFDBFE', c2:'#2563EB' },
          { tag:'Vocab', tagJp:'語彙', t:'Vocab SRS', sub:'8 thẻ due hôm nay', cta:'Bắt đầu', c1:'#C7D2FE', c2:'#4F46E5' },
        ].map(it=>(
          <div key={it.t} className="bjt-card" style={{ padding: 14, display:'flex', alignItems:'center', gap: 12 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg,${it.c1},${it.c2})`, color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-jp)', fontWeight:700, fontSize:16 }}>{it.tagJp}</div>
            <div style={{ flex:1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{it.t}{it.urgent && <span style={{ marginLeft:6, fontSize:10, color:'var(--c-warn600)', fontWeight:600 }}>● due</span>}</div>
              <div style={{ fontSize: 12, color:'var(--c-g500)', marginTop: 2 }}>{it.sub}</div>
            </div>
            <button className="bjt-btn" style={{ height: 34, fontSize:12, padding:'0 14px', background: it.urgent?'var(--c-warn500)':'var(--c-p600)', color:'white' }}>{it.cta}</button>
          </div>
        ))}
      </div>

      {/* Progress trio */}
      <div className="bjt-section-h" style={{ marginTop: 22 }}>📊 Tiến độ tổng</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 10 }}>
        {[
          { v:'J3', l:'Rank ước tính', accent:'var(--c-p700)' },
          { v:'580', l:'Score (gần nhất)', accent:'var(--c-g900)' },
          { v:'78%', l:'Độ chính xác', accent:'var(--c-suc600)' },
        ].map(s=>(
          <div key={s.l} className="bjt-card" style={{ padding: 12, textAlign:'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.accent }}>{s.v}</div>
            <div style={{ fontSize: 10, color:'var(--c-g500)', marginTop:2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Mock test promo */}
      <div className="bjt-card" style={{ marginTop: 16, padding: 14, display:'flex', alignItems:'center', gap: 12, background:'linear-gradient(135deg,#FFF7ED,#FFFBEB)', border:'1px solid #FED7AA' }}>
        <div style={{ width:40, height:40, borderRadius:10, background:'#F59E0B', color:'white', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{width:20,height:20}}>{Icon.test(true)}</div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:600 }}>Mock Test #2 sẵn sàng</div>
          <div style={{ fontSize:11, color:'var(--c-g600)' }}>80 câu · 2 giờ · giả lập đề thi thật</div>
        </div>
        <div style={{ color:'var(--c-g500)', width:18, height:18 }}>{Icon.chevR}</div>
      </div>
    </div>

    <TabBar active="home" />
  </div>
);

const ProfileScreen = () => (
  <div className="bjt-screen">
    <div className="bjt-appbar"><div style={{width:36}}/><h1>Profile</h1><div style={{width:36}}/></div>
    <div className="bjt-scroll" style={{ padding: '16px 16px 24px' }}>
      <div className="bjt-card" style={{ padding: 16, display:'flex', alignItems:'center', gap: 14 }}>
        <div style={{ width:56, height:56, borderRadius:999, background:'linear-gradient(135deg,#3B82F6,#1E3A8A)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:20 }}>NA</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Nguyen Van A</div>
          <div style={{ display:'flex', gap:6, alignItems:'center', marginTop:4 }}>
            <JBadge level="J2"/>
            <span style={{ fontSize:12, color:'var(--c-g600)' }}>· 580 điểm</span>
          </div>
          <div style={{ marginTop: 6, display:'flex', alignItems:'center', gap: 4, fontSize: 12, color:'var(--c-warn600)' }}>
            <div style={{width:12,height:12}}>{Icon.fire}</div> 42 ngày streak
          </div>
        </div>
        <button className="icon-btn">{Icon.chevR}</button>
      </div>

      <div className="bjt-section-h" style={{ marginTop: 22 }}>📊 Học tập</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 8 }}>
        {[{v:'1,240',l:'Câu đã làm'},{v:'856',l:'Vocab'},{v:'12',l:'Mock test'}].map(s=>(
          <div key={s.l} className="bjt-card" style={{ padding:12, textAlign:'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{s.v}</div>
            <div style={{ fontSize: 10, color:'var(--c-g500)', marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="bjt-section-h" style={{ marginTop: 22 }}>🏆 Thành tựu (12/30)</div>
      <div style={{ display:'flex', gap: 8, overflowX:'auto', paddingBottom: 4 }}>
        {['🔥','💯','📚','⭐','🎯','🥇'].map((e,i)=>(
          <div key={i} style={{ flex:'0 0 56px', height:56, borderRadius:14, background: i<4?'#FEF3C7':'var(--c-g100)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 22, opacity: i<4?1:.4 }}>{e}</div>
        ))}
      </div>

      <div className="bjt-section-h" style={{ marginTop: 22 }}>⚙️ Cài đặt</div>
      <div className="bjt-card" style={{ padding: 0, overflow:'hidden' }}>
        {[
          {l:'Ngôn ngữ', v:'Tiếng Việt'},
          {l:'Theme', v:'Light'},
          {l:'Thông báo', v:'Bật'},
          {l:'Premium', v:'Đang hoạt động ✓', accent:true},
        ].map((r,i,a)=>(
          <div key={r.l} style={{ display:'flex', alignItems:'center', padding:'14px 16px', borderTop: i===0?0:'1px solid var(--c-g100)' }}>
            <div style={{ flex:1, fontSize: 14 }}>{r.l}</div>
            <div style={{ fontSize: 13, color: r.accent?'var(--c-suc600)':'var(--c-g500)', fontWeight: r.accent?600:400 }}>{r.v}</div>
            <div style={{ marginLeft: 8, color:'var(--c-g400)', width:14, height:14 }}>{Icon.chevR}</div>
          </div>
        ))}
      </div>

      <button style={{ marginTop: 18, width:'100%', height: 44, border:'1px solid var(--c-g200)', background:'white', color:'var(--c-err600)', fontWeight: 500, borderRadius:8 }}>Đăng xuất</button>
    </div>
    <TabBar active="me"/>
  </div>
);

Object.assign(window, { HomeScreen, ProfileScreen });

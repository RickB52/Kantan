// Auth + Onboarding screens
const WelcomeScreen = () => (
  <div className="bjt-screen" style={{ background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 60%)', paddingTop: 60 }}>
    <div className="bjt-scroll" style={{ padding: '40px 24px 24px', display:'flex', flexDirection:'column' }}>
      {/* Logo block */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop: 20 }}>
        <div style={{
          width: 76, height: 76, borderRadius: 22,
          background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'white', fontFamily:'var(--font-jp)', fontWeight: 700, fontSize: 36,
          boxShadow: '0 12px 28px rgba(37,99,235,.35)',
        }}>能</div>
        <div style={{ marginTop: 16, fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>BJT Master</div>
        <div className="jp" style={{ marginTop: 4, fontSize: 13, color: 'var(--c-g600)' }}>ビジネス日本語能力テスト</div>
      </div>

      <div style={{ marginTop: 28, textAlign:'center', fontSize: 15, color: 'var(--c-g700)', lineHeight: 1.6 }}>
        Master business Japanese for the<br/>BJT exam — built for working professionals.
      </div>

      {/* Feature row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 8, marginTop: 28 }}>
        {[
          {n:'敬語', l:'Keigo drills'},
          {n:'読解', l:'Reading'},
          {n:'模試', l:'Mock tests'},
        ].map(f => (
          <div key={f.n} style={{ background:'white', border:'1px solid var(--c-g200)', borderRadius:12, padding:'12px 8px', textAlign:'center' }}>
            <div className="jp" style={{ fontSize: 18, fontWeight:700, color:'var(--c-p700)' }}>{f.n}</div>
            <div style={{ fontSize: 10, color:'var(--c-g600)', marginTop:2 }}>{f.l}</div>
          </div>
        ))}
      </div>

      <div style={{ flex:1 }}/>

      <div style={{ display:'flex', flexDirection:'column', gap: 10, marginTop: 32 }}>
        <button className="bjt-btn lg" style={{ background:'white', border:'1.5px solid var(--c-g200)', color:'var(--c-g800)' }}>
          <div style={{width:18,height:18}}>{Icon.google}</div> Tiếp tục với Google
        </button>
        <button className="bjt-btn lg" style={{ background:'#000', color:'white' }}>
          <div style={{width:18,height:18}}>{Icon.apple}</div> Tiếp tục với Apple
        </button>
        <div style={{ display:'flex', alignItems:'center', gap: 10, margin: '8px 0', color: 'var(--c-g400)', fontSize: 12 }}>
          <div style={{flex:1, height:1, background:'var(--c-g200)'}}/>hoặc<div style={{flex:1, height:1, background:'var(--c-g200)'}}/>
        </div>
        <button className="bjt-btn lg primary">Đăng ký bằng email</button>
        <div style={{ textAlign:'center', fontSize: 13, color:'var(--c-g600)', marginTop: 6 }}>
          Đã có tài khoản? <span style={{ color:'var(--c-p600)', fontWeight:600 }}>Đăng nhập</span>
        </div>
      </div>
      <div style={{ textAlign:'center', fontSize: 11, color:'var(--c-g400)', marginTop: 18 }}>
        Terms of Service · Privacy Policy
      </div>
    </div>
  </div>
);

const OnboardingRankScreen = () => {
  const levels = [
    { l: 'J5', desc: 'Entry — N5/N4', color: '#64748B' },
    { l: 'J4', desc: 'Beginner+ — N4', color: '#0D9488' },
    { l: 'J3', desc: 'Intermediate — N2', color: '#2563EB', sel: true },
    { l: 'J2', desc: 'Upper-int — N1', color: '#7C3AED' },
    { l: 'J1', desc: 'Advanced', color: '#D97706' },
    { l: 'J1+', desc: 'Expert', color: 'linear-gradient(120deg,#0F1A47,#F59E0B)', star: true },
  ];
  return (
    <div className="bjt-screen">
      <div style={{ padding: '14px 16px 12px', background:'white' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 12 }}>
          <button className="icon-btn">{Icon.back}</button>
          <div style={{ flex:1, fontSize: 12, color:'var(--c-g500)', fontWeight:500 }}>Bước 1/3</div>
        </div>
        <Progress pct={33} />
      </div>
      <div className="bjt-scroll" style={{ padding: '28px 20px 20px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.25 }}>Mục tiêu của bạn là gì?</div>
        <div className="jp" style={{ fontSize: 14, color:'var(--c-g500)', marginTop: 4 }}>あなたの目標は？</div>
        <div style={{ marginTop: 8, fontSize: 13, color:'var(--c-g600)' }}>
          Chọn rank BJT bạn muốn đạt được. Có thể đổi sau.
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 10, marginTop: 22 }}>
          {levels.map(L => (
            <div key={L.l} style={{
              position:'relative', aspectRatio:'1/1.05',
              borderRadius: 14, padding: 12,
              border: L.sel ? '2px solid var(--c-p600)' : '1.5px solid var(--c-g200)',
              background: L.sel ? 'var(--c-p50)' : 'white',
              display:'flex', flexDirection:'column', justifyContent:'space-between',
            }}>
              <div>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: L.color, color:'white',
                  fontSize: 13, fontWeight: 700,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>{L.l}</div>
              </div>
              {L.sel && (
                <div style={{ position:'absolute', top: 8, right: 8, width: 20, height:20, borderRadius:999, background:'var(--c-p600)', color:'white', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ width:14, height:14 }}>{Icon.check}</div>
                </div>
              )}
              {L.star && (
                <div style={{ position:'absolute', top: 8, right: 8, color:'var(--c-warn500)', width:16, height:16 }}>{Icon.sparkle}</div>
              )}
              <div>
                <div style={{ fontSize: 10, color: L.sel ? 'var(--c-p700)' : 'var(--c-g600)', fontWeight:500, lineHeight:1.3 }}>{L.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, padding: 14, background:'var(--c-p50)', borderRadius: 12, borderLeft:'3px solid var(--c-p500)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color:'var(--c-p900)' }}>J3 — Intermediate</div>
          <div style={{ fontSize: 12, color:'var(--c-g700)', marginTop: 4, lineHeight: 1.5 }}>
            Tương đương N2 / CEFR B1–B2. Phù hợp cho ứng viên đi làm tại doanh nghiệp Nhật,
            có thể giao tiếp công việc cơ bản.
          </div>
          <div style={{ fontSize: 11, color:'var(--c-g600)', marginTop: 8 }}>
            Ước lượng <b>~3 tháng</b> với 20ph/ngày
          </div>
        </div>
      </div>
      <div style={{ padding: 16, background:'white', borderTop:'1px solid var(--c-g200)' }}>
        <button className="bjt-btn lg primary" style={{ width:'100%' }}>
          Tiếp theo {Icon.chevR && <div style={{width:18,height:18}}>{Icon.chevR}</div>}
        </button>
      </div>
    </div>
  );
};

Object.assign(window, { WelcomeScreen, OnboardingRankScreen });

import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft,
  Bot,
  Box,
  Camera,
  ChevronDown,
  Clock3,
  Compass,
  Gem,
  Images,
  Layers3,
  MapPin,
  MessageCircle,
  PenTool,
  Plus,
  Sparkles,
  Store,
  Sun,
  Wand2
} from 'lucide-react'
import './styles.css'

const hands = Array.from({ length: 10 }, (_, i) => `/assets/hands/hand_${String(i + 1).padStart(3, '0')}.png`)
const styles = Array.from({ length: 12 }, (_, i) => `/assets/styles/style_${String(i + 1).padStart(3, '0')}.png`)

const scenes = [
  { id: 'milk-tea', name: '逛街握住奶茶', hint: '商场自然光', pose: '握杯' },
  { id: 'study', name: '拿圆珠笔写作业', hint: '桌面柔光', pose: '书写' },
  { id: 'drive', name: '开车握住方向盘', hint: '车窗侧光', pose: '握持' },
  { id: 'dinner', name: '吃饭左勺右筷', hint: '餐厅暖光', pose: '双手' },
  { id: 'date', name: '约会递花', hint: '夜景反射', pose: '轻握' },
  { id: 'office', name: '职场敲键盘', hint: '冷白办公光', pose: '半弯曲' },
  { id: 'selfie', name: '电梯自拍', hint: '镜面高光', pose: '举手机' }
]

const works = [
  { id: 'AUR-0927', title: '水光银雾猫眼', author: 'Mina', time: '2小时前', style: styles[0], hand: hands[1], price: '¥238', sold: 46 },
  { id: 'LUM-1842', title: '浅灰贝母渐层', author: '鹿白', time: '昨天', style: styles[3], hand: hands[3], price: '¥198', sold: 29 },
  { id: 'MNT-3320', title: '薄荷玻璃法式', author: '栀夏', time: '3天前', style: styles[6], hand: hands[5], price: '¥268', sold: 73 }
]

function App() {
  const [route, setRoute] = useState(location.hash.replace('#', '') || '/community')
  const [state, setState] = useState({ hand: hands[0], style: styles[0], scene: scenes[0] })

  const go = (next, patch = {}) => {
    const nextRoute = next.startsWith('/') ? next : `/${next}`
    setState((s) => ({ ...s, ...patch }))
    setRoute(nextRoute)
    history.replaceState(null, '', `#${nextRoute}`)
  }

  const page = useMemo(() => {
    if (route.startsWith('/work')) return <WorkDetail go={go} setState={setState} />
    if (route === '/try-on') return <TryOn state={state} setState={setState} go={go} />
    if (route === '/editor') return <FineEditor go={go} state={state} />
    if (route === '/pool') return <DemandPool go={go} />
    return <Community go={go} />
  }, [route, state])

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.95),transparent_34%),linear-gradient(135deg,#f7f8f6,#e7ebe8_48%,#f4f6f4)] text-ink">
      <div className="fixed inset-0 liquid-grid" />
      <nav className="relative z-20 mx-auto flex max-w-[1520px] items-center justify-between px-6 py-5">
        <button onClick={() => go('/community')} className="glass-pill text-[15px] font-semibold">
          <Sparkles size={18} /> NailVision
        </button>
        <div className="glass-pill gap-1 p-1 text-sm">
          <NavButton active={route === '/community'} onClick={() => go('/community')}>社区</NavButton>
          <NavButton active={route.startsWith('/work')} onClick={() => go('/work/AUR-0927')}>作品</NavButton>
          <NavButton active={route === '/try-on'} onClick={() => go('/try-on')}>AI试戴</NavButton>
          <NavButton active={route === '/pool'} onClick={() => go('/pool')}>需求池</NavButton>
        </div>
      </nav>
      <main className="relative z-10 mx-auto max-w-[1520px] px-6 pb-8">{page}</main>
    </div>
  )
}

function NavButton({ active, children, onClick }) {
  return <button onClick={onClick} className={`rounded-full px-4 py-2 transition ${active ? 'bg-white shadow-sm' : 'text-neutral-500 hover:text-ink'}`}>{children}</button>
}

function Glass({ children, className = '' }) {
  return <section className={`glass ${className}`}>{children}</section>
}

function Community({ go }) {
  return (
    <div className="grid min-h-[calc(100vh-96px)] grid-cols-[1fr_380px] gap-5">
      <Glass className="p-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="eyebrow">Community Gallery</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-normal">从真实作品进入试戴</h1>
          </div>
          <button onClick={() => go('/try-on')} className="primary-btn"><Camera size={18} />直接上传试戴</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {works.map((work) => (
            <button key={work.id} onClick={() => go(`/work/${work.id}`, { hand: work.hand, style: work.style })} className="work-card group text-left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-neutral-100">
                <img src={work.hand} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <img src={work.style} className="absolute bottom-4 right-4 h-24 w-24 rounded-2xl border border-white/70 object-cover shadow-xl" />
                <span className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs backdrop-blur-xl">#{work.id}</span>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <h3 className="text-lg font-semibold">{work.title}</h3>
                  <p className="text-sm text-neutral-500">{work.author} · {work.time}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-sm">{work.price}</span>
              </div>
            </button>
          ))}
        </div>
      </Glass>
      <Glass className="flex flex-col justify-between p-6">
        <div>
          <p className="eyebrow">Trend Signal</p>
          <h2 className="mt-2 text-2xl font-semibold">生活场景转化更高</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-500">当前社区作品会沉淀为可复用模板，二创者基于原作品调整材质、图案与场景后可发布为自己的作品；成交时按采用链路分润。</p>
        </div>
        <div className="space-y-3">
          {['逛街奶茶', '职场键盘', '约会递花'].map((item, i) => (
            <div key={item} className="flex items-center justify-between rounded-3xl bg-white/50 p-4">
              <span>{item}</span><strong>{[38, 27, 21][i]}%</strong>
            </div>
          ))}
        </div>
      </Glass>
    </div>
  )
}

function WorkDetail({ go, setState }) {
  const [scene, setScene] = useState(scenes[0])
  const work = works[0]
  const adopt = () => {
    setState({ hand: work.hand, style: work.style, scene })
    go('/try-on')
  }
  return (
    <div className="grid min-h-[calc(100vh-96px)] grid-cols-[1.1fr_.9fr] gap-5">
      <Glass className="relative overflow-hidden p-5">
        <button onClick={() => go('/community')} className="glass-pill absolute left-6 top-6 z-10"><ArrowLeft size={17} />返回社区</button>
        <AnimatedHand hand={work.hand} style={work.style} scene={scene} large />
      </Glass>
      <div className="space-y-5">
        <Glass className="p-6">
          <p className="eyebrow">Original Work #{work.id}</p>
          <div className="mt-3 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold">{work.title}</h1>
              <p className="mt-2 text-neutral-500">厚涂猫眼、微凸银粉、透灰底色</p>
            </div>
            <button onClick={adopt} className="primary-btn"><Wand2 size={18} />用这个试戴</button>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {['正视', '侧面', '斜45°'].map((v, i) => <Mini3D key={v} style={work.style} label={v} tilt={i} />)}
          </div>
        </Glass>
        <Glass className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">场景与手势预览</h2>
            <select value={scene.id} onChange={(e) => setScene(scenes.find((x) => x.id === e.target.value))} className="select">
              {scenes.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {scenes.slice(0, 6).map((s) => (
              <button key={s.id} onClick={() => setScene(s)} className={`scene-chip ${scene.id === s.id ? 'active' : ''}`}>{s.name}</button>
            ))}
          </div>
        </Glass>
        <Glass className="p-6">
          <div className="flex items-center gap-3">
            <Avatar name="M" /><div><p className="font-semibold">第一作者 Mina</p><p className="text-sm text-neutral-500">发布于 {work.time}</p></div>
          </div>
          <div className="mt-5 flex gap-3">
            {[styles[2], styles[4], styles[7]].map((src, i) => (
              <div key={src} className="rounded-3xl bg-white/50 p-3">
                <img src={src} className="h-20 w-20 rounded-2xl object-cover" />
                <p className="mt-2 text-xs text-neutral-500">二创作者 {i + 1}</p>
              </div>
            ))}
          </div>
        </Glass>
        <Glass className="grid grid-cols-3 gap-3 p-6 text-sm">
          <Info icon={<Store size={18} />} title="可制作商家" value="湖滨银泰店 1.8km" />
          <Info icon={<Gem size={18} />} title="最近成交价" value="¥238-¥288" />
          <Info icon={<Clock3 size={18} />} title="营业时间" value="10:00-22:00" />
        </Glass>
      </div>
    </div>
  )
}

function TryOn({ state, setState, go }) {
  const [mode, setMode] = useState('simple')
  const [assistant, setAssistant] = useState('')
  const [selected, setSelected] = useState('珍珠星芒')
  return (
    <div className="grid min-h-[calc(100vh-96px)] grid-cols-[minmax(620px,1fr)_430px] gap-5">
      <Glass className="relative overflow-hidden p-5">
        <div className="topbar">
          <div className="glass-pill"><Box size={17} />当前模板 <strong>#AUR-0927</strong></div>
          <label className="glass-pill cursor-pointer"><Camera size={17} />上传照片<input type="file" accept="image/*" className="hidden" onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) setState((s) => ({ ...s, hand: URL.createObjectURL(file) }))
          }} /></label>
          <div className="assistant-input"><Bot size={17} /><input value={assistant} onChange={(e) => setAssistant(e.target.value)} placeholder="试试我吧：改成更通勤的银灰猫眼" /></div>
        </div>
        <AnimatedHand hand={state.hand} style={state.style} scene={state.scene} large />
        <div className="island">
          <Compass size={16} />
          <select value={state.scene.id} onChange={(e) => setState((s) => ({ ...s, scene: scenes.find((x) => x.id === e.target.value) }))}>
            {scenes.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <ChevronDown size={16} />
        </div>
        <div className="bottombar">
          <button className="primary-btn"><Sparkles size={18} />AI升级</button>
          <button className="glass-pill"><Clock3 size={17} />预计 75分钟 · ¥238</button>
          <button onClick={() => go('/pool')} className="glass-pill"><Plus size={17} />发布到需求池</button>
        </div>
      </Glass>
      <Glass className="overflow-hidden p-5">
        <div className="flex items-center justify-between">
          <div><p className="eyebrow">Live Editor</p><h2 className="mt-1 text-2xl font-semibold">实时修饰</h2></div>
          <div className="segmented">
            <button onClick={() => setMode('simple')} className={mode === 'simple' ? 'active' : ''}>普通</button>
            <button onClick={() => setMode('pro')} className={mode === 'pro' ? 'active' : ''}>专业</button>
          </div>
        </div>
        <div className="mt-5 rounded-[28px] bg-white/45 p-4">
          <div className="grid grid-cols-[1fr_92px] gap-4">
            <Mini3D style={state.style} label="当前甲片" large />
            <div className="space-y-2">
              {['正视', '侧面', '斜视'].map((v) => <button key={v} className="view-btn">{v}</button>)}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="sample-select">
              <span>手部照片</span>
              <select value={state.hand} onChange={(e) => setState((s) => ({ ...s, hand: e.target.value }))}>
                {hands.map((src, i) => <option key={src} value={src}>Hand {String(i + 1).padStart(3, '0')}</option>)}
              </select>
            </label>
            <label className="sample-select">
              <span>款式照片</span>
              <select value={state.style} onChange={(e) => setState((s) => ({ ...s, style: e.target.value }))}>
                {styles.map((src, i) => <option key={src} value={src}>Style {String(i + 1).padStart(3, '0')}</option>)}
              </select>
            </label>
          </div>
        </div>
        {mode === 'simple' ? <SimplePanel state={state} setState={setState} selected={selected} setSelected={setSelected} go={go} /> : <ProPanel state={state} setState={setState} go={go} />}
      </Glass>
    </div>
  )
}

function SimplePanel({ state, setState, selected, setSelected, go }) {
  return (
    <div className="mt-5 space-y-5">
      <Picker title="素材库" icon={<Images size={18} />} items={['珍珠星芒', '银线蝴蝶', '水滴钻', '低饱和花纹']} value={selected} setValue={setSelected} />
      <AssetStrip items={styles} value={state.style} onPick={(style) => setState((s) => ({ ...s, style }))} />
      <Picker title="材质库" icon={<Layers3 size={18} />} items={['玻璃透亮', '猫眼厚涂', '贝母微闪', '雾面凝胶']} />
      <Picker title="手势" icon={<PenTool size={18} />} items={scenes.slice(0, 5).map((s) => s.name)} onPick={(name) => setState((s) => ({ ...s, scene: scenes.find((x) => x.name === name) || s.scene }))} />
      <Picker title="光线" icon={<Sun size={18} />} items={['自然柔光', '车窗侧光', '餐厅暖光', '镜面高光']} />
      <button onClick={() => go('/editor')} className="secondary-btn w-full"><Gem size={18} />打开细致修改窗口</button>
    </div>
  )
}

function ProPanel({ state, setState, go }) {
  const controls = ['图案缩放', '凸起厚度', '猫眼磁线', '透明度', '边缘服帖', '高光强度']
  return (
    <div className="mt-5 space-y-4">
      <AssetStrip items={styles} value={state.style} onPick={(style) => setState((s) => ({ ...s, style }))} />
      {controls.map((c, i) => (
        <label key={c} className="control-row"><span>{c}</span><input type="range" defaultValue={62 - i * 5} /></label>
      ))}
      <button onClick={() => go('/editor')} className="primary-btn w-full justify-center"><PenTool size={18} />进入元素级编辑</button>
    </div>
  )
}

function FineEditor({ go, state }) {
  return (
    <div className="grid min-h-[calc(100vh-96px)] grid-cols-[1fr_440px] gap-5">
      <Glass className="relative overflow-hidden p-6">
        <button onClick={() => go('/try-on')} className="glass-pill absolute left-6 top-6 z-10"><ArrowLeft size={17} />返回试戴</button>
        <div className="grid h-full place-items-center">
          <div className="editor-canvas">
            <Mini3D style={state.style} label="元素：珍珠星芒" large />
            <div className="anchor-dot" />
          </div>
        </div>
      </Glass>
      <Glass className="p-6">
        <p className="eyebrow">Element Studio</p>
        <h1 className="mt-2 text-3xl font-semibold">细致修改窗口</h1>
        <p className="mt-2 text-sm leading-6 text-neutral-500">用于后续接入真实 3D 甲片、材质节点和生成式编辑模型。</p>
        <div className="mt-6 space-y-5">
          {['颜色温度', '金属度', '粗糙度', '图案旋转', '材料厚度', '局部发光'].map((c, i) => (
            <label key={c} className="control-row"><span>{c}</span><input type="range" defaultValue={45 + i * 7} /></label>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {['银粉', '贝母', '水钻'].map((x) => <button key={x} className="scene-chip">{x}</button>)}
        </div>
      </Glass>
    </div>
  )
}

function DemandPool({ go }) {
  return (
    <Glass className="min-h-[calc(100vh-96px)] p-8">
      <p className="eyebrow">Demand Pool</p>
      <h1 className="mt-2 text-4xl font-semibold">需求池路由保留</h1>
      <p className="mt-3 max-w-2xl text-neutral-500">后续这里承接用户发布的试戴方案、商家报价、制作排期和一创/二创分润链路。当前 Demo 先展示入口和基础卡片。</p>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {['待商家接单', '已报价', '可制作模板'].map((x, i) => <div key={x} className="work-card p-6"><p className="text-neutral-500">{x}</p><strong className="mt-3 block text-4xl">{[12, 7, 31][i]}</strong></div>)}
      </div>
      <button onClick={() => go('/try-on')} className="primary-btn mt-8"><ArrowLeft size={18} />回到试戴</button>
    </Glass>
  )
}

function AnimatedHand({ hand, style, scene, large = false }) {
  return (
    <div className={`animated-stage ${large ? 'large' : ''}`}>
      <div className={`scene-bg ${scene.id}`} />
      <img src={hand} className="hand-img" />
      <div className="nail-layer" style={{ '--nail-texture': `url(${style})` }}>
        {[0, 1, 2, 3, 4].map((i) => <i key={i} />)}
      </div>
      <div className="scene-label">
        <span>{scene.name}</span><small>{scene.hint} · {scene.pose}</small>
      </div>
    </div>
  )
}

function Mini3D({ style, label, large, tilt = 1 }) {
  return (
    <div className={`mini3d ${large ? 'large' : ''}`} style={{ '--style': `url(${style})`, '--tilt': `${tilt * 8 - 8}deg` }}>
      <div className="nail-shell" />
      <p>{label}</p>
    </div>
  )
}

function Picker({ title, icon, items, value, setValue, onPick }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">{icon}{title}</div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => <button key={item} onClick={() => { setValue?.(item); onPick?.(item) }} className={`scene-chip ${value === item ? 'active' : ''}`}>{item}</button>)}
      </div>
    </div>
  )
}

function AssetStrip({ items, value, onPick }) {
  return <div className="flex gap-2 overflow-x-auto pb-1">{items.slice(0, 8).map((src) => <button key={src} onClick={() => onPick(src)} className={`asset ${value === src ? 'active' : ''}`}><img src={src} /></button>)}</div>
}

function Avatar({ name }) {
  return <div className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white">{name}</div>
}

function Info({ icon, title, value }) {
  return <div className="rounded-3xl bg-white/45 p-4">{icon}<p className="mt-3 text-neutral-500">{title}</p><strong className="mt-1 block">{value}</strong></div>
}

createRoot(document.getElementById('root')).render(<App />)

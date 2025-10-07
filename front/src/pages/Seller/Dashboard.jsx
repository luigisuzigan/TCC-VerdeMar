import { Phone, ChevronRight, Search } from 'lucide-react';

export default function SellerDashboard() {
  // Mock metrics
  const stats = [
    { label: 'Active Leads', value: 120, delta: '+12%', icon: '🪙' },
    { label: 'Total Revenue', value: '$96,7M', delta: '+12%', icon: '🪙' },
    { label: 'Active Listing', value: 23, delta: '+12%', icon: '🏠' },
    { label: 'Total Closed', value: 42, delta: '+12%', icon: '🤝' },
  ];

  const properties = [
    { id: 1, name: 'Maison Sterling', city: 'New York, Albany', type: 'House', units: 12, cost: '$ 1.5M', leads: '+32', views: 125, status: '8/12 Occupied', img: '/praia1.jpg' },
    { id: 2, name: 'The Orchid', city: 'Ohio, Columbus', type: 'Villa', units: 9300, cost: '$ 520K', leads: '+15', views: 930, status: 'Available', img: '/praia2.jpg' },
    { id: 3, name: 'Echelon West', city: 'Ohio, Columbus', type: 'House', units: 25, cost: '$ 700K', leads: '+40', views: 355, status: 'Available', img: '/praia3.jpg' },
  ];

  const leads = [
    { id: 1, name: 'Jessica Chen', loc: 'New York, Albany', img: '/praia4.jpg' },
    { id: 2, name: 'John Doe', loc: 'California, LA', img: '/praia5.jpg' },
    { id: 3, name: 'Hailee S.', loc: 'New York, Troy', img: '/praia6.jpg' },
    { id: 4, name: 'Evan Chris', loc: 'Ohio, Columbus', img: '/praia7.jpg' },
  ];

  // Deals progress
  const closed = 42;
  const inProgress = 132;
  const totalDeals = closed + inProgress;
  const closedPct = Math.min(100, Math.round((closed / totalDeals) * 100));

  return (
    <main className="mx-auto w-[min(96vw,1280px)] py-6">
      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div className="text-2xl">{s.icon}</div>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">{s.delta}</span>
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-600">{s.label}</div>
            <div className="text-2xl font-extrabold tracking-tight">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        {/* Performance (chart) */}
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 lg:col-span-7">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-extrabold">Performance</h3>
            <button className="rounded-full bg-slate-50 px-3 py-1 text-sm ring-1 ring-slate-200">Monthly ▾</button>
          </div>
          <MiniLineChart />
        </div>

        {/* Featured property + Deals */}
        <div className="grid gap-4 lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <img src="/praia8.jpg" alt="Featured" className="h-44 w-full object-cover" onError={imgFallback} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="relative z-10 p-4 text-white">
              <div className="text-sm text-white/85">The Somerset</div>
              <div className="text-xs">House</div>
              <div className="mt-2 flex gap-2 text-xs">
                <Badge>175 Sold</Badge>
                <Badge>125 Rented</Badge>
                <Badge>2K+ Views</Badge>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-extrabold">Deals</h3>
              <ChevronRight size={16} className="text-slate-500" />
            </div>
            <div className="relative h-10 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-gradient-to-r from-orange-400 to-amber-300" style={{ width: `${closedPct}%` }} />
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_12px,rgba(0,0,0,0.04)_12px,rgba(0,0,0,0.04)_22px)]" />
            </div>
            <div className="mt-2 grid grid-cols-2 text-sm text-slate-600">
              <div><span className="font-semibold text-slate-900">{closed}</span> Closed Deals</div>
              <div className="text-right"><span className="font-semibold text-slate-900">{inProgress}</span> On Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        {/* Active Listing */}
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 lg:col-span-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-extrabold">Active Listing</h3>
            <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
              <Search size={16} className="text-slate-500" />
              <input placeholder="Search..." className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-400" />
            </div>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="p-2">Property</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Units</th>
                  <th className="p-2">Cost</th>
                  <th className="p-2">Active Leads</th>
                  <th className="p-2">Views</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">
                      <div className="flex items-center gap-3">
                        <img src={p.img} alt={p.name} className="h-12 w-16 rounded object-cover ring-1 ring-slate-200" onError={imgFallback} />
                        <div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-xs text-slate-500">{p.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{p.type}</td>
                    <td className="p-2">{p.units}</td>
                    <td className="p-2">{p.cost}</td>
                    <td className="p-2">{p.leads}</td>
                    <td className="p-2">{p.views}</td>
                    <td className="p-2">
                      <span className={"inline-flex rounded-full px-2 py-0.5 text-[12px] ring-1 " + (p.status.includes('Available') ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-sky-50 text-sky-700 ring-sky-200')}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="grid gap-4 lg:col-span-4">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <h3 className="mb-3 font-extrabold">Reminder</h3>
            <ReminderItem title="Follow-Ups" text="15 leads need to be followed up" />
            <ReminderItem title="Documents" text="3 documents awaiting review" />
            <ReminderItem title="Expire Listings" text="2 listings are about to expire in 3 days" />
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <CalendarMonth year={2025} month={6} highlightDay={2} />
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <h3 className="mb-3 font-extrabold">Leads Contact</h3>
            <ul className="space-y-3">
              {leads.map((l) => (
                <li key={l.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={l.img} alt={l.name} className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200" onError={imgFallback} />
                    <div>
                      <div className="font-semibold">{l.name}</div>
                      <div className="text-xs text-slate-500">{l.loc}</div>
                    </div>
                  </div>
                  <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200">
                    <Phone size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

function Badge({ children }) {
  return <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white ring-1 ring-white/30">{children}</span>;
}

function imgFallback(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop';
}

function MiniLineChart() {
  // Simple hard-coded chart lines for style only
  const width = 560, height = 180, padding = 24;
  const path1 = 'M0,120 C80,80 160,140 240,100 C320,60 400,140 480,100';
  const path2 = 'M0,100 C80,120 160,80 240,110 C320,130 400,80 480,120';
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full">
      <g transform={`translate(${padding},${0})`}>
        <line x1="0" x2={width - padding * 2} y1="140" y2="140" stroke="#e5e7eb" />
        <path d={path1} fill="none" stroke="#f59e0b" strokeWidth="3" />
        <path d={path2} fill="none" stroke="#f97316" strokeWidth="3" opacity=".8" />
      </g>
    </svg>
  );
}

function ReminderItem({ title, text }) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100 last:mb-0">
      <div>
        <div className="text-sm font-semibold text-amber-900">{title}</div>
        <div className="text-xs text-amber-800/80">{text}</div>
      </div>
      <ChevronRight size={16} className="text-amber-800/70" />
    </div>
  );
}

function CalendarMonth({ year, month, highlightDay }) {
  // month: 1-12
  const first = new Date(year, month - 1, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDay + 1;
    return day >= 1 && day <= daysInMonth ? day : '';
  });
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-extrabold">{first.toLocaleString('en-US', { month: 'long' })} {year}</h3>
        <div className="text-slate-400">⋮</div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => <div key={d}>{d}</div>)}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2 text-center">
        {cells.map((d, i) => (
          <div key={i} className={"h-9 rounded-lg ring-1 ring-slate-200 " + (d === highlightDay ? 'bg-emerald-600 font-semibold text-white' : 'bg-white')}>{d || ''}</div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

export default function ExploreFiltersBar({ onSearch }) {
  const [filters, setFilters] = useState({
    location: '',
    dateIn: '',
    dateOut: '',
    guests: 1
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    onSearch?.(filters);
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full flex-col gap-3 rounded-2xl bg-white/90 p-3 shadow-lg ring-1 ring-slate-200 backdrop-blur md:flex-row md:items-center md:gap-0"
    >
      <Field icon={<MapPin size={16} />} label="Location">
        <input
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Ex: Florianópolis"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </Field>

      <Divider />

      <Field icon={<Calendar size={16} />} label="Check-in">
        <input
          type="date"
          name="dateIn"
          value={filters.dateIn}
          onChange={handleChange}
          className="w-full bg-transparent text-sm outline-none"
        />
      </Field>

      <Divider />

      <Field icon={<Calendar size={16} />} label="Check-out">
        <input
          type="date"
          name="dateOut"
          value={filters.dateOut}
          onChange={handleChange}
          className="w-full bg-transparent text-sm outline-none"
        />
      </Field>

      <Divider />

      <Field icon={<Users size={16} />} label="Hóspedes">
        <input
          type="number"
          name="guests"
          min={1}
          value={filters.guests}
          onChange={handleChange}
          className="w-16 bg-transparent text-sm outline-none"
        />
      </Field>

      <div className="md:ml-auto md:pl-3">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-500 md:w-auto"
        >
          <Search size={16} />
          Search
        </button>
      </div>
    </form>
  );
}

function Field({ icon, label, children }) {
  return (
    <label className="flex flex-col gap-1 px-2 py-1 md:min-w-[150px]">
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {icon} {label}
      </span>
      {children}
    </label>
  );
}

function Divider() {
  return <span className="hidden h-10 w-px bg-slate-200 md:block" />;
}
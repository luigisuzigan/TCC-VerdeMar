export default function HeroSection() {
  return (
    <div className="relative w-full h-[170px] -mt-8 bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/60 via-blue-500/50 to-teal-600/60"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent"></div>
    </div>
  );
}

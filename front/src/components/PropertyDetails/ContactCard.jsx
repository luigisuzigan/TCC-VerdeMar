import { Shield, MessageCircle } from 'lucide-react';

export default function ContactCard({ property, formatCurrency }) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-4">
        {/* Contact Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-1">Entre em contato</p>
            <p className="text-sm text-slate-500">Agende uma visita ou tire suas dúvidas</p>
          </div>

          <div className="space-y-3 mb-6">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              Solicitar tour
            </button>
            <button className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Entrar em contato
            </button>
          </div>

          {/* Property Info */}
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Código do imóvel</span>
              <span className="font-semibold text-slate-900">{property.id}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Cidade</span>
              <span className="font-semibold text-slate-900">{property.city}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Estado</span>
              <span className="font-semibold text-slate-900">{property.state}</span>
            </div>
          </div>
        </div>

        {/* Banner com efeito de onda e botão */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-8 shadow-xl">
          {/* Efeito de ondas animadas melhorado */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 wave-animation-1"></div>
            <div className="absolute inset-0 wave-animation-2"></div>
            <div className="absolute inset-0 wave-animation-3"></div>
          </div>

          {/* Círculos decorativos flutuantes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-300/20 rounded-full blur-3xl"></div>

          {/* Conteúdo do banner */}
          <div className="relative z-10 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/30">
                <MessageCircle className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.5} />
              </div>
              <h3 className="text-white font-bold text-xl mb-2 drop-shadow-md">
                Tire suas dúvidas
              </h3>
              <p className="text-white/95 text-sm font-medium drop-shadow">
                Fale diretamente com o vendedor
              </p>
            </div>
            
            <button className="w-full py-3.5 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-2xl shadow-xl">
              Fale com o vendedor
            </button>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-emerald-900 text-sm mb-1">
                Informação verificada
              </h3>
              <p className="text-xs text-emerald-700">
                Este imóvel foi verificado pela nossa equipe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos das ondas animadas */}
      <style>{`
        @keyframes windWave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .wave-animation-1 {
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 20%,
            rgba(255, 255, 255, 0.15) 40%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.15) 60%,
            transparent 80%,
            transparent 100%
          );
          animation: windWave 3s ease-in-out infinite;
          width: 200%;
        }

        .wave-animation-2 {
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 30%,
            rgba(147, 197, 253, 0.2) 45%,
            rgba(147, 197, 253, 0.35) 50%,
            rgba(147, 197, 253, 0.2) 55%,
            transparent 70%,
            transparent 100%
          );
          animation: windWave 4s ease-in-out infinite;
          animation-delay: 0.5s;
          width: 200%;
        }

        .wave-animation-3 {
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 25%,
            rgba(125, 211, 252, 0.18) 42%,
            rgba(125, 211, 252, 0.28) 50%,
            rgba(125, 211, 252, 0.18) 58%,
            transparent 75%,
            transparent 100%
          );
          animation: windWave 5s ease-in-out infinite;
          animation-delay: 1s;
          width: 200%;
        }
      `}</style>
    </div>
  );
}

import { Shield, MessageCircle } from 'lucide-react';

export default function ContactCard({ property, formatCurrency }) {
  // Função para abrir WhatsApp
  const handleWhatsAppContact = () => {
    const phone = '5519981602372'; // Número do WhatsApp (substitua pelo número real)
    const message = `Olá! Tenho interesse no imóvel: ${property.title} (Cód: ${property.id})`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-4">
        {/* Contact Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-1">Entre em contato</p>
            <p className="text-sm text-slate-500">Fale conosco pelo WhatsApp</p>
          </div>

          <div className="mb-6">
            <button 
              onClick={handleWhatsAppContact}
              className="w-full py-3.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Entre em contato via WhatsApp
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
    </div>
  );
}

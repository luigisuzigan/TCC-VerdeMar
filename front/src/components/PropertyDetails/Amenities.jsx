import { 
  Wifi, Snowflake, Utensils, Car, Tv, Wind, 
  Waves, Dumbbell, Trees, PawPrint, Zap, Check 
} from 'lucide-react';

export default function Amenities({ property }) {
  const amenitiesMap = {
    'Piscina': { icon: Waves, label: 'Piscina' },
    'Academia': { icon: Dumbbell, label: 'Academia' },
    'Jardim': { icon: Trees, label: 'Área verde / Jardim' },
    'Pet Friendly': { icon: PawPrint, label: 'Permite animais de estimação' },
    'Gerador': { icon: Zap, label: 'Gerador de energia' },
  };

  const defaultAmenities = [
    { icon: Wifi, label: 'Wi-Fi' },
    { icon: Snowflake, label: 'Ar condicionado' },
    { icon: Utensils, label: 'Cozinha equipada' },
    { icon: Car, label: `Estacionamento - ${property.parkingSpaces || 2} ${property.parkingSpaces === 1 ? 'vaga' : 'vagas'}` },
    { icon: Tv, label: 'TV a cabo' },
    { icon: Wind, label: 'Ventilação natural' },
  ];

  const propertyAmenities = property.amenities || [];

  return (
    <div className="border-t border-slate-200 pt-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">O que este lugar oferece</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Comodidades padrão */}
        {defaultAmenities.map((amenity, idx) => {
          const Icon = amenity.icon;
          return (
            <div key={idx} className="flex items-center gap-4 py-3">
              <Icon size={24} className="text-slate-700" />
              <span className="text-slate-900">{amenity.label}</span>
            </div>
          );
        })}

        {/* Comodidades específicas da propriedade */}
        {Array.isArray(propertyAmenities) && propertyAmenities.map((amenity, idx) => {
          const amenityConfig = amenitiesMap[amenity];
          if (amenityConfig) {
            const Icon = amenityConfig.icon;
            return (
              <div key={`special-${idx}`} className="flex items-center gap-4 py-3">
                <Icon size={24} className="text-slate-700" />
                <span className="text-slate-900">{amenityConfig.label}</span>
              </div>
            );
          } else {
            return (
              <div key={`other-${idx}`} className="flex items-center gap-4 py-3">
                <Check size={24} className="text-slate-700" />
                <span className="text-slate-900">{amenity}</span>
              </div>
            );
          }
        })}
      </div>

      {propertyAmenities.length > 10 && (
        <button className="mt-6 px-6 py-3 border border-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
          Mostrar todas as {propertyAmenities.length + defaultAmenities.length} comodidades
        </button>
      )}
    </div>
  );
}

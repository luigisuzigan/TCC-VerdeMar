import { useState, useEffect } from 'react';
import { FileText, Image as ImageIcon, Star, Info, Plus, Trash2, Sparkles } from 'lucide-react';

export default function IdentificationSection({ 
  model, 
  update, 
  imagesText, 
  setImagesText, 
  imageUrls 
}) {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [images, setImages] = useState(imageUrls);

  // Sincronizar com imageUrls quando mudar (modo edição)
  useEffect(() => {
    setImages(imageUrls);
  }, [imageUrls.join(',')]);

  // Adicionar imagem
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const updatedImages = [...images, newImageUrl.trim()];
      setImages(updatedImages);
      setImagesText(updatedImages.join('\n'));
      setNewImageUrl('');
    }
  };

  // Remover imagem
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImagesText(updatedImages.join('\n'));
  };

  // Sistema de estrelas melhorado
  const rating = parseFloat(model.rating) || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  const getEmojiAndColor = (rating) => {
    if (rating === 0) return { emoji: '', color: 'text-slate-400', bg: 'bg-slate-100' };
    if (rating < 5) return { emoji: '😐 Regular', color: 'text-orange-600', bg: 'bg-orange-100' };
    if (rating < 7) return { emoji: '👍 Bom', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (rating < 9) return { emoji: '😃 Ótimo', color: 'text-green-600', bg: 'bg-green-100' };
    if (rating < 10) return { emoji: '🤩 Excelente', color: 'text-purple-600', bg: 'bg-purple-100' };
    return { emoji: '🏆 Perfeito', color: 'text-amber-600', bg: 'bg-amber-100' };
  };
  
  const emojiData = getEmojiAndColor(rating);

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6 text-center">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <FileText size={32} />
          📝 IDENTIFICAÇÃO DO IMÓVEL
        </h2>
        <p className="text-emerald-50 text-sm mt-2">Informações principais e destaque do anúncio</p>
      </div>

      {/* Conteúdo */}
      <div className="p-8 space-y-8">
        
        {/* 1. TÍTULO */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-slate-900">
              Título do Anúncio
            </span>
            <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
              Obrigatório
            </span>
          </label>
          <input
            type="text"
            value={model.title}
            onChange={(e) => update('title', e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 transition-all"
            placeholder="Ex: Casa de Praia Luxuosa com Vista Panorâmica do Mar"
            maxLength={120}
            required
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-500">
              Este título aparece nos resultados de busca
            </p>
            <span className={`text-sm font-semibold ${
              model.title.length > 100 
                ? 'text-amber-600' 
                : 'text-slate-600'
            }`}>
              {model.title.length}/120
            </span>
          </div>
        </div>

        <div className="border-t border-slate-200"></div>

        {/* 2. DESCRIÇÃO */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-slate-900">
              Descrição Detalhada
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
              Opcional
            </span>
          </label>
          <textarea
            value={model.description}
            onChange={(e) => update('description', e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 transition-all"
            rows={6}
            maxLength={7000}
            placeholder="Descreva os diferenciais do imóvel, localização privilegiada, acabamentos de luxo, infraestrutura completa do bairro, proximidade de pontos importantes, etc."
          />
          <p className="text-sm text-slate-500 mt-2 flex items-center justify-between">
            <span>Destaque os pontos fortes e diferenciais do imóvel</span>
            <span className={`font-semibold ${model.description.length > 6500 ? 'text-amber-600' : 'text-slate-600'}`}>
              {model.description.length}/7000
            </span>
          </p>
        </div>

        <div className="border-t border-slate-200"></div>

        {/* 3. IMAGENS */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon size={20} className="text-emerald-600" />
              📸 Imagens do Imóvel
            </span>
          </label>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-emerald-800 flex items-center gap-2">
              <Info size={16} />
              💡 A primeira imagem será automaticamente a imagem principal (capa)
            </p>
          </div>

          {/* Campo para adicionar imagem */}
          <div className="flex gap-3 mb-6">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddImage()}
              className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Cole a URL da imagem aqui..."
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              Adicionar
            </button>
          </div>

          {/* Preview das imagens */}
          {images.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center justify-between">
                <span>🖼️ Imagens Adicionadas ({images.length})</span>
                {images.length < 3 && (
                  <span className="text-xs text-amber-600 flex items-center gap-1">
                    <Info size={12} />
                    Adicione pelo menos 3 imagens
                  </span>
                )}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-200">
                      <img
                        src={url}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Imagem+Inv%C3%A1lida';
                        }}
                      />
                      {index === 0 && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg">
                          <Star size={14} fill="white" />
                          PRINCIPAL
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                    <p className="text-xs text-slate-600 mt-2 text-center font-medium">
                      Imagem {index + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200"></div>

        {/* 4. AVALIAÇÃO - ESTRELAS AMARELAS BONITAS */}
        <div>
          <label className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Star size={20} className="text-amber-500" fill="#f59e0b" />
              ⭐ Avaliação do Imóvel
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
              Opcional
            </span>
          </label>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-2xl p-6 shadow-inner">
            <p className="text-sm text-slate-700 mb-4 font-semibold">Clique nas estrelas ou digite o valor (0 a 10):</p>
            
            {/* Estrelas clicáveis BONITAS + Input + Status na mesma linha */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Estrelas amarelas grandes */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, index) => {
                  const starNumber = index + 1;
                  const isFilled = starNumber <= fullStars;
                  const isHalf = starNumber === fullStars + 1 && hasHalfStar;
                  
                  return (
                    <button
                      key={starNumber}
                      type="button"
                      onClick={() => update('rating', starNumber.toString())}
                      className="relative transition-all hover:scale-125 focus:outline-none focus:scale-125"
                      title={`${starNumber}/10`}
                    >
                      {isFilled ? (
                        <Star 
                          size={32} 
                          className="text-amber-400 drop-shadow-md" 
                          fill="#fbbf24" 
                          strokeWidth={1.5}
                        />
                      ) : isHalf ? (
                        <div className="relative">
                          <Star 
                            size={32} 
                            className="text-amber-400" 
                            fill="none" 
                            strokeWidth={1.5}
                          />
                          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                            <Star 
                              size={32} 
                              className="text-amber-400" 
                              fill="#fbbf24" 
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>
                      ) : (
                        <Star 
                          size={32} 
                          className="text-slate-300 hover:text-amber-300" 
                          fill="none" 
                          strokeWidth={1.5}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Input numérico */}
              <input
                type="number"
                step="0.5"
                value={model.rating || 0}
                onChange={(e) => update('rating', e.target.value)}
                className="w-28 px-4 py-3 border-2 border-slate-300 rounded-xl text-center font-black text-2xl text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                min={0}
                max={10}
                placeholder="0.0"
              />

              {/* Status/Emoji na mesma linha */}
              {rating > 0 && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-lg ${emojiData.bg} ${emojiData.color} shadow-md`}>
                  <span className="text-2xl">{rating.toFixed(1)}</span>
                  <span>/10</span>
                  <span className="ml-2">{emojiData.emoji}</span>
                </div>
              )}
            </div>

            {/* Dica */}
            <p className="text-xs text-slate-500 mt-4 flex items-center gap-1">
              <Info size={12} />
              Avalie de 0 a 10 considerando: localização, acabamento, conservação e custo-benefício
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

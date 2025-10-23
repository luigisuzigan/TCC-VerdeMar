import { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Check } from 'lucide-react';

export default function ImageCropModal({ image, onSave, onClose }) {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imgRef = useRef(new Image());

  const CANVAS_SIZE = 350;
  const CROP_RADIUS = 125; // Raio do círculo de corte

  useEffect(() => {
    imgRef.current.src = image;
    imgRef.current.onload = () => {
      drawCanvas();
    };
  }, [image]);

  useEffect(() => {
    drawCanvas();
  }, [zoom, rotation, position]);

  function drawCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = imgRef.current;
    
    if (!img.complete) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Salvar estado
    ctx.save();

    // Centralizar e aplicar transformações
    ctx.translate(canvas.width / 2 + position.x, canvas.height / 2 + position.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Desenhar imagem centralizada
    ctx.drawImage(
      img,
      -img.width / 2,
      -img.height / 2,
      img.width,
      img.height
    );

    ctx.restore();

    // Desenhar círculo de corte (overlay)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, CROP_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Desenhar borda do círculo
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, CROP_RADIUS, 0, Math.PI * 2);
    ctx.stroke();
  }

  function handleMouseDown(e) {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleTouchStart(e) {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - rect.left - position.x,
      y: touch.clientY - rect.top - position.y,
    });
  }

  function handleTouchMove(e) {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    setPosition({
      x: touch.clientX - rect.left - dragStart.x,
      y: touch.clientY - rect.top - dragStart.y,
    });
  }

  function handleTouchEnd() {
    setIsDragging(false);
  }

  function handleSave() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    // Criar canvas temporário para o resultado final
    const finalCanvas = document.createElement('canvas');
    const finalSize = 300;
    finalCanvas.width = finalSize;
    finalCanvas.height = finalSize;
    const finalCtx = finalCanvas.getContext('2d');

    // Criar círculo de corte
    finalCtx.save();
    finalCtx.beginPath();
    finalCtx.arc(finalSize / 2, finalSize / 2, finalSize / 2, 0, Math.PI * 2);
    finalCtx.clip();

    // Calcular escala para o canvas final
    const scale = finalSize / (CROP_RADIUS * 2);

    // Aplicar transformações
    finalCtx.translate(finalSize / 2 + position.x * scale, finalSize / 2 + position.y * scale);
    finalCtx.rotate((rotation * Math.PI) / 180);
    finalCtx.scale(zoom * scale, zoom * scale);

    // Desenhar imagem
    finalCtx.drawImage(
      img,
      -img.width / 2,
      -img.height / 2,
      img.width,
      img.height
    );

    finalCtx.restore();

    // Converter para base64
    const croppedImage = finalCanvas.toDataURL('image/jpeg', 0.9);
    onSave(croppedImage);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 rounded-2xl bg-white p-4 md:p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold text-slate-900">Ajustar Imagem</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Canvas */}
        <div className="mb-4 flex justify-center overflow-hidden rounded-xl bg-slate-100">
          <canvas
            ref={canvasRef}
            width={350}
            height={350}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="cursor-move max-w-full h-auto"
            style={{ touchAction: 'none' }}
          />
        </div>

        {/* Controles */}
        <div className="space-y-3">
          {/* Zoom */}
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">Zoom</span>
              <span className="text-slate-500">{Math.round(zoom * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
              >
                <ZoomOut size={16} />
              </button>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1"
              />
              <button
                onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </div>

          {/* Rotação */}
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">Rotação</span>
              <span className="text-slate-500">{rotation}°</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRotation((rotation - 90 + 360) % 360)}
                className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
              >
                <RotateCw size={16} className="scale-x-[-1]" />
              </button>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="flex-1"
              />
              <button
                onClick={() => setRotation((rotation + 90) % 360)}
                className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
              >
                <RotateCw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Instruções */}
        <p className="mt-3 text-center text-xs md:text-sm text-slate-500">
          Arraste a imagem para posicionar • Use os controles para ajustar
        </p>

        {/* Botões de ação */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110"
          >
            <Check size={16} />
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}

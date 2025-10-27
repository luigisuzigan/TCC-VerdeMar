import prisma from '../prisma.js';

function toRow(data) {
  const result = { ...data, published: !!data.published };
  
  // Converter images para JSON string se necessário
  if (data.images) {
    result.images = typeof data.images === 'string' ? data.images : JSON.stringify(data.images);
    console.log('📸 [toRow] Processando images:', {
      tipo: typeof data.images,
      original: data.images,
      resultado: result.images,
      length: result.images.length
    });
  } else {
    result.images = '[]';
  }
  
  // Converter amenities para JSON string se necessário
  if (data.amenities) {
    result.amenities = typeof data.amenities === 'string' ? data.amenities : JSON.stringify(data.amenities);
  } else {
    result.amenities = '[]';
  }
  
  // Converter naturalConditions para JSON string se necessário
  if (data.naturalConditions) {
    result.naturalConditions = typeof data.naturalConditions === 'string' ? data.naturalConditions : JSON.stringify(data.naturalConditions);
  } else {
    result.naturalConditions = '[]';
  }
  
  // Garantir que mainImage seja string ou null
  if (data.mainImage !== undefined) {
    result.mainImage = data.mainImage ? String(data.mainImage) : null;
  }
  
  // Converter propertyCondition vazio para null
  if (data.propertyCondition === '') {
    result.propertyCondition = null;
  }
  
  return result;
}

function fromRow(row) {
  if (!row) return row;
  
  const result = { ...row };
  
  console.log('📦 [fromRow] Processando:', {
    id: row.id?.substring(0, 8),
    title: row.title,
    imagesTipo: typeof row.images,
    imagesValor: row.images,
    imagesLength: row.images?.length
  });
  
  // Parse images
  try {
    if (Array.isArray(row.images)) {
      console.log('⚠️ [fromRow] images já é array!', row.images);
      result.images = row.images;
    } else {
      console.log('🔄 [fromRow] Fazendo parse de images:', row.images);
      result.images = JSON.parse(row.images || '[]');
      console.log('✅ [fromRow] Parse OK:', result.images);
    }
  } catch (error) {
    console.error('❌ [fromRow] Erro no parse de images:', error.message);
    result.images = [];
  }
  
  // Parse amenities
  try {
    result.amenities = Array.isArray(row.amenities)
      ? row.amenities
      : JSON.parse(row.amenities || '[]');
  } catch {
    result.amenities = [];
  }
  
  // Parse naturalConditions
  try {
    result.naturalConditions = Array.isArray(row.naturalConditions)
      ? row.naturalConditions
      : JSON.parse(row.naturalConditions || '[]');
  } catch {
    result.naturalConditions = [];
  }
  
  return result;
}

export async function listProperties({ 
  search, 
  city, 
  country, 
  minPrice, 
  maxPrice, 
  minArea,
  maxArea,
  types,
  minBedrooms,
  minBathrooms,
  minParkingSpaces,
  minSuites,
  neighborhood,
  minCondoFee,
  maxCondoFee,
  minFloor,
  maxFloor,
  minYearBuilt,
  category,
  amenities,
  condoAmenities,
  condition,
  styles,
  sortBy = 'default',
  limit = 20, 
  offset = 0, 
  published = true 
}) {
  const where = {
    AND: [
      published !== undefined && published !== null ? { published: published === true || published === 'true' } : {},
      search
        ? { OR: [
            { title: { contains: String(search) } },
            { description: { contains: String(search) } },
            { city: { contains: String(search) } },
            { country: { contains: String(search) } },
            { neighborhood: { contains: String(search) } },
          ] }
        : {},
      city ? { city: { contains: String(city) } } : {},
      country ? { country: { contains: String(country) } } : {},
      neighborhood ? { neighborhood: { contains: String(neighborhood) } } : {},
      category ? { category: String(category) } : {},
      styles ? { style: { in: String(styles).split(',').map(s => s.trim()) } } : {},
      minPrice != null ? { price: { gte: Number(minPrice) } } : {},
      maxPrice != null ? { price: { lte: Number(maxPrice) } } : {},
      minArea != null ? { area: { gte: Number(minArea) } } : {},
      maxArea != null ? { area: { lte: Number(maxArea) } } : {},
      types ? { type: { in: String(types).split(',').map(t => t.trim()) } } : {},
      minBedrooms != null ? { beds: { gte: Number(minBedrooms) } } : {},
      minBathrooms != null ? { baths: { gte: Number(minBathrooms) } } : {},
      minParkingSpaces != null ? { parkingSpaces: { gte: Number(minParkingSpaces) } } : {},
      minSuites != null ? { suites: { gte: Number(minSuites) } } : {},
      minCondoFee != null ? { condoFee: { gte: Number(minCondoFee) } } : {},
      maxCondoFee != null ? { condoFee: { lte: Number(maxCondoFee) } } : {},
      minFloor != null ? { floor: { gte: Number(minFloor) } } : {},
      maxFloor != null ? { floor: { lte: Number(maxFloor) } } : {},
      minYearBuilt != null ? { yearBuilt: { gte: Number(minYearBuilt) } } : {},
    ].filter(Boolean),
  };

  // Ordenação
  let orderBy = { createdAt: 'desc' };
  switch (sortBy) {
    case 'price-asc':
      orderBy = { price: 'asc' };
      break;
    case 'price-desc':
      orderBy = { price: 'desc' };
      break;
    case 'area-asc':
      orderBy = { area: 'asc' };
      break;
    case 'area-desc':
      orderBy = { area: 'desc' };
      break;
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
  }

  const [total, rows] = await Promise.all([
    prisma.property.count({ where }),
    prisma.property.findMany({ where, skip: Number(offset), take: Number(limit), orderBy }),
  ]);
  const items = rows.map(fromRow);
  return { total, items };
}

export async function getProperty(id) {
  const row = await prisma.property.findUnique({ where: { id } });
  return fromRow(row);
}

export async function createProperty(data) {
  try {
    const processedData = toRow(data);
    console.log('💾 Criando imóvel com dados:', { 
      title: processedData.title, 
      type: processedData.type,
      hasImages: processedData.images !== '[]',
      hasMainImage: !!processedData.mainImage
    });
    
    const row = await prisma.property.create({ data: processedData });
    console.log('✅ Imóvel criado com ID:', row.id);
    return fromRow(row);
  } catch (error) {
    console.error('❌ Erro ao criar imóvel:', error.message);
    throw error;
  }
}

export async function updateProperty(id, data) {
  try {
    const processedData = toRow(data);
    
    // Remover campos que não existem no schema ou não podem ser alterados
    const { userId, reviewCount, ...updateData } = processedData;
    
    console.log('💾 Atualizando imóvel:', id, {
      title: updateData.title,
      hasImages: updateData.images !== '[]',
      hasMainImage: !!updateData.mainImage
    });
    
    const row = await prisma.property.update({ 
      where: { id }, 
      data: updateData 
    });
    console.log('✅ Imóvel atualizado:', id);
    return fromRow(row);
  } catch (error) {
    console.error('❌ Erro ao atualizar imóvel:', id, error.message);
    if (error.code === 'P2025') {
      return null; // Imóvel não encontrado
    }
    throw error;
  }
}

export async function deleteProperty(id) {
  await prisma.property.delete({ where: { id } });
  return true;
}

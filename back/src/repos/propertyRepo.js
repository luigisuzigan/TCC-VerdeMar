import { prisma } from '../prisma.js';

function toRow(data) {
  return { ...data, images: JSON.stringify(data.images ?? []), published: !!data.published };
}

function fromRow(row) {
  if (!row) return row;
  let images = [];
  try { images = Array.isArray(row.images) ? row.images : JSON.parse(row.images || '[]'); } catch {}
  return { ...row, images };
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
  amenities,
  condoAmenities,
  condition,
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
          ] }
        : {},
      city ? { city: { contains: String(city) } } : {},
      country ? { country: { contains: String(country) } } : {},
      minPrice != null ? { price: { gte: Number(minPrice) } } : {},
      maxPrice != null ? { price: { lte: Number(maxPrice) } } : {},
      minArea != null ? { area: { gte: Number(minArea) } } : {},
      maxArea != null ? { area: { lte: Number(maxArea) } } : {},
      types ? { type: { in: String(types).split(',').map(t => t.trim()) } } : {},
      minBedrooms != null ? { beds: { gte: Number(minBedrooms) } } : {},
      minBathrooms != null ? { baths: { gte: Number(minBathrooms) } } : {},
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
  const row = await prisma.property.create({ data: toRow(data) });
  return fromRow(row);
}

export async function updateProperty(id, data) {
  const row = await prisma.property.update({ where: { id }, data: toRow(data) });
  return fromRow(row);
}

export async function deleteProperty(id) {
  await prisma.property.delete({ where: { id } });
  return true;
}

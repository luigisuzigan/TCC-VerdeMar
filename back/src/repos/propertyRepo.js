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

export async function listProperties({ search, city, country, minPrice, maxPrice, limit = 20, offset = 0, published = true }) {
  const where = {
    AND: [
      published !== undefined && published !== null ? { published: published === true || published === 'true' } : {},
      search
        ? { OR: [
            { title: { contains: String(search), mode: 'insensitive' } },
            { description: { contains: String(search), mode: 'insensitive' } },
            { city: { contains: String(search), mode: 'insensitive' } },
            { country: { contains: String(search), mode: 'insensitive' } },
          ] }
        : {},
      city ? { city: { equals: String(city), mode: 'insensitive' } } : {},
      country ? { country: { equals: String(country), mode: 'insensitive' } } : {},
      minPrice != null ? { price: { gte: Number(minPrice) } } : {},
      maxPrice != null ? { price: { lte: Number(maxPrice) } } : {},
    ],
  };
  const [total, rows] = await Promise.all([
    prisma.property.count({ where }),
    prisma.property.findMany({ where, skip: Number(offset), take: Number(limit), orderBy: { createdAt: 'desc' } }),
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

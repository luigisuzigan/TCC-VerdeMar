import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { authMiddleware, requireAdmin } from '../auth/middleware.js';
import { createProperty, deleteProperty, getProperty, listProperties, updateProperty } from '../repos/propertyRepo.js';
import { updatePropertyNearbyPlaces } from '../services/nearbyPlacesService.js';
import prisma from '../prisma.js';

const router = Router();

const listValidators = [
  query('limit').optional().isInt({ min: 1, max: 2000 }),
  query('offset').optional().isInt({ min: 0 }),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
  query('minArea').optional().isInt({ min: 0 }),
  query('maxArea').optional().isInt({ min: 0 }),
  query('types').optional().isString(),
  query('minBedrooms').optional().isInt({ min: 0 }),
  query('minBathrooms').optional().isInt({ min: 0 }),
  query('minParkingSpaces').optional().isInt({ min: 0 }),
  query('minSuites').optional().isInt({ min: 0 }),
  query('sortBy').optional().isString(),
  query('published').optional().isBoolean().toBoolean(),
];

router.get('/', listValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { 
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
    sortBy,
    limit = 20, 
    offset = 0, 
    published = true 
  } = req.query;
  
  console.log('List properties request:', { limit, offset, published, city, search });
  
  const result = await listProperties({ 
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
    sortBy,
    limit: Number(limit) || 20, 
    offset: Number(offset) || 0, 
    published 
  });
  
  res.json(result);
});

router.get('/:id', [param('id').isString()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const item = await getProperty(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

const propertyValidators = [
  body('title').isString().isLength({ min: 1, max: 120 }),
  body('description').optional().isString().isLength({ max: 2000 }),
  body('type').optional().isString().isLength({ max: 50 }),
  body('price').isFloat({ min: 0 }),
  body('currency').isIn(['BRL', 'USD', 'EUR']),
  body('address').optional().isString().isLength({ max: 200 }),
  body('city').isString().isLength({ min: 1, max: 80 }),
  body('state').optional().isString().isLength({ max: 50 }),
  body('country').isString().isLength({ min: 1, max: 80 }),
  body('zipCode').optional().isString().isLength({ max: 20 }),
  body('latitude').optional().isFloat({ min: -90, max: 90 }),
  body('longitude').optional().isFloat({ min: -180, max: 180 }),
  body('area').isInt({ min: 0 }).toInt(),
  body('beds').isInt({ min: 0 }).toInt(),
  body('baths').isInt({ min: 0 }).toInt(),
  body('guests').isInt({ min: 0 }).toInt(),
  body('amenities').optional().isString(), // JSON string
  body('style').optional().isString().isLength({ max: 50 }),
  body('images').optional().isString(), // JSON string
  body('mainImage').optional().isURL(),
  body('rating').optional().isFloat({ min: 0, max: 5 }).toFloat(),
  body('reviewCount').optional().isInt({ min: 0 }).toInt(),
  body('published').optional().isBoolean().toBoolean(),
  body('featured').optional().isBoolean().toBoolean(),
];

router.post('/', authMiddleware, requireAdmin, propertyValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
  // Adicionar userId do usuário autenticado
  const data = {
    ...req.body,
    userId: req.user.id
  };
  
  const item = await createProperty(data);
  res.status(201).json(item);
});

router.put('/:id', authMiddleware, requireAdmin, [param('id').isString(), ...propertyValidators], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const updated = await updateProperty(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.patch('/:id/publish', authMiddleware, requireAdmin, [param('id').isString(), body('published').isBoolean()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const updated = await updateProperty(req.params.id, { published: req.body.published });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/:id', authMiddleware, requireAdmin, [param('id').isString()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const ok = await deleteProperty(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

// POST /api/properties/:id/nearby-places
// Busca e atualiza locais próximos de um imóvel usando Google Maps API
router.post('/:id/nearby-places', authMiddleware, requireAdmin, [param('id').isString()], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const propertyId = req.params.id;
    
    // Verificar se o imóvel existe
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { id: true, latitude: true, longitude: true },
    });

    if (!property) {
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }

    if (!property.latitude || !property.longitude) {
      return res.status(400).json({ 
        error: 'Imóvel não possui coordenadas. Adicione latitude e longitude primeiro.' 
      });
    }

    console.log(`🔍 Buscando locais próximos para imóvel #${propertyId}`);

    // Buscar e atualizar locais próximos
  const updated = await updatePropertyNearbyPlaces(prisma, propertyId);
    
    const nearbyPlaces = JSON.parse(updated.nearbyPlaces || '{}');
    const totalPlaces = Object.values(nearbyPlaces).reduce((sum, arr) => sum + arr.length, 0);

    console.log(`✅ ${totalPlaces} locais encontrados e salvos`);

    res.json({
      success: true,
      message: `${totalPlaces} locais próximos encontrados e atualizados`,
      nearbyPlaces: nearbyPlaces,
      summary: Object.entries(nearbyPlaces).map(([category, places]) => ({
        category,
        count: places.length,
      })),
    });
  } catch (error) {
    console.error('❌ Erro ao buscar locais próximos:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar locais próximos', 
      message: error.message 
    });
  }
});

export default router;

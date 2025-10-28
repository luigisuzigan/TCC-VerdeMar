import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { authMiddleware, requireAdmin } from '../auth/middleware.js';
import { createProperty, deleteProperty, getProperty, listProperties, updateProperty } from '../repos/propertyRepo.js';
import { updatePropertyNearbyPlaces } from '../services/nearbyPlacesService.js';
import { validatePropertyFields } from '../config/propertyFieldsConfig.js';
import { trackPropertyView } from './trackingMiddleware.js';
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
  query('neighborhood').optional().isString(),
  query('minCondoFee').optional().isFloat({ min: 0 }),
  query('maxCondoFee').optional().isFloat({ min: 0 }),
  query('minFloor').optional().isInt({ min: 0 }),
  query('maxFloor').optional().isInt({ min: 0 }),
  query('minYearBuilt').optional().isInt({ min: 1900 }),
  query('category').optional().isString(),
  query('amenities').optional().isString(),
  query('condoAmenities').optional().isString(),
  query('condition').optional().isString(),
  query('styles').optional().isString(),
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
    sortBy,
    limit = 20, 
    offset = 0, 
    published = true 
  } = req.query;
  
  console.log('📋 List properties request:', { 
    limit, offset, published, city, search, category, neighborhood, styles,
    amenities, condoAmenities, condition
  });
  
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
    sortBy,
    limit: Number(limit) || 20, 
    offset: Number(offset) || 0, 
    published 
  });
  
  res.json(result);
});

router.get('/:id', [param('id').isString()], trackPropertyView, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const item = await getProperty(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// Endpoint para buscar locais próximos e atualizar o imóvel
router.post('/:id/nearby-places', [
  authMiddleware,
  param('id').isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const propertyId = req.params.id;
    
    // Verificar se o imóvel existe
    const property = await getProperty(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }

    // Verificar se o usuário é o dono do imóvel ou admin
    if (property.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Sem permissão para atualizar este imóvel' });
    }

    // Verificar se tem coordenadas
    if (!property.latitude || !property.longitude) {
      return res.status(400).json({ 
        error: 'Imóvel não possui coordenadas. Adicione latitude e longitude primeiro.' 
      });
    }

    // Buscar locais próximos e atualizar o imóvel
    const updated = await updatePropertyNearbyPlaces(prisma, propertyId);
    
    res.json({ 
      success: true, 
      message: 'Locais próximos atualizados com sucesso',
      nearbyPlaces: updated.nearbyPlaces 
    });
  } catch (error) {
    console.error('Erro ao buscar locais próximos:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar locais próximos', 
      details: error.message 
    });
  }
});

const propertyValidators = [
  body('title').isString().isLength({ min: 1, max: 120 }),
  body('description').optional().isString().isLength({ max: 2000 }),
  body('category').optional().isString().isIn(['Residencial', 'Comercial', 'Industrial', 'Terreno', 'Especial']),
  body('type').optional().isString().isLength({ max: 50 }),
  body('price').isFloat({ min: 0 }),
  body('currency').isIn(['BRL', 'USD', 'EUR']),
  body('address').optional().isString().isLength({ max: 200 }),
  body('city').isString().isLength({ min: 1, max: 80 }),
  body('state').optional().isString().isLength({ max: 50 }),
  body('country').isString().isLength({ min: 1, max: 80 }),
  body('neighborhood').optional().isString().isLength({ max: 100 }),
  body('zipCode').optional().isString().isLength({ max: 20 }),
  body('latitude').optional().isFloat({ min: -90, max: 90 }),
  body('longitude').optional().isFloat({ min: -180, max: 180 }),
  body('area').isInt({ min: 0 }).toInt(),
  body('beds').isInt({ min: 0 }).toInt(),
  body('baths').isInt({ min: 0 }).toInt(),
  body('guests').isInt({ min: 0 }).toInt(),
  body('suites').optional().isInt({ min: 0 }).toInt(),
  body('parkingSpaces').optional().isInt({ min: 0 }).toInt(),
  body('floor').optional().isInt({ min: 0 }).toInt(),
  body('totalFloors').optional().isInt({ min: 0 }).toInt(),
  body('condoFee').optional().isFloat({ min: 0 }),
  body('iptu').optional().isFloat({ min: 0 }),
  body('homeInsurance').optional().isFloat({ min: 0 }),
  body('yearBuilt').optional().isInt({ min: 1800 }),
  body('propertyCondition').optional().isString().isIn(['Novo', 'Seminovo', 'Usado', 'Reformado', '']),
  body('lotSize').optional().isInt({ min: 0 }).toInt(),
  body('amenities').optional().isString(), // JSON string
  body('naturalConditions').optional().isString(), // JSON string
  body('style').optional().isString().isLength({ max: 50 }),
  body('images').optional().isString(), // JSON string
  body('mainImage').optional().isString(),
  body('rating').optional().isFloat({ min: 0, max: 10 }).toFloat(),
  body('reviewCount').optional().isInt({ min: 0 }).toInt(),
  body('published').optional().isBoolean().toBoolean(),
  body('featured').optional().isBoolean().toBoolean(),
];

router.post('/', authMiddleware, requireAdmin, propertyValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Validação condicional de campos baseada no tipo
    const { type } = req.body;
    if (type) {
      const fieldErrors = validatePropertyFields(type, req.body);
      if (fieldErrors.length > 0) {
        return res.status(400).json({ 
          errors: fieldErrors.map(e => ({ 
            msg: e.message, 
            param: e.field, 
            type: e.type 
          }))
        });
      }
    }
    
    // Adicionar userId do usuário autenticado
    const data = {
      ...req.body,
      userId: req.user.id
    };
    
    const item = await createProperty(data);
    res.status(201).json(item);
  } catch (error) {
    console.error('Erro ao criar imóvel:', error);
    res.status(500).json({ 
      error: 'Erro ao criar imóvel',
      message: error.message 
    });
  }
});

router.put('/:id', authMiddleware, requireAdmin, [param('id').isString(), ...propertyValidators], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Validação condicional de campos baseada no tipo
    const { type } = req.body;
    if (type) {
      const fieldErrors = validatePropertyFields(type, req.body);
      if (fieldErrors.length > 0) {
        return res.status(400).json({ 
          errors: fieldErrors.map(e => ({ 
            msg: e.message, 
            param: e.field, 
            type: e.type 
          }))
        });
      }
    }
    
    console.log(`🔄 Atualizando imóvel ${req.params.id}`);
    const updated = await updateProperty(req.params.id, req.body);
    if (!updated) {
      console.error(`❌ Imóvel ${req.params.id} não encontrado`);
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }
    
    console.log(`✅ Imóvel ${req.params.id} atualizado com sucesso`);
    res.json(updated);
  } catch (error) {
    console.error('❌ Erro ao atualizar imóvel:', error);
    res.status(500).json({ 
      error: 'Erro ao atualizar imóvel',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
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

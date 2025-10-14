import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { authMiddleware, requireAdmin } from '../auth/middleware.js';
import { createProperty, deleteProperty, getProperty, listProperties, updateProperty } from '../repos/propertyRepo.js';

const router = Router();

const listValidators = [
  query('limit').optional().isInt({ min: 1, max: 100 }),
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
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
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
    limit, 
    offset, 
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
  body('description').optional().isString().isLength({ max: 800 }),
  body('price').isFloat({ min: 0 }),
  body('currency').isIn(['BRL']),
  body('city').isString().isLength({ min: 1, max: 80 }),
  body('country').isString().isLength({ min: 1, max: 80 }),
  body('area').isInt({ min: 0 }).toInt(),
  body('beds').isInt({ min: 0 }).toInt(),
  body('baths').isInt({ min: 0 }).toInt(),
  body('guests').isInt({ min: 0 }).toInt(),
  body('rating').optional().isFloat({ min: 0, max: 5 }).toFloat(),
  body('reviews').optional().isInt({ min: 0 }).toInt(),
  body('images').isArray(),
  body('images.*').isURL(),
  body('published').optional().isBoolean().toBoolean(),
];

router.post('/', authMiddleware, requireAdmin, propertyValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const item = await createProperty(req.body);
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

export default router;

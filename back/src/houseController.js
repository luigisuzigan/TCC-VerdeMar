import { db } from './db.js';
import House from './House.js';
import { houseSchema } from './userValidator.js';

// Get all houses
export const getAllHouses = async (req, res, next) => {
  try {
    const { type, location, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    
    let houses = [...db.houses];
    
    // Apply filters
    if (type) {
      houses = houses.filter(house => house.type === type);
    }
    
    if (location) {
      houses = houses.filter(house => 
        house.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (minPrice) {
      houses = houses.filter(house => house.price >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      houses = houses.filter(house => house.price <= parseInt(maxPrice));
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedHouses = houses.slice(startIndex, endIndex);
    
    res.json({
      houses: paginatedHouses,
      total: houses.length,
      page: parseInt(page),
      totalPages: Math.ceil(houses.length / limit)
    });
  } catch (error) {
    next(error);
  }
};

// Get single house
export const getHouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const house = db.houses.find(h => h.id === id);
    
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    
    res.json({ house });
  } catch (error) {
    next(error);
  }
};

// Create new house (protected route)
export const createHouse = async (req, res, next) => {
  try {
    const houseData = houseSchema.parse(req.body);
    
    const houseId = Date.now().toString();
    const house = new House({
      id: houseId,
      ...houseData,
      ownerId: req.user.id,
    });
    
    db.houses.push(house);
    
    res.status(201).json({
      message: 'House created successfully',
      house
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    next(error);
  }
};

// Update house (protected route)
export const updateHouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = houseSchema.partial().parse(req.body);
    
    const houseIndex = db.houses.findIndex(h => h.id === id);
    if (houseIndex === -1) {
      return res.status(404).json({ message: 'House not found' });
    }
    
    const house = db.houses[houseIndex];
    
    // Check ownership
    if (house.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this house' });
    }
    
    // Update house
    Object.assign(house, updates);
    
    res.json({
      message: 'House updated successfully',
      house
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    next(error);
  }
};

// Delete house (protected route)
export const deleteHouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const houseIndex = db.houses.findIndex(h => h.id === id);
    
    if (houseIndex === -1) {
      return res.status(404).json({ message: 'House not found' });
    }
    
    const house = db.houses[houseIndex];
    
    // Check ownership
    if (house.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this house' });
    }
    
    // Remove house
    db.houses.splice(houseIndex, 1);
    
    res.json({ message: 'House deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// House model for in-memory storage
export class House {
  constructor({ 
    id, 
    title, 
    description, 
    price, 
    location, 
    type = 'house', 
    bedrooms = 0, 
    bathrooms = 0, 
    area = 0,
    images = [],
    ownerId,
    createdAt = new Date() 
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.location = location;
    this.type = type; // 'house', 'apartment', 'land', 'commercial'
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.area = area;
    this.images = images;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
  }
}

export default House;

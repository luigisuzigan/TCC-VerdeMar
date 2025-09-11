import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const houseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be a positive number'),
  location: z.string().min(5, 'Location must be at least 5 characters'),
  type: z.enum(['house', 'apartment', 'land', 'commercial']).default('house'),
  bedrooms: z.number().min(0).default(0),
  bathrooms: z.number().min(0).default(0),
  area: z.number().positive().default(0),
  images: z.array(z.string().url()).default([]),
});

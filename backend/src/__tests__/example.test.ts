import request from 'supertest';
import app from '../app';

describe('Example API', () => {
  describe('GET /api/examples', () => {
    it('should return 200 and an array of examples', async () => {
      const response = await request(app).get('/api/examples');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/examples', () => {
    it('should create a new example', async () => {
      const newExample = {
        name: 'Test Example',
        description: 'Test Description',
      };

      const response = await request(app)
        .post('/api/examples')
        .send(newExample);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('name', newExample.name);
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/api/examples')
        .send({ description: 'Test Description' });

      expect(response.status).toBe(400);
    });
  });
});


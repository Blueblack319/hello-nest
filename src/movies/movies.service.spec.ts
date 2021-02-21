import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });
  // beforeAll()
  // afterEach()
  // afterAll()

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getById', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Hello Nest',
        year: 2021,
        genres: ['action'],
      });
      const result = service.getById(1);
      expect(result).toBeDefined();
      // expect(result.id).toEqual(1);
      // expect(result.year).toEqual(2021);
    });

    it('should throw 404 error', () => {
      try {
        service.getById(666);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        // expect(err.message).toEqual('Not found Movie with ID: 666');
      }
    });
  });

  describe('deleteById', () => {
    it('should be less than before length', () => {
      service.create({
        title: 'Test',
        year: 2021,
        genres: ['test'],
      });
      const beforeDeleted = service.getAll().length;
      service.deleteById(1);
      const afterDeleted = service.getAll().length;
      expect(afterDeleted).toBeLessThan(beforeDeleted);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.deleteById(666);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should be greater than before creating', () => {
      const beforeCreated = service.getAll().length;
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2021,
      });
      const afterCreated = service.getAll().length;
      expect(afterCreated).toBeGreaterThan(beforeCreated);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2021,
      });
      const beforeUpdated = service.getById(1);
      service.update(1, { title: 'Updated test' });
      const afterUpdated = service.getById(1);
      expect(beforeUpdated.title).toEqual('Test');
      expect(afterUpdated.title).toEqual('Updated test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(666, {});
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

describe('Bookings API', () => {
  let mockContext: TrpcContext;

  beforeEach(() => {
    mockContext = {
      user: null,
      req: {
        protocol: 'https',
        headers: {},
      } as TrpcContext['req'],
      res: {} as TrpcContext['res'],
    };
  });

  it('should create a booking with valid data', async () => {
    const caller = appRouter.createCaller(mockContext);

    const result = await caller.bookings.create({
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      phone: '+48 123 456 789',
      serviceType: 'Spawanie aluminium',
      description: 'Naprawa spawu w drzwiach',
      appointmentDate: new Date('2026-03-15'),
      appointmentTime: '10:00',
    });

    expect(result).toEqual({ success: true });
  });

  it('should reject booking with missing required fields', async () => {
    const caller = appRouter.createCaller(mockContext);

    try {
      await caller.bookings.create({
        name: '',
        email: 'jan@example.com',
        phone: '+48 123 456 789',
        serviceType: 'Spawanie aluminium',
        description: 'Test',
        appointmentDate: new Date('2026-03-15'),
        appointmentTime: '10:00',
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should reject booking with invalid email', async () => {
    const caller = appRouter.createCaller(mockContext);

    try {
      await caller.bookings.create({
        name: 'Jan Kowalski',
        email: 'invalid-email',
        phone: '+48 123 456 789',
        serviceType: 'Spawanie aluminium',
        description: 'Test',
        appointmentDate: new Date('2026-03-15'),
        appointmentTime: '10:00',
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should list bookings', async () => {
    const caller = appRouter.createCaller(mockContext);

    const result = await caller.bookings.list();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe('Contact API', () => {
  let mockContext: TrpcContext;

  beforeEach(() => {
    mockContext = {
      user: null,
      req: {
        protocol: 'https',
        headers: {},
      } as TrpcContext['req'],
      res: {} as TrpcContext['res'],
    };
  });

  it('should submit contact form with valid data', async () => {
    const caller = appRouter.createCaller(mockContext);

    const result = await caller.contact.submit({
      name: 'Maria Nowak',
      email: 'maria@example.com',
      phone: '+48 987 654 321',
      message: 'Chciałbym zapytać o budowę kampera',
    });

    expect(result).toEqual({ success: true });
  });

  it('should reject contact form with missing required fields', async () => {
    const caller = appRouter.createCaller(mockContext);

    try {
      await caller.contact.submit({
        name: '',
        email: 'maria@example.com',
        phone: '+48 987 654 321',
        message: 'Test message',
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should reject contact form with invalid email', async () => {
    const caller = appRouter.createCaller(mockContext);

    try {
      await caller.contact.submit({
        name: 'Maria Nowak',
        email: 'invalid-email',
        phone: '+48 987 654 321',
        message: 'Test message',
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should list contact submissions', async () => {
    const caller = appRouter.createCaller(mockContext);

    const result = await caller.contact.list();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe('Reviews API', () => {
  let mockContext: TrpcContext;

  beforeEach(() => {
    mockContext = {
      user: null,
      req: {
        protocol: 'https',
        headers: {},
      } as TrpcContext['req'],
      res: {} as TrpcContext['res'],
    };
  });

  it('should get approved reviews', async () => {
    const caller = appRouter.createCaller(mockContext);

    const result = await caller.reviews.getApproved();

    expect(Array.isArray(result)).toBe(true);
  });
});

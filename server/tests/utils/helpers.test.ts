import { getRandomInt } from '@/utils/helpers';

describe('Helpers tests', () => {
  describe('Function getRandomInt test', () => {
    const min = 20;
    const max = 30;
    const iterations = 50;

    it('Should return a number between 20 and 30 inclusive', () => {
      for (let i = 0; i < iterations; i++) {
        const result = getRandomInt(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it('generates different values over multiple calls', () => {
      const results = new Set<number>();
      const iterations = 50;

      for (let i = 0; i < iterations; i++) {
        results.add(getRandomInt(min, max));
      }

      expect(results.size).toBeGreaterThan(1);
    });
  });
});

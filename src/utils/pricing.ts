// Pricing constants and utilities
export const RATE_PER_MILE = 1.80;

export const calculateDeliveryCost = (miles: number): number => {
  if (miles <= 0) return 0;
  return Number((miles * RATE_PER_MILE).toFixed(2));
};
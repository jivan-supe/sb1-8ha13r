export type Domain = 'B2B' | 'B2C' | 'B2B2C';

export type Industry = 
  | 'Finance'
  | 'Travel & Tourism'
  | 'Healthcare'
  | 'Retail & E-commerce'
  | 'Technology & IT'
  | 'Education'
  | 'Media & Entertainment'
  | 'Real Estate'
  | 'Automotive'
  | 'Logistics & Supply Chain'
  | 'Energy & Utilities'
  | 'Agriculture'
  | 'Sports & Fitness'
  | 'Legal & Compliance'
  | 'Government & Public Sector';

export type ProductStage = 'LAUNCH' | 'PMF' | 'GROWTH' | 'MATURITY';

export interface Product {
  id: string;
  name: string;
  website: string;
  domain: Domain;
  industry: Industry;
  stage: ProductStage;
  createdAt: string;
  updatedAt: string;
}
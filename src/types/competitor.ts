import { Domain, Industry, ProductStage } from "./product";

export interface Competitor {
  id: string;
  name: string;
  website: string;
  domain?: Domain;
  description?: string;
  similarityScore: number;
  similarFeatures?: string[];
  uniqueFeatures?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CompetitorFormData {
  name: string;
  website: string;
  domain?: Domain;
  industry: Industry;
  stage: ProductStage;
}

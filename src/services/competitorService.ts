import api from './api';
import { Competitor, CompetitorFormData } from '../types/competitor';
import { mockCompetitors } from '../utils/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const competitorService = {
  async getCompetitors(): Promise<Competitor[]> {
    try {
      // Simulate API call
      await delay(1000);
      return [...mockCompetitors];
    } catch (error) {
      console.error('Error fetching competitors:', error);
      throw new Error('Failed to fetch competitors');
    }
  },

  async addCompetitor(data: CompetitorFormData): Promise<Competitor> {
    try {
      await delay(1000);
      const newCompetitor: Competitor = {
        id: crypto.randomUUID(),
        ...data,
        similarityScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        similarFeatures: ['Feature 1', 'Feature 2', 'Feature 3'],
        uniqueFeatures: ['Unique Feature 1', 'Unique Feature 2'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockCompetitors.push(newCompetitor);
      return newCompetitor;
    } catch (error) {
      console.error('Error adding competitor:', error);
      throw new Error('Failed to add competitor');
    }
  },

  async identifyCompetitors(): Promise<Competitor[]> {
    try {
      await delay(3000);
      const identifiedCompetitors: Competitor[] = [
        {
          id: crypto.randomUUID(),
          name: 'CloudTech Solutions',
          website: 'https://cloudtech.example.com',
          domain: 'Technology & IT',
          description: 'Cloud-native development platform',
          similarityScore: 88,
          similarFeatures: [
            'Cloud deployment',
            'Microservices architecture',
            'Container orchestration'
          ],
          uniqueFeatures: [
            'Serverless computing',
            'Edge computing capabilities'
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        // Add more identified competitors here
      ];
      return identifiedCompetitors;
    } catch (error) {
      console.error('Error identifying competitors:', error);
      throw new Error('Failed to identify competitors');
    }
  },

  async saveSelectedCompetitors(competitorIds: string[]): Promise<void> {
    try {
      await delay(1000);
      console.log('Saved competitor selection:', competitorIds);
    } catch (error) {
      console.error('Error saving competitor selection:', error);
      throw new Error('Failed to save competitor selection');
    }
  }
};
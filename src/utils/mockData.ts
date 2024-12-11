import { User } from '../types/auth';
import { Employee } from '../types/employee';
import { Competitor } from '../types/competitor';

export const mockUser: User = {
  id: '1',
  name: 'John Manager',
  email: 'john@company.com',
};

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    position: 'Frontend Developer',
    department: 'Engineering',
    joinedDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@company.com',
    position: 'Backend Developer',
    department: 'Engineering',
    joinedDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@company.com',
    position: 'UI Designer',
    department: 'Design',
    joinedDate: '2023-03-10',
  },
];

export const mockCompetitors: Competitor[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    website: 'https://techcorp.example.com',
    domain: 'Technology & IT',
    description: 'Leading provider of enterprise software solutions',
    similarityScore: 85,
    similarFeatures: [
      'User authentication',
      'Data analytics',
      'Cloud integration'
    ],
    uniqueFeatures: [
      'AI-powered recommendations',
      'Real-time collaboration'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'InnovateSoft',
    website: 'https://innovatesoft.example.com',
    domain: 'Technology & IT',
    description: 'Innovative software development company',
    similarityScore: 72,
    similarFeatures: [
      'Project management',
      'Team collaboration',
      'API integration'
    ],
    uniqueFeatures: [
      'Blockchain integration',
      'Advanced security features'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'DataFlow Systems',
    website: 'https://dataflow.example.com',
    domain: 'Technology & IT',
    description: 'Specialized in data processing solutions',
    similarityScore: 65,
    similarFeatures: [
      'Data visualization',
      'Export capabilities',
      'Custom reporting'
    ],
    uniqueFeatures: [
      'Machine learning models',
      'Predictive analytics'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
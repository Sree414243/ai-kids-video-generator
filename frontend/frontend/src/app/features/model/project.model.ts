export interface Project {
  _id: string;
  title: string;
  description: string;
  status: 'draft' | 'processing' | 'completed';
  createdAt: string;
  updatedAt: string;
}

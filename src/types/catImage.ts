export interface CatImage {
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  validated: boolean;
  owner: string;
  file: string;
  mimetype: string;
  size: number;
  url: string;
}
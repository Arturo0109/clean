
export class Correction {
  id: string;
  text: string;
  corrected: string;
  createdAt: Date;
  userId?: string;

  constructor(partial: Partial<Correction>) {
    Object.assign(this, partial);
  }
}

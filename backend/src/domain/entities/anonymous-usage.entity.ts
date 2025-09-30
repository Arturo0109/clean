export class AnonymousUsage {
  constructor(
    public readonly id: string,
    public readonly sessionId: string,
    public remaining: number,
    public readonly createdAt: Date
  ) {}
}

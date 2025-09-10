export class Usage {
  constructor(
    public readonly id: string,
    public userId: string | null,
    public createdAt: Date,
  ) {}
}

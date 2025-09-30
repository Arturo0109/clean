export class Usage {

    constructor(

    public readonly id: string,
    public readonly prompt: string,
    public readonly response: string,
    public readonly createdAt: Date,
    public readonly userId?: string
    ){}
}
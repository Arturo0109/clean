
export abstract class AiService {
    abstract correctText(text: string): Promise<string>;
}

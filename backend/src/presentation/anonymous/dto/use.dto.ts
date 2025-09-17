import { IsNotEmpty } from "class-validator";

export class UseDto {
    @IsNotEmpty()
    sessionId: string;
}
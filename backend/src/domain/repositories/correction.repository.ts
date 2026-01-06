
import { Correction } from '../entities/correction.entity';

export abstract class CorrectionRepository {
    abstract create(data: { text: string; corrected: string; userId: string }): Promise<Correction>;
}

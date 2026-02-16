import { SlaService } from './sla.service';
import { CreateSLADto, UpdateSLADto } from './dto/sla.dto';
export declare class SlaController {
    private readonly slaService;
    constructor(slaService: SlaService);
    findAll(): Promise<any>;
    getBreaches(slaId?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createSlaDto: CreateSLADto): Promise<any>;
    update(id: string, updateSlaDto: UpdateSLADto): Promise<any>;
    remove(id: string): Promise<any>;
}

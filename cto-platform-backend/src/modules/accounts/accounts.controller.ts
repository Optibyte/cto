import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('api/v1/accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Get()
    findAll() {
        return this.accountsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.accountsService.findOne(id);
    }
}

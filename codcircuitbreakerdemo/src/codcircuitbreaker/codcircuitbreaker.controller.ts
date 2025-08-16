import { Controller, Get } from '@nestjs/common';
import { CodcircuitbreakerService } from './codcircuitbreaker.service';

@Controller('codcb')
export class CodcircuitbreakerController {
    constructor( private readonly codCBService: CodcircuitbreakerService) {}

    @Get('api1')
    async callApi1() {
        try {
        const [api1Data] = await Promise.all([
            this.codCBService.requestWithBreaker('API_ONE', { method: 'GET', url: 'http://localhost:8080/hello' }),
        ]);

        return { api1: api1Data };
        } catch (error) {
        return { error: 'One or more APIs unavailable', details: error.message };
        }
    }

    @Get('api2')
    async callApi2() {
        try {
        const [api2Data] = await Promise.all([
            this.codCBService.requestWithBreaker('API_TWO', { method: 'GET', url: 'http://localhost:8080/hi' }),
        ]);

        return { api2: api2Data };
        } catch (error) {
        return { error: 'One or more APIs unavailable', details: error.message };
        }
    }

}

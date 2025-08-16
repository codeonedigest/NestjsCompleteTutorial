import { Injectable, Logger } from '@nestjs/common';
import * as CircuitBreaker from 'opossum';
import axios, { AxiosRequestConfig } from 'axios';


interface BreakerConfig {
  timeout: number;
  errorThresholdPercentage: number;
  resetTimeout: number;
}



@Injectable()
export class CodcircuitbreakerService {
    private readonly logger = new Logger(CodcircuitbreakerService.name);
    private breakers: Map<string, CircuitBreaker> = new Map();

    constructor() {
        // Define configs for each API
        const apiConfigs: Record<string, BreakerConfig> = {
        API_ONE: { timeout: 5000, errorThresholdPercentage: 50, resetTimeout: 10000 },
        API_TWO: { timeout: 3000, errorThresholdPercentage: 40, resetTimeout: 5000 },
        };

        // Create a breaker for each API
        Object.entries(apiConfigs).forEach(([key, config]) => {
        const breaker = new CircuitBreaker((opts: AxiosRequestConfig) => axios(opts), config);

        breaker.on('open', () => this.logger.warn(`${key} breaker OPEN`));
        breaker.on('halfOpen', () => this.logger.log(`${key} breaker HALF-OPEN`));
        breaker.on('close', () => this.logger.log(`${key} breaker CLOSED`));


        breaker.fallback(() => {
            this.logger.log(`${key} External service unavailable, returning fallback data.`);
            return { message: `${key} Service temporarily unavailable` };
        });

        this.breakers.set(key, breaker);

        });
    }

    public async requestWithBreaker(apiKey: string, requestOptions: AxiosRequestConfig): Promise<any> {
        this.logger.log('Requesting data with circuit breaker');

        const breaker = this.breakers.get(apiKey);
        if (!breaker) throw new Error(`No circuit breaker configured for ${apiKey}`);

        try {
        const response = await breaker.fire(requestOptions);
        return response.data;
        } catch (error) {
        this.logger.error(`Request to ${apiKey} failed: ${error.message}`);
        throw error;
        }
    }
}

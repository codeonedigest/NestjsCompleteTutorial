import { Injectable, Logger } from "@nestjs/common";
import { Cat } from "src/cats-interface/Cat.interface";


@Injectable()
export class CatsService {
    logger = new Logger(CatsService.name);

    public readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.logger.debug("Adding cat to repository");
        this.cats.push(cat);
    }

    findByName(name: string): Cat {
        var matchingCat: Cat;
        for(const cat of this.cats) {
            if (cat.name === name) {
                this.logger.debug("Found cat in repository");
                matchingCat = cat;
            } 
        }
        return matchingCat;
    }

    findAll(): Cat[] {
        return this.cats;
    }
}
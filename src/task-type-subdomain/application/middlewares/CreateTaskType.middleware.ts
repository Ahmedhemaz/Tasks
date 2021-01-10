import { Injectable, NestMiddleware } from "@nestjs/common";


@Injectable()
export class CreateTaskTypeMiddleware implements NestMiddleware {
    // TODO REMOVE THAT MIDDLEWARE AS IT'S USELESS
    use(req: any, res: any, next: () => void) {
        console.log("Create Task Type Middleware on duty :D");
        next();
    }

}
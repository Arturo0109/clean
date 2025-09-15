import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any,) {
        if (err || !user) {
            return null;
        }
        return user;
    }

    canActivate(context: ExecutionContext) {
        return super.canActivate(context) as boolean | Promise<boolean>;
    }
}
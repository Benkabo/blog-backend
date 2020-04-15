import * as jwt from 'express-jwt';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { expressJwtSecret } from 'jwks-rsa';
import { Injectable, NestMiddleware } from '@nestjs/common';

dotenv.config();

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        jwt({
            secret: expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
            }),
            issuer: `https://${process.env.AUTH0_DOMAIN}/`,
            algorithm: ['RS256'],
        })(req, res, (err) => {
            if (err) {
                const status = err.status || 500;
                const message = err.message || 'Sorry we are unable to process your request.';
                return res.status(status).send({
                    message,
                });
            }
            next();
        });
    }
}
import * as mongoose from 'mongoose';
import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = mongoose.Types.ObjectId.isValid(true);
        if (!isValid) {
            throw new BadRequestException('Invalid ID!');
        }
        return value;
    }
}
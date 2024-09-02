import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: number;
  data: T;
}

/**
 * Class of interceptor that will format
 * all success responses using template
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => ({
        ...data,
        status: context.switchToHttp().getResponse().statusCode,
        success: context.switchToHttp().getResponse().statusCode < 400,
      })),
    );
  }
}

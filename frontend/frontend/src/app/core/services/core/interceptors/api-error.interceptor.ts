import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, throwError } from 'rxjs';
import { AppMessageService } from '../../messsage.service';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private message: AppMessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Something went wrong';

        if (error.status === 0) {
          message = 'Backend not reachable';
        } else if (error.status === 400) {
          message = 'Invalid request';
        } else if (error.status === 500) {
          message = 'Server error';
        }

        this.message.error('API Error', message);

        return throwError(() => error);
      }),
    );
  }
}

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { UserNotificationService } from './components/user-notification/services/user-notification.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), UserNotificationService]
};

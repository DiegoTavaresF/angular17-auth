import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserNotificationService } from './services/user-notification.service';
import { UserNotificationModel } from './models/user-notification-model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'user-notification',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [],
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.css'
})
export class UserNotificationComponent {
  userNotificationChangedSubscription: Subscription;
    
  userNotifications: UserNotificationModel = {} as UserNotificationModel;

  constructor(private userNotificationService: UserNotificationService ) {
    this.userNotificationChangedSubscription = this.userNotificationService.getNotifications$.subscribe((item: UserNotificationModel) => {
      this.userNotifications = item;
    });
  }
}

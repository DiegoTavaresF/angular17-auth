import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { UserNotificationModel } from "../models/user-notification-model";

@Injectable({
	providedIn: 'root',
  })
export class UserNotificationService {
    public notifications: Subject<UserNotificationModel>;

    public constructor() {
		this.notifications = new Subject<UserNotificationModel>();
	}

	public get getNotifications$(): Observable<UserNotificationModel> {
		return this.notifications.asObservable();
	}
	
	public addNotification(newNotifications: UserNotificationModel): void {
		this.notifications.next(newNotifications);
	}
}

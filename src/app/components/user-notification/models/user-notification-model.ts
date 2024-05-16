import { NotificationType } from "../enums/notification-type.enum";

export class UserNotificationModel {
    title: string;
    messages: string[];
    type: NotificationType;
    dateTime: string

    constructor(title: string, messages: string[], type: NotificationType){
        this.title = title;
        this.messages = messages;
        this.type = type;
        this.dateTime = new Date().toLocaleString()
    }
}
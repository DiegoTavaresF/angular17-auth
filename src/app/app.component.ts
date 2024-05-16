import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './navigation/footer/footer.component';
import { MenuComponent } from './navigation/menu/menu.component';
import { UserNotificationComponent } from './components/user-notification/user-notification.component';
import { UserNotificationService } from './components/user-notification/services/user-notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, MenuComponent, FooterComponent, UserNotificationComponent],
  providers: [UserNotificationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'auth.angular';
}

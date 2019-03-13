import { Component} from '@angular/core';
import { Response} from '@angular/http';
import { DataTransferService } from '../shared/dataTransfer.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorage: DataTransferService,
             private authService: AuthService) {}

  onSaveData() {
    this.dataStorage.saveDataToServer().subscribe(
      (response: Response) => {
        console.log(response.json());
      },
      (error: Response) => {
        console.log(error);
      }
    );
  }

  onFetchData() {
    this.dataStorage.fetchDataFromServers();
  }
  onLogout() {
    this.authService.logout();
  }

}

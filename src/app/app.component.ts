import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { DataTransferService } from './shared/dataTransfer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dataTransferService: DataTransferService) { }
  ngOnInit(): void {
    this.dataTransferService.fetchDataFromServers();
  }
}

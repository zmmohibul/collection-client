import { Component } from '@angular/core';
import {CollectionGridComponent} from "../collection/collection-grid/collection-grid.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CollectionGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

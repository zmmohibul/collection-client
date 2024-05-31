import { Component } from '@angular/core';
import {CollectionCardComponent} from "../collection-card/collection-card.component";

@Component({
  selector: 'app-collection-grid',
  standalone: true,
  imports: [CollectionCardComponent],
  templateUrl: './collection-grid.component.html',
  styleUrl: './collection-grid.component.scss',
})
export class CollectionGridComponent {}

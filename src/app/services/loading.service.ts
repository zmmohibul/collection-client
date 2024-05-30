import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = signal<boolean>(false);

  constructor() {}
}

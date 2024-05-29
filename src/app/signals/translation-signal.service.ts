import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationSignalService {
  selected_Translation_ID =  signal(0);

  constructor() { }
}

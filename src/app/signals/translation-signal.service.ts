import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationSignalService {

  selected_Translation_ID =  signal(0);
  // translation_Files_Array_Length = signal(0);

  constructor() { }
}

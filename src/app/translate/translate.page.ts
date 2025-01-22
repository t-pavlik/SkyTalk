import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-translate',
  templateUrl: 'translate.page.html',
  styleUrls: ['translate.page.scss'],
  standalone: false,
})
export class TranslatePage {
  textToTranslate: string = '';
  sourceLang: string = 'en';
  targetLang: string = 'cs';
  translatedText: string = '';

  constructor(private http: HttpClient) {}

  onTranslate() {
    if (this.textToTranslate.trim() === '') {
      return;
    }

    const apiUrl = 'https://api.mymemory.translated.net/get';
    const url = `${apiUrl}?q=${encodeURIComponent(this.textToTranslate)}&langpair=${this.sourceLang}|${this.targetLang}`;

    this.http.get<any>(url).subscribe((response: { responseData: { translatedText: string; }; }) => {
      if (response.responseData) {
        this.translatedText = response.responseData.translatedText;
      } else {
        this.translatedText = 'Translation failed.';
      }
    }, (error: any) => {
      console.error('Error:', error);
      this.translatedText = 'Translation error occurred.';
    });
  }

}

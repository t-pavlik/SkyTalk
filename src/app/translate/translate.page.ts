import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoredTranslation, TranslationStorageService } from '../services/translation-storage.service';

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
  translations: StoredTranslation[] = [];

  constructor(
    private http: HttpClient,
    private translationStorageService: TranslationStorageService
  ) {
    this.loadTranslations();
  }

  async loadTranslations() {
    await this.translationStorageService.loadSavedTranslations();
    this.translations = this.translationStorageService.translations;
  }

  onTranslate() {
    if (this.textToTranslate.trim() === '') {
      return;
    }

    const apiUrl = 'https://api.mymemory.translated.net/get';
    const url = `${apiUrl}?q=${encodeURIComponent(this.textToTranslate)}&langpair=${this.sourceLang}|${this.targetLang}`;

    this.http.get<any>(url).subscribe(
      async (response: { responseData: { translatedText: string } }) => {
        if (response.responseData) {
          this.translatedText = response.responseData.translatedText;

          await this.translationStorageService.saveTranslation(
            this.textToTranslate,
            this.translatedText,
            this.sourceLang,
            this.targetLang
          );

          this.loadTranslations();
        } else {
          this.translatedText = 'Translation failed.';
        }
      },
      (error: any) => {
        console.error('Error:', error);
        this.translatedText = 'Translation error occurred.';
      }
    );
  }

  async clearTranslations() {
    await this.translationStorageService.clearTranslations();
    this.loadTranslations();
  }

}

import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class TranslationStorageService {

  private TRANSLATION_STORAGE = 'translations';
  public translations: StoredTranslation[] = [];

  constructor() {}

  async loadSavedTranslations() {
    const { value } = await Preferences.get({ key: this.TRANSLATION_STORAGE });
    this.translations = value ? JSON.parse(value) : [];
  }

  async saveTranslation(
    originalText: string,
    translatedText: string,
    sourceLang: string,
    targetLang: string
  ) {
    const newTranslation: StoredTranslation = {
      originalText,
      translatedText,
      sourceLang,
      targetLang,
      date: new Date().toISOString(),
    };

    this.translations.unshift(newTranslation);
    await Preferences.set({
      key: this.TRANSLATION_STORAGE,
      value: JSON.stringify(this.translations),
    });
  }

  async clearTranslations() {
    this.translations = [];
    await Preferences.remove({ key: this.TRANSLATION_STORAGE });
  }
}

export interface StoredTranslation {
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  date: string;
}
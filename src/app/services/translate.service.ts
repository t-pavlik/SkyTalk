import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private apiUrl = 'https://libretranslate.com/translate';

  constructor(private http: HttpClient) {}

  translate(text: string, sourceLang: string, targetLang: string): Observable<Translation> {
    const body = {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text',
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<Translation>(this.apiUrl, body, { headers });
  }
}

export interface Translation {
  translatedText: string;
}

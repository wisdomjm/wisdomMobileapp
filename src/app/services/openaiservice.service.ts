import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Open Ai Api
import OpenAIApi, { OpenAI } from 'openai';
import Configuration from 'openai'

//Access to Token
import { environment } from 'src/environments/environment';

const APIKEY = environment.chatGptKEY;

@Injectable({
  providedIn: 'root'
})
export class OpenaiserviceService {

  constructor() { }

  imgURL: string = '';
  image: string = '';


  readonly configuration: any = new Configuration({
    apiKey:APIKEY,
    dangerouslyAllowBrowser: true
  });

  readonly openai = new OpenAI({apiKey: APIKEY, dangerouslyAllowBrowser: true});

  async queryFromOpenAi(text:any) {
    const params = {
      //model:'text-davinci-003',
      model: "gpt-3.5-turbo",
      prompt:text,
      max_tokens:256,
      temperature:0.7
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(APIKEY)
      },
      body: JSON.stringify(params)
    };
    
    const response = await fetch('https://api.openai.com/v1/completions',requestOptions);
    const data = await response.json();
    //data.choices[0].text)
    console.log("DATOS>>> ",data.choices[0].message);
    return data.choices[0].message;
  }





}

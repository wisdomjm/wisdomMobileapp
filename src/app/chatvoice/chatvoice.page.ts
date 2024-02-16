import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OpenaiserviceService } from '../services/openaiservice.service';
import { HttpClient } from '@angular/common/http'; 

export interface Message{
  type:string;
  class:string;
  message:string;
  talk:boolean;
}


@Component({
  selector: 'app-chatvoice',
  templateUrl: './chatvoice.page.html',
  styleUrls: ['./chatvoice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatvoicePage implements OnInit {

  public inputText:string = "";
  mChat: Message[] = [];
  loading:boolean = false;
  active:boolean = true;

  public rates: number[];
	public selectedRate: number;
	public selectedVoice: SpeechSynthesisVoice | null;
	public voices: SpeechSynthesisVoice[];
  public auxtext: string = "";
  public sayCommand: string;

  constructor(private openservice: OpenaiserviceService) { 
    this.voices = [];
	  this.rates = [ .25, .5, .75, 1, 1.25, 1.5, 1.75, 2 ];
	  this.selectedVoice = null;
	  this.selectedRate = 1;
    this.sayCommand = "";
  }

  ngOnInit() {
  }

  public AskQuestion(){
    this.loading = true;
    this.active = false;

    this.mChat.push({
      type:'user',
      class:'question animate__animated animate__bounceInLeft',
      message: this.inputText,
      talk:false
    });

    this.openservice.queryFromOpenAi(this.inputText).then((data:any) => {
      console.log("DATA FROM SUBSCRIBE: ", data)
      this.mChat.push({
        type:'Gpt',
        class:'gpt-response animate__animated animate__bounceInRight',
        message: data,
        talk:true
      });
    
      this.loading = false;
    });

    this.inputText = '';

  }

  public Talk(text:any){
    //console.log('Text. ',text);
    if ( ! this.selectedVoice || ! text ) {
      return;
    }

    this.stop();
    //this.synthesizeSpeechFromText( this.selectedVoice, this.selectedRate, this.text );
    this.synthesizeSpeechFromText( this.selectedVoice, 1 , text );
  }

  public stop() : void {
		if ( speechSynthesis.speaking ) {
			speechSynthesis.cancel();
		}
	}

  public updateSayCommand() : void {
		if ( ! this.selectedVoice || ! this.auxtext ) {
			return;
		}

		var sanitizedRate = Math.floor( 200 * this.selectedRate );
		var sanitizedText = this.auxtext
			.replace( /[\r\n]/g, " " )
			.replace( /(["'\\\\/])/g, "\\$1" )
		;
		this.sayCommand = `say --voice ${ this.selectedVoice.name } --rate ${ sanitizedRate } --output-file=demo.aiff "${ sanitizedText }"`;
	}

  // I perform the low-level speech synthesis for the given voice, rate, and text.
	private synthesizeSpeechFromText(
		voice: SpeechSynthesisVoice,
		rate: number,
		text: string
		) : void {

		var utterance = new SpeechSynthesisUtterance( text );
		utterance.voice = this.selectedVoice;
		utterance.rate = rate;

		speechSynthesis.speak( utterance );

	}

  scrollToBottom(){
    
  }

}

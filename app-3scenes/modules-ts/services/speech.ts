// * speech.ts service
// * voice methods in the following languages and gender: 
// * english => english-male
// * francais => french-male
// * deutsch => german-male
// * englishF => english-female
// * francaisF => french-female
// * deutschF => german-female
// exps:
//speech.english(text) =>
//  var parts = [{ text: text,      voice: "en/en-us", variant: "m3" }];
//  meSpeak.speakMultipart(parts, {pitch: 30, speed: 120});
//}
//speech.francais(text) =>
//  var parts = [{ text: text,      voice: "fr", variant: "m3" }];
//  meSpeak.speakMultipart(parts, {pitch: 20, speed: 100});
//}
//speech.deutsch(text) =>
//  var parts = [{ text: text,      voice: "de", variant: "m3" },
//               { text: text,      voice: "de", variant: "m3" }];
//  meSpeak.speakMultipart(parts, {pitch: 30, speed: 130});
//}
//speech.francaisF(text) =>
//  var parts = [{ text: text,          voice: "fr",       variant: "f5" },
//               { text: text,          voice: "fr",       variant: "f5" }];
//  meSpeak.speakMultipart(parts, {pitch: 60, speed: 100});
//}

import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// load voice phonetics
meSpeak.loadConfig("libs/audio/mespeak_config.json");
meSpeak.loadVoice("libs/audio/voices/en/en-us.json", null);
meSpeak.loadVoice("libs/audio/voices/fr.json", null);
meSpeak.loadVoice("libs/audio/voices/de.json", null);



// auxiliary function to wrap single text as array
var bracket = function(text){
  return Array.isArray(text) ? text : [text];
};



@Injectable()
export class Speech {
  config: Config;

  constructor(@Inject(CONFIG) cfg:Config){
    this.config = cfg;
  }

  
  // male/female(F)
  // exp: english => male,  englishF => female

  // english/englishF
  english(text){
    var parts = [];
    bracket(text).forEach(function(t, i){
      parts[i] = { text: t, voice: "en/en-us", variant: "m3"};
    });
    meSpeak.speakMultipart(parts, {pitch: 30, speed: 120}, null, null);
  }
  englishF(text){
    var parts = [];
    bracket(text).forEach(function(t, i){
      parts[i] = { text: t, voice: "en/en-us", variant: "f5"};
    });
    meSpeak.speakMultipart(parts, {pitch: 60, speed: 100}, null, null);
  }
 
  // francais/francaisF
  francais(text){
    var parts = [];
    bracket(text).forEach(function(t, i){
      parts[i] = { text: t, voice: "fr", variant: "m3"};
    });
    meSpeak.speakMultipart(parts, {pitch: 30, speed: 120}, null, null);
  }
  francaisF(text){
    var parts = [];
    bracket(text).forEach(function(t, i){
      parts[i] = { text: t, voice: "fr", variant: "f5"};
    });
    meSpeak.speakMultipart(parts, {pitch: 60, speed: 100}, null, null);
  }

  // deutsch/deutschF
  deutsch(text){
    var parts = [];
    bracket(text).forEach(function(t, i){
      parts[i] = { text: t, voice: "de", variant: "m3"};
    });
    meSpeak.speakMultipart(parts, {pitch: 30, speed: 120}, null, null);
  }
  deutschF(text){
    var parts = [];
    bracket(text).forEach(function(t, i){
      parts[i] = { text: t, voice: "de", variant: "f5"};
    });
    meSpeak.speakMultipart(parts, {pitch: 60, speed: 100}, null, null);
  }

  // default - speak
  speak(text){
    this.english(text);
  }
}//Audio;



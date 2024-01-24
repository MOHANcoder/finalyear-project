import { useState } from "react";

export default function Ocr() {
  const languages = [{ name: "English", code: "eng" },
  { name: "Portuguese", code: "por" },
  { name: "Afrikaans", code: "afr" },
  { name: "Albanian", code: "sqi" },
  { name: "Amharic", code: "amh" },
  { name: "Arabic", code: "ara" },
  { name: "Assamese", code: "asm" },
  { name: "Azerbaijani", code: "aze" },
  { name: "Azerbaijani - Cyrillic", code: "aze_cyrl" },
  { name: "Basque", code: "eus" },
  { name: "Belarusian", code: "bel" },
  { name: "Bengali", code: "ben" },
  { name: "Bosnian", code: "bos" },
  { name: "Bulgarian", code: "bul" },
  { name: "Burmese", code: "mya" },
  { name: "Catalan; Valencian", code: "cat" },
  { name: "Cebuano", code: "ceb" },
  { name: "Central Khmer", code: "khm" },
  { name: "Cherokee", code: "chr" },
  { name: "Chinese - Simplified", code: "chi_sim" },
  { name: "Chinese - Traditional", code: "chi_tra" },
  { name: "Croatian", code: "hrv" },
  { name: "Czech", code: "ces" },
  { name: "Danish", code: "dan" },
  { name: "Dutch; Flemish", code: "nld" },
  { name: "Dzongkha", code: "dzo" },
  { name: "English, Middle (1100-1500)", code: "enm" },
  { name: "Esperanto", code: "epo" },
  { name: "Estonian", code: "est" },
  { name: "Finnish", code: "fin" },
  { name: "French", code: "fra" },
  { name: "French, Middle (ca. 1400-1600)", code: "frm" },
  { name: "Galician", code: "glg" },
  { name: "Georgian", code: "kat" },
  { name: "German", code: "deu" },
  { name: "German Fraktur", code: "frk" },
  { name: "Greek, Modern (1453-)", code: "ell" },
  { name: "Greek, Ancient (-1453)", code: "grc" },
  { name: "Gujarati", code: "guj" },
  { name: "Haitian; Haitian Creole", code: "hat" },
  { name: "Hebrew", code: "heb" },
  { name: "Hindi", code: "hin" },
  { name: "Hungarian", code: "hun" },
  { name: "Icelandic", code: "isl" },
  { name: "Indonesian", code: "ind" },
  { name: "Inuktitut", code: "iku" },
  { name: "Irish", code: "gle" },
  { name: "Italian", code: "ita" },
  { name: "Japanese", code: "jpn" },
  { name: "Javanese", code: "jav" },
  { name: "Kannada", code: "kan" },
  { name: "Kazakh", code: "kaz" },
  { name: "Kirghiz; Kyrgyz", code: "kir" },
  { name: "Korean", code: "kor" },
  { name: "Kurdish", code: "kur" },
  { name: "Lao", code: "lao" },
  { name: "Latin", code: "lat" },
  { name: "Latvian", code: "lav" },
  { name: "Lithuanian", code: "lit" },
  { name: "Macedonian", code: "mkd" },
  { name: "Malay", code: "msa" },
  { name: "Malayalam", code: "mal" },
  { name: "Maltese", code: "mlt" },
  { name: "Marathi", code: "mar" },
  { name: "Nepali", code: "nep" },
  { name: "Norwegian", code: "nor" },
  { name: "Oriya", code: "ori" },
  { name: "Panjabi; Punjabi", code: "pan" },
  { name: "Persian", code: "fas" },
  { name: "Polish", code: "pol" },
  { name: "Pushto; Pashto", code: "pus" },
  { name: "Romanian; Moldavian; Moldovan", code: "ron" },
  { name: "Russian", code: "rus" },
  { name: "Sanskrit", code: "san" },
  { name: "Serbian", code: "srp" },
  { name: "Serbian - Latin", code: "srp_latn" },
  { name: "Sinhala; Sinhalese", code: "sin" },
  { name: "Slovak", code: "slk" },
  { name: "Slovenian", code: "slv" },
  { name: "Spanish; Castilian", code: "spa" },
  { name: "Swahili", code: "swa" },
  { name: "Swedish", code: "swe" },
  { name: "Syriac", code: "syr" },
  { name: "Tagalog", code: "tgl" },
  { name: "Tajik", code: "tgk" },
  { name: "Tamil", code: "tam" },
  { name: "Telugu", code: "tel" },
  { name: "Thai", code: "tha" },
  { name: "Tibetan", code: "bod" },
  { name: "Tigrinya", code: "tir" },
  { name: "Turkish", code: "tur" },
  { name: "Uighur; Uyghur", code: "uig" },
  { name: "Ukrainian", code: "ukr" },
  { name: "Urdu", code: "urd" },
  { name: "Uzbek", code: "uzb" },
  { name: "Uzbek - Cyrillic", code: "uzb_cyrl" },
  { name: "Vietnamese", code: "vie" },
  { name: "Welsh", code: "cym" },
  { name: "Yiddish", code: "yid" },
  ];

  const [processedContent,setProcessedContent] = useState(' ');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setProcessedContent('');
    try{
      const res = await fetch('http://localhost:1000/tools/ocr/image',{
        method:'POST',
        body:formData
      });
      const data = await res.text();
      setProcessedContent(data);
    }catch(error){
      setProcessedContent(error.message);
    }
  }

  return (
    <>
      <h1>OCR for Images</h1>
      <div className="info">
        This OCR scanner works best for multiple languages
      </div>
      <form onSubmit={handleSubmit} method="post">
        <div>
          <label>
            <select name="language" id="language">
              {languages.map(({ name, code }) => <option key={code} value={code}>{name}</option>)}
            </select>
          </label>
        </div>
        <div>
          <label>
            Select an image file :
            <input type="file" name="image_input" id="image_input" accept="image/*" />
          </label>
        </div>
        <input type="submit" value="submit" />
      </form>
      <div className="processed-content" style={{padding:'2rem', textAlign:'justify'}}>
        {processedContent ? (processedContent !== ' ' && <><h3>Processed Content : </h3>{processedContent}</>): <div>Processing....</div>}
      </div>
    </>
  )
}
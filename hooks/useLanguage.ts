// import {  useState } from "react";
// import storage from "../helper/storage";
// import i18n from "../i18n";
// export type Language = {label:string,code: string}
// const KEY_LANGUAGE = "lang";
// const useLanguage = () => {
//     const  [language,setLanguage] = useState<Language>(storage.get(KEY_LANGUAGE) || {label: "English",code: "en"});
//     const handleSetLanguege = (langCode: Language) => {
//         storage.set(KEY_LANGUAGE,langCode);
//         i18n.changeLanguage(langCode.code);
//     }
    
//     return {
//        language,
//         handleSetLanguege,
//         setLanguage
//     }
// };

// export default useLanguage;
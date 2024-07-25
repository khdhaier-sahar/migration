export const removeHtmlTags = (input) => {
   if (!input || typeof input !== 'string') {
       return '';
   }
   return input.replace(/<\/?[^>]+(>|$)/g, "");
}

export const timestampToDate = (timestamp) => {
   if (!timestamp || isNaN(Number(timestamp))) {
       return '';
   }
   const date = new Date(Number(timestamp));
   const options = { year: "numeric", month: "long", day: "numeric" };
   return date.toLocaleDateString(undefined, options);
}

export const UppercaseWord = (input) => {
   if (!input || typeof input !== 'string') {
       return '';
   }
   return input.replace(/\b\w/ig, (match) => match.toUpperCase());
}

export const getFirstLetters = (input) => {
   if (!input || typeof input !== 'string') {
       return '';
   }
   const words = input.split(" ");
   const firstTwoWords = words.slice(0, 2);
   const firstLetters = firstTwoWords.map(word => word.charAt(0).toUpperCase());
   return firstLetters.join("");
}

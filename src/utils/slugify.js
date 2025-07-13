// src/utils/slugify.js

export function slugify(text) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  
  const rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const lat = ["a","b","v","g","d","e","e","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","h","ts","ch","sh","shch", "","y","", "e","yu","ya"];

  if (!text) {
    return '';
  }

  return text.toString().toLowerCase()
    .replace(/[а-яё]/g, i => lat[rus.indexOf(i)])
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
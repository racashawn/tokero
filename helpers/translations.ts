import fs from "fs";
import path from "path";


interface Translations {
  [key: string]: string;
}

const translationsCache: { [lang: string]: Translations } = {};

/**
 * Loads translations for a given language code from a JSON file.
 * Assumes JSON files are located in a 'translations' directory relative to the project root.
 * e.g., translations/en.json, translations/fr.json
 * @param lang The language code (e.g., 'en', 'fr').
 * @returns The parsed translation object for the language.
 */
export function getTranslations(lang: string): Translations {
  // check cache first
  if (translationsCache[lang]) {
    return translationsCache[lang];
  }

  const filePath = path.resolve(process.cwd(), "lang-packs", `${lang}.json`);
  console.log(`Attempting to load translations from: ${filePath}`); // for debugging

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const parsedTranslations = JSON.parse(fileContent) as Translations;

    // add to cache
    translationsCache[lang] = parsedTranslations;
    return parsedTranslations;
  } catch (error) {
    console.error(
      `Error loading translations for language "${lang}" from ${filePath}:`,
      error
    );
  
    return {};
  }
}

/**
 * gets a specific translation string for a given key and language.
 * @param lang language code.
 * @param key the key in the JSON file (e.g., "LabelCorporate").
 * @returns the translated string or the key itself if not found.
 */
export function getTranslation(lang: string, key: string): string {
  const translations = getTranslations(lang);
  return translations[key] || key; // Return the key as fallback
}

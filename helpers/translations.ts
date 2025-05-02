import fs from "fs";
import path from "path";

// Define the structure of your translation files if possible (optional but good practice)
interface Translations {
  [key: string]: string;
  // Example: Explicitly define known keys if you want better type checking
  // LabelCorporate?: string;
  // LabelExchange?: string;
}

// Cache to store loaded translations
const translationsCache: { [lang: string]: Translations } = {};

/**
 * Loads translations for a given language code from a JSON file.
 * Assumes JSON files are located in a 'translations' directory relative to the project root.
 * e.g., translations/en.json, translations/fr.json
 * @param lang The language code (e.g., 'en', 'fr').
 * @returns The parsed translation object for the language.
 */
export function getTranslations(lang: string): Translations {
  // Check cache first
  if (translationsCache[lang]) {
    return translationsCache[lang];
  }

  // Construct the file path (adjust '../translations' if your structure differs)
  // __dirname usually points to the directory of the current module (e.g., page-objects)
  // So we might need to go up one level depending on where translationHelper.ts is.
  // Using process.cwd() might be more robust if run from project root.
  const filePath = path.resolve(process.cwd(), "lang-packs", `${lang}.json`);
  console.log(`Attempting to load translations from: ${filePath}`); // For debugging

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const parsedTranslations = JSON.parse(fileContent) as Translations;

    // Store in cache
    translationsCache[lang] = parsedTranslations;
    return parsedTranslations;
  } catch (error) {
    console.error(
      `Error loading translations for language "${lang}" from ${filePath}:`,
      error
    );
    // Return an empty object or throw an error, depending on desired behavior
    return {};
  }
}

/**
 * Gets a specific translation string for a given key and language.
 * @param lang Language code.
 * @param key The key in the JSON file (e.g., "LabelCorporate").
 * @returns The translated string or the key itself if not found.
 */
export function getTranslation(lang: string, key: string): string {
  const translations = getTranslations(lang);
  return translations[key] || key; // Return the key as fallback
}

/**
 * po文件解析后的类型
 *
 * @export
 * @interface TranslationBean
 */
export interface PoBean {
  charset: string;
  headers: TranslationHeaders;
  translations: TranslationsBean;
}
export interface TranslationsBean {
  [context: string]: {
    [msgid: string]: Translation;
  };
}
export interface Comment {
  reference?: string;
  translator?: string;
  extracted?: string;
  flag?: string;
  previous?: string;
}
export interface Translation {
  msgctxt?: string;
  msgid?: string;
  msgid_plural?: string;
  comments?: Comment;
  msgstr?: string[];
}
export interface TranslationHeaders {
  'Project-Id-Version'?: string;
  'POT-Creation-Date'?: string;
  'PO-Revision-Date'?: string;
  'Last-Translator'?: string;
  'Language-Team'?: string;
  Language?: string;
  'MIME-Version'?: string;
  'Content-Type'?: string;
  'Content-Transfer-Encoding'?: string;
  'X-Generator'?: string;
  'X-Poedit-Basepath'?: string;
  'Plural-Forms'?: string;
  'X-Poedit-KeywordsList'?: string;
  'X-Poedit-SearchPath-0'?: string;
}

/**
 * excel 支持的列
 *
 * @export
 * @interface ExcelTranslation
 */
export interface ExcelTranslation {
  context?: string;
  singular_key?: string;
  singular_str?: string;
  plural_key?: string;
  plural_str?: string;
  comments?: string;
}

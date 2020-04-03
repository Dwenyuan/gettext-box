export const DOMAIN = 'domain'
export const CONTEXT = 'context'
export const SINGULAR_KEY = 'singular_key'
export const PLURAL_KEY = 'plural_key'
export const VALUE = 'value'
export const CATEGORY = 'category'

/**
 * 这是定义可提取的方法名
 * @interface IOption
 */
export interface Ioption {
  /**
   * 表示提取javascript中链式调用的方法
   * 例如 jed中的 `translate(key).onDomain(domain)`
   * @type {{
   *     [index: string]: {
   *       onDomain?: [string];
   *       withContext?: [string];
   *       ifPlural?: [null, string];
   *     };
   *   }}
   * @memberof IOption
   */
  chained?: {
    [index: string]: {
      onDomain?: ['domain'];
      withContext?: ['context'];
      ifPlural?: [null, 'plural_key'];
      [index: string]: Array<null | string>;
    };
  };
  /**
   *
   *
   * @type {{
   *     [index: string]: string[];
   *   }}
   * @memberof IOption
   */
  funcArgumentsMap?: {
    [index: string]: string[];
  };
  trim?: boolean;
}

/* eslint-disable @typescript-eslint/camelcase */
declare module 'jed' {
  interface Translate {
    onDomain(domain: string): Translate
    withContext(context: string): Translate
    ifPlural(num: number, plural_key: string): Translate
    fetch(num?: number): string
  }

  export class Jed {
    constructor(option: any)
    gettext(key: string): string
    dgettext(domain: string, key: string): string
    dcgettext(domain: string, key: string, category: string): string
    ngettext(singular_key: string, plural_key: string, value: number): string
    dngettext(
      domain: string,
      singular_ley: string,
      plural_key: string,
      value: number
    ): string

    dcngettext(
      domain: string,
      singular_key: string,
      plural_key: string,
      value: number,
      category: string
    ): string

    pgettext(context: string, key: string): string
    dpgettext(domain: string, context: string, key: string): string
    npgettext(
      context: string,
      singular_key: string,
      plural_key: string,
      value: number
    ): string

    dnpgettext(
      domain: string,
      context: string,
      singular_key: string,
      plural_key: string,
      value: number
    ): string

    dcnpgettext(
      domain: string,
      context: string,
      singular_key: string,
      plural_key: string,
      value: number,
      category: string
    ): string

    translate(key: string): Translate
  }
  export default Jed
}

import { extractMessagesFromGlob } from 'react-gettext-parser'

/**
 * 扫描指定目录下的文件，并提取翻译
 *
 * @export
 * @param {string[]} paths
 * @returns
 */
export function ScanFiles (paths: string[]) {
  const message = extractMessagesFromGlob(
    paths.map(v => v + '/**/{*.js,*.jsx,*.ts,*.tsx}')
  )
  return message
}

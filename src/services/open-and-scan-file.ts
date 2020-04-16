import { isEmpty } from 'lodash'
import { scanFiles } from './scan-files'
import { selectDirPath } from './select-dir-path'
import { PoBean } from 'gettext-lib'

export async function openAndScanFile (): Promise<PoBean> {
  const dirPaths = await selectDirPath()
  if (isEmpty(dirPaths)) {
    return
  }
  return scanFiles(dirPaths, {})
}

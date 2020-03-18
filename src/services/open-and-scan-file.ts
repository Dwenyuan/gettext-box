import { isEmpty } from 'lodash'
import { scanFiles } from './scan-files'
import { selectDirPath } from './select-dir-path'

export async function openAndScanFile () {
  const dirPaths = await selectDirPath()
  if (isEmpty(dirPaths)) {
    return
  }
  return scanFiles(dirPaths, {})
}

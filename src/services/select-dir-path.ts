import { dialog } from 'electron'
export async function selectDirPath (): Promise<string[]> {
  const { filePaths = [] } = await dialog.showOpenDialog({
    properties: ['openDirectory', 'multiSelections']
  })
  return filePaths
}

import { dialog } from 'electron'
export async function selectDirPath () {
  const { filePaths = [] } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  console.log(filePaths)
}

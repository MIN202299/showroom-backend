import fs from 'node:fs'

export function recursiveMkdir(pathStr: string) {
  const tmpFolders = pathStr.split('\\')
  let newPath = ''
  for (const item of tmpFolders) {
    newPath += `/${item}`
    if (!fs.existsSync(item))
      fs.mkdirSync(newPath)
  }
}

export function moveFile(target: string, dest: string) {
  if (!fs.existsSync(target))
    throw new Error('目标文件不存在')

  const stat = fs.statSync(target)
  if (!stat.isFile())
    throw new Error('目标不是文件')

  const writeStream = fs.createWriteStream(dest)
  const readStream = fs.createReadStream(target)

  readStream.on('end', () => {
    fs.unlinkSync(target)
  })

  readStream.pipe(writeStream)
}

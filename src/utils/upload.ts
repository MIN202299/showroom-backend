// import fs from 'node:fs'

// export function recursiveMkdir(pathStr: string) {
//   const tmpFolders = pathStr.split('\\')
//   let newPath = ''
//   for (const item of tmpFolders) {
//     newPath += `/${item}`
//     if (!fs.existsSync(item))
//       fs.mkdirSync(newPath)
//   }
// }

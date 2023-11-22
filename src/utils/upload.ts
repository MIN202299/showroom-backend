import fs from 'node:fs'
import path from 'node:path'
import SparkMD5 from 'spark-md5'

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

// 这里基数按hash的逻辑和前端计算一模一样
// 计算hash值
// 第一个切片和最后一个切片计算全部
// 其余切片截取 前两个 中间两个 最后两个字节
export async function calculateChunkHash(fileChunk: Blob[], CHUNK_SIZE = 1024 * 1024): Promise<string> {
  return new Promise((resolve) => {
    const targets: Blob[] = []
    fileChunk.forEach((item, idx, self) => {
      if (idx === 0 || idx === self.length) {
        targets.push(item)
      }
      else {
        targets.push(item.slice(0, 2))
        targets.push(item.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2))
        targets.push(item.slice(CHUNK_SIZE - 2, CHUNK_SIZE))
      }
    })
    const spark = new SparkMD5.ArrayBuffer()
    // const fileReader = new FileReader()
    // fileReader.readAsArrayBuffer(new Blob(targets))
    // fileReader.onload = function (e) {
    //   spark.append(e.target!.result as ArrayBuffer)
    //   // console.log('hash', spark.end())
    //   resolve(spark.end())
    // }
    const _blob = new Blob(targets)
    _blob.arrayBuffer().then((_aBuffer) => {
      spark.append(_aBuffer)
      resolve(spark.end(false))
    })
  })
}

export function createChunk(file: Blob, CHUNK_SIZE = 1024 * 1024): Blob[] {
  let start = 0
  const chunks: Blob[] = []
  while (start < file.size) {
    chunks.push(file.slice(start, CHUNK_SIZE + start))
    start += CHUNK_SIZE
  }
  return chunks
}

export function calculateHash(file: Blob): Promise<string> {
  return new Promise((resolve) => {
    file.arrayBuffer().then((_aBuffer) => {
      const spark = new SparkMD5.ArrayBuffer()
      spark.append(_aBuffer)
      resolve(spark.end(false))
    })
  })
}

// hash用于校验合并后文件的完整性
export function mergeFileChunk(fileDir: string, output: string, hash = '', CHUNK_SIZE = 1024 * 1024): Promise<void> {
  return new Promise((resolve, reject) => {
    const filenames: string[] = fs.readdirSync(fileDir)

    filenames.sort((name1, name2) => {
      return Number(name1.split('-')[1]) - Number(name2.split('-')[1])
    })
    let i = 0

    filenames.forEach((name, idx) => {
      const chunkPath = path.join(fileDir, name)
      const readStream = fs.createReadStream(chunkPath)
      const writeStream = fs.createWriteStream(output, {
        start: idx * CHUNK_SIZE,
      })
      readStream.on('end', async () => {
        // await fs.unlinkSync(chunkPath)
        // 防止文件合并损坏需要重新合并
      })
      readStream.on('error', () => {
        reject(new Error('文件损坏, 请重新上传'))
      })
      writeStream.on('error', () => {
        reject(new Error('文件损坏, 请重新上传'))
      })
      writeStream.on('finish', () => {
        i++
        if (i === filenames.length) {
          if (!hash)
            return resolve()
          const file = fs.readFileSync(output)
          const chunks = createChunk(new Blob([file]), CHUNK_SIZE)
          calculateChunkHash(chunks, CHUNK_SIZE).then((_hash) => {
            // console.log(_hash)
            if (_hash === hash) {
              resolve()
              filenames.forEach((name) => {
                fs.unlinkSync(path.join(fileDir, name))
              })
            }

            else {
              reject(new Error('文件损坏, 请重新上传'))
              fs.unlinkSync(output)
            }
          })
        }
      })
      readStream.pipe(writeStream)
    })
  })
}

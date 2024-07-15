import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const s3Client = new S3Client({...})

const file = fs.createReadStream('path/to/very-large-file')

const upload = new Upload(s3Client, {
  Bucket: 'bucket-name',
  Key: 'path/to/file',
  ContentType: 'image/jpeg',
  Body: file,
})

await uploader.done()

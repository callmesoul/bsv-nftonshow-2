declare interface MetaFile {
  base64Data: string
  hexData: string
  name: string
  data_type: string
  raw: null | File
  metaFileTxId?: string
  sha256: string
}

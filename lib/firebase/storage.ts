import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './config'

export const uploadFile = async (
  file: File,
  userId: string,
  folder: string = 'uploads'
): Promise<{ path: string; url: string }> => {
  const timestamp = Date.now()
  const fileName = `${timestamp}_${file.name}`
  const storageRef = ref(storage, `${userId}/${folder}/${fileName}`)
  
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  
  return {
    path: `${userId}/${folder}/${fileName}`,
    url,
  }
}

export const deleteFile = async (filePath: string) => {
  const storageRef = ref(storage, filePath)
  await deleteObject(storageRef)
}


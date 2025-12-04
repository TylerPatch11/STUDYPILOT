import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
  NextOrObserver,
} from 'firebase/auth'
import { auth } from './config'

const googleProvider = new GoogleAuthProvider()

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider)
  return userCredential.user
}

export const signOut = async () => {
  await firebaseSignOut(auth)
}

export const onAuthChange = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback)
}

export const getCurrentUser = (): User | null => {
  return auth.currentUser
}


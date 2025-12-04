import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
  addDoc,
} from 'firebase/firestore'
import { db } from './config'

export interface UserData {
  uid: string
  email: string
  displayName: string | null
  createdAt: Timestamp
  plan: 'free' | 'pro'
  cheatSheetsCountThisMonth: number
  lastMonthReset: Timestamp | null
  stripeCustomerId?: string
}

export interface CheatSheet {
  id?: string
  userId: string
  title: string
  sourceFileName: string
  sourceFilePath: string
  createdAt: Timestamp
  updatedAt: Timestamp
  content: string
  tokensUsed?: number
  inputSummary?: string
}

export interface Class {
  id?: string
  userId: string
  name: string
  description: string
  progress: number
  createdAt: Timestamp
}

// User operations
export const createUserProfile = async (uid: string, email: string, displayName: string | null) => {
  const userRef = doc(db, 'users', uid)
  await setDoc(userRef, {
    uid,
    email,
    displayName,
    createdAt: Timestamp.now(),
    plan: 'free',
    cheatSheetsCountThisMonth: 0,
    lastMonthReset: Timestamp.now(),
  })
}

export const getUserData = async (uid: string): Promise<UserData | null> => {
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)
  if (userSnap.exists()) {
    return userSnap.data() as UserData
  }
  return null
}

export const updateUserData = async (uid: string, data: Partial<UserData>) => {
  const userRef = doc(db, 'users', uid)
  await updateDoc(userRef, data)
}

// Cheat Sheet operations
export const createCheatSheet = async (cheatSheet: Omit<CheatSheet, 'id'>): Promise<string> => {
  const cheatSheetsRef = collection(db, 'cheatSheets')
  const docRef = await addDoc(cheatSheetsRef, cheatSheet)
  return docRef.id
}

export const getCheatSheet = async (id: string): Promise<CheatSheet | null> => {
  const cheatSheetRef = doc(db, 'cheatSheets', id)
  const cheatSheetSnap = await getDoc(cheatSheetRef)
  if (cheatSheetSnap.exists()) {
    return { id: cheatSheetSnap.id, ...cheatSheetSnap.data() } as CheatSheet
  }
  return null
}

export const getUserCheatSheets = async (userId: string, maxResults?: number): Promise<CheatSheet[]> => {
  const cheatSheetsRef = collection(db, 'cheatSheets')
  const constraints: QueryConstraint[] = [
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  ]
  if (maxResults) {
    constraints.push(limit(maxResults))
  }
  const q = query(cheatSheetsRef, ...constraints)
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as CheatSheet[]
}

export const updateCheatSheet = async (id: string, data: Partial<CheatSheet>) => {
  const cheatSheetRef = doc(db, 'cheatSheets', id)
  await updateDoc(cheatSheetRef, data)
}

export const deleteCheatSheet = async (id: string) => {
  const cheatSheetRef = doc(db, 'cheatSheets', id)
  await deleteDoc(cheatSheetRef)
}

// Class operations
export const createClass = async (classData: Omit<Class, 'id'>): Promise<string> => {
  const classesRef = collection(db, 'classes')
  const docRef = await addDoc(classesRef, classData)
  return docRef.id
}

export const getUserClasses = async (userId: string): Promise<Class[]> => {
  const classesRef = collection(db, 'classes')
  const q = query(
    classesRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Class[]
}

export const updateClass = async (id: string, data: Partial<Class>) => {
  const classRef = doc(db, 'classes', id)
  await updateDoc(classRef, data)
}

// Usage limit helpers
export const resetMonthlyUsageIfNeeded = async (userData: UserData): Promise<boolean> => {
  const now = new Date()
  const lastReset = userData.lastMonthReset?.toDate() || new Date()
  const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysSinceReset >= 30) {
    await updateUserData(userData.uid, {
      cheatSheetsCountThisMonth: 0,
      lastMonthReset: Timestamp.now(),
    })
    return true
  }
  return false
}

export const checkUsageLimit = (userData: UserData): boolean => {
  const limit = userData.plan === 'pro' ? 1000 : 3
  return userData.cheatSheetsCountThisMonth < limit
}

export const incrementUsageCount = async (uid: string) => {
  const userData = await getUserData(uid)
  if (!userData) return
  
  await resetMonthlyUsageIfNeeded(userData)
  const currentData = await getUserData(uid)
  if (currentData) {
    await updateUserData(uid, {
      cheatSheetsCountThisMonth: (currentData.cheatSheetsCountThisMonth || 0) + 1,
    })
  }
}


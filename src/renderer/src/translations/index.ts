export * from './unStandard'

import { en } from './en'
import { zh } from './zh'
let localLang = 'zh'
const dic = { en, zh }
export const translations = dic[localLang]

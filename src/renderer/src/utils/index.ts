import { SupportedLangauges } from '@renderer/definitions'
import CryptoJS from 'crypto-js'

export function encrypt(word: any, keyStr: string) {
  const _key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(keyStr)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, _key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
export function getCurrentLanguage(): SupportedLangauges {
  return (
    (localStorage.getItem('language') as SupportedLangauges) ||
    (navigator.languages.includes(SupportedLangauges.Chinese) ||
    navigator.languages.includes('zh-CN')
      ? SupportedLangauges.Chinese
      : SupportedLangauges.English)
  )
}

const MODE = import.meta.env.MODE || 'production'
export const baseUrls: any = {
  development: '',
  production: 'http://jsonplaceholder.typicode.com'
}

const baseUrl = baseUrls[MODE]

export default baseUrl

import NetWorkService from './request'

export const netService = new NetWorkService({
  baseURL: '',
  responseType: 'json',
  timeout: 5000
})

// interface UserInfo {
//   name: string
//   age: number
// }
//
// export async function foo() {
//   const a = await netService.request<UserInfo>({
//     interceptors: {
//       requestInterceptor(config) {
//         return config
//       },
//       requestInterceptorCatch(_) {
//         // return err
//       },
//       responseInterceptor(res) {
//         return res
//       },
//       responseInterceptorCatch(_) {
//         // return err
//       }
//     }
//   })
// }

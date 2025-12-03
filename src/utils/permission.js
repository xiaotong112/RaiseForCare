/**
 * 登录拦截逻辑
 */

// 白名单页面路径
const whiteList = [
  '/pages/login/login',
  'pages/login/login'
]

function hasPermission(url) {
  // 在白名单中，直接放行
  // 注意：url可能带参数，需要处理
  let path = url.split('?')[0]
  // 统一处理，确保对比时一致
  if (whiteList.includes(path)) {
      return true;
  }
  return false
}

export function initPermission() {
  const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  
  list.forEach(item => {
    uni.addInterceptor(item, {
      invoke(e) {
        // 获取token
        const token = uni.getStorageSync('token')
        
        // 如果有token，直接放行
        if (token) {
          return true
        }

        // 获取要跳转的目标路径
        const url = e.url
        
        if (hasPermission(url)) {
          return true
        }
        
        // 没有token且不在白名单，拦截并跳转到登录页
        uni.reLaunch({
          url: '/pages/login/login'
        })
        
        return false
      },
      fail(err) {
        console.error(err)
      }
    })
  })
}

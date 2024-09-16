;(() => {
  const env = import.meta.env.MODE
  console.log('============env==', env, import.meta.env)

  // 判断当前环境，并加载不同的 CSS
  if (env === 'development') {
    const localCSS = 'http://localhost:5173/element-plus/element-plus.css'
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = localCSS
    document.head.appendChild(link)
  } else if (env === 'production') {
    const cdnCSS = 'https://unpkg.com/element-plus@2.3.12/dist/index.css'
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = cdnCSS
    document.head.appendChild(link)
  }

  // 加载不同的脚本
  const scripts =
    env === 'development'
      ? [
          'http://localhost:5173/vue@3.3.4/index.js',
          'http://localhost:5173/element-plus/element-plus.js',
          'http://localhost:5173/vue-demi@0.14.6/index.js',
        ]
      : [
          'https://unpkg.com/vue@3.3.4/dist/vue.global.js',
          'https://unpkg.com/element-plus@2.3.12/dist/index.full.js',
          'https://unpkg.com/vue-demi@0.14.6/lib/index.iife.js',
        ]

  scripts.forEach((src) => {
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
  })
})()

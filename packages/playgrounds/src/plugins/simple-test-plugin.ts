import type { Plugin } from 'vite'

export function simpleTestPlugin(): Plugin {
  return {
    name: 'simple-test-plugin',
    
    // 插件加载时执行
    configResolved(config) {
      console.log('🔧 Simple Test Plugin loaded!')
      console.log('📁 Working directory:', process.cwd())
      console.log('🚀 Mode:', config.mode)
    },
    
    // 处理模块时执行
    transform(code, id) {
      // 只在开发模式下添加一些测试信息
      if (id.includes('.tsx') || id.includes('.ts')) {
        console.log(`📝 Processing: ${id}`)
      }
      if(id.endsWith('components/Button/Button.tsx')){
        console.log('🔧 Simple Test Plugin loaded!', code)
      }
      if(id.endsWith('Button.tsx_Button_component_4n7uUfcfzUA.js')){
        console.log('🔧 Simple Test Plugin loaded!', code)
      }
      return code
    },
    
    // 开发服务器启动时执行
    configureServer(server) {
      console.log('🌐 Dev server configured by Simple Test Plugin')
      
      // 添加一个简单的中间件
      server.middlewares.use('/test-plugin', (req, res, next) => {
        res.setHeader('Content-Type', 'text/plain')
        res.end('Hello from Simple Test Plugin! 🎉')
      })
    }
  }
}

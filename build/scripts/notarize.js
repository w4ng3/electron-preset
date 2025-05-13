const process = require('node:process')
const { notarize } = require('electron-notarize')

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context
  if (!['darwin', 'mas'].includes(electronPlatformName)) {
    console.log('非 macOS 平台，跳过公证', electronPlatformName)
    return
  }

  // 检查必要的环境变量是否存在
  const { APPLE_ID, APPLE_APP_SPECIFIC_PASSWORD, APPLE_TEAM_ID, APPLE_BUNDLE_ID } = process.env

  if (!APPLE_ID || !APPLE_APP_SPECIFIC_PASSWORD) {
    console.log('跳过公证：没有提供 APPLE_ID 或 APPLE_APP_SPECIFIC_PASSWORD 环境变量')
    return
  }

  const appName = context.packager.appInfo.productFilename
  console.log(`打包后应用地址：${appOutDir}/${appName}.app`)
  console.log('开始公证应用...')

  try {
    return await notarize({
      tool: 'notarytool', // 公证工具 固定写法
      appBundleId: APPLE_BUNDLE_ID,
      appPath: `${appOutDir}/${appName}.app`, // 打包后的放置app文件的命名和路径
      appleId: APPLE_ID,
      appleIdPassword: APPLE_APP_SPECIFIC_PASSWORD,
      ascProvider: APPLE_TEAM_ID,
      teamId: APPLE_TEAM_ID,
    })
  }
  catch (error) {
    console.error('公证过程中出错:', error)
    // 不要抛出错误，让构建继续
  }
}

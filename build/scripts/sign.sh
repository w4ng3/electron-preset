# 设置你的开发者 ID 证书标识符：Developer ID Application: Your Company Name (Team ID)
DEVELOPER_ID="3rd Party Mac Developer Application: Nanjing Moving Bean Network Technology Co. LTD (X3K2KUWK6L)"

# 递归查找并签名所有 .node 文件
find node_modules -name "*.node" | while read -r file; do
  echo "Signing $file"
  codesign --force --sign "$DEVELOPER_ID" --deep --timestamp "$file"
done

# 签名应用
# APP_PATH="dist/mas-arm64/electron-preset.app"
# echo "Signing $APP_PATH"
# codesign --force --sign "$DEVELOPER_ID" --deep --timestamp "$APP_PATH"

# 打包为 pkg 文件, 并为 .pkg 安装包签名
# productbuild --component "$APP_PATH" /Applications --sign "E87C626B2C41813104DEE1D5BD83CEBC16246476" dist/electron-preset.pkg

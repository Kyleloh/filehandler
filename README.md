## fileHandler
用于操作文件的一些方法

### getFiles
```javascript
/**
 * 获取所有文件
 * @param {String} rootPath './'
 * @param {Array} exclude ['keyword', ...]
 */
getFiles(rootPath = "./", exclude = [])
```

### replace
```javascript
/**
 * 替换文本
 * @param {Array} files ['/hello/...', ...]
 * @param {Array} replacements [[keyword, replacement], ...] 区分大小写
 */
replace(files = [], replacements = [])
```
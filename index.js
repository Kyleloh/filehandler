const fs = require('fs-extra');
const path = require('path');

/**
 * 获取所有文件
 * @param {String} rootPath './'
 * @param {Array} exclude ['keyword', ...]
 */
function getFiles(rootPath = "./", exclude = []) {
    const allFiles = [];
    exclude = [... new Set(exclude.concat(['node_modules', '.git', '.DS_Store']))];

    function getAllFiles(rootPath = "./") {
        rootPath = path.resolve(rootPath);

        // 排除文件，只要路径或者文件名包含关键词，就排除
        if (exclude.some(item => rootPath.indexOf(item) != -1)) {
            return Promise.resolve()
        }

        return fs.stat(rootPath)
            .then(stats => {
                if (stats.isFile()) {
                    // 文件
                    allFiles.push(rootPath);
                    return Promise.resolve();
                } else {
                    // 目录
                    return fs.readdir(rootPath).then(files => {
                        return Promise.all(files.map(file => getAllFiles(path.resolve(rootPath, file))));
                    });
                }
            })
    }

    return getAllFiles(rootPath).then(() => { return allFiles });
}

/**
 * 替换文本
 * @param {Array} files ['/hello/...', ...]
 * @param {Array} replacements [[keyword, replacement], ...] 区分大小写
 */
function replace(files = [], replacements = []) {
    if (!files.length || !replacements.length) { return Promise.resolve(); }
    return Promise.all(files.map(file => {
        return fs.readFile(file, 'utf8').then(data => {
            replacements.forEach(replacement => {
                data = data.replace(new RegExp(replacement[0], 'g'), replacement[1])
            })
            return fs.writeFile(file, data, 'utf8');
        })
    }));
}


getFiles().then(allFiles => {
    return replace(allFiles,[['ltoy-seed', 'hello-world']]);
});


exports.default = {
    getFiles,
    replace
}
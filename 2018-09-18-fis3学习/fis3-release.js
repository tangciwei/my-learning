// 扫描项目目录拿到文件并初始化出一个文件对象列表
// 对文件对象中每一个文件进行单文件编译
// 获取用户设置的 package 插件，进行打包处理（包括合并图片）
// 其中打包处理开了四个扩展点，通过用户配置启用某些插件。

// prepackager 打包前处理插件扩展点
// packager 打包插件扩展点，通过此插件收集文件依赖信息、合并信息产出静态资源映射表
// spriter 图片合并扩展点，如 csssprites
// postpackager 打包后处理插件扩展点
fis.release = function (opt) {
    var src = fis.util.find(fis.project.root);
    var files = {};
    src.forEach(function (f) {
        var file = new File(f);
        // 对每个文件对象进行编译
        files[file.subpath] = fis.compile(file);
    });

    var packager = fis.matchRules('::package');
    var keys = Object.keys(packager);
    var ret = {
        files: files,
        map: {}
    };
    // 打包处理pre+
    if (packager.indexOf('prepackager') > -1) {
        pipe('prepackager', ret);
    }

    if (packager.indexOf('packager') > -1) {
        pipe('packager', ret);
    }

    files.forEach(function (f) {
        // 打包阶段产出的 map 表替换到文件
        if (f._isResourceMap) {
            f._content = f._content.replace(/\b__RESOURCE_MAP__\b/g, JSON.stringify(ret.map));
        }

    });
    // 处理spriter
    if (packager.indexOf('spriter') > -1) {
        pipe('spriter', ret);
    }

    if (packager.indexOf('postpackager') > -1) {
        pipe('postpackager', ret);
    }

};

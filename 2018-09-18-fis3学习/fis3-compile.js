fis.compile = function (file) {
    if (file.isFile()) {
        if (exports.useLint && file.lint) {
            pipe('lint', file);
        }

        if (!file.hasCache) {
            process(file);
        }
        else {
            file.revertCache();
        }
    }
    else {
        process(file);
    }
};

// parser：预处理阶段，比如 less、sass、es6、react 前端模板等都在此处预编译处理
// preprocessor：标准化前处理插件
// standard：标准化插件，处理内置语法(三大能力)
// postprocessor：标准化后处理插件
function process(file) {
    if (file.parser) {
        pipe('parser', file);
    }

    if (file.preprocessor) {
        pipe('preprocessor', file);
    }

    if (file.standard) {
        standard(file); // 标准化处理
    }

    if (file.postprocessor) {
        pipe('postprocessor', file);
    }

    if (file.optimizer) {
        pipe('optimizer', file);
    }
}

// 当一个文件被实例化为一个 File 对象后，包括一些文件基本属性，如 filename、realpath 等等，当这个文件被处理时，FIS3 还会把用户自定义的属性 merge 到文件对象上。

function File(filepath) {
    var props = path.info(filepath);
    merge(props, fis.matchRules(filepath)); // merge 分配到的属性
    assign(this, props); // merge 属性到对象
}

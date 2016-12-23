// 此处定义一些常用的方法

// 简单的深拷贝
function deepClone(obj) {
    let objStr = JSON.stringify(obj);
    return JSON.parse(objStr);
}

export default {
    deepClone
};

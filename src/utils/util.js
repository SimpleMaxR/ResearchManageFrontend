export function copyProperties(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) { // 确保只复制自身属性，而不是原型链上的属性
            a[key] = b[key];
        }
    }
}
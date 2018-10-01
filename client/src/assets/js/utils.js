
/**
 数组的分块
 */
const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
);


export {
    chunk,  //数组分块
}
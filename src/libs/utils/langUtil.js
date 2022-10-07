export default class LangUtil {
    /**
     * 值是否为空
     *  - 若是 undefined 或 null 则表示空，包括字符串的 'undefined' 'null' 'none'
     * @param val
     * @returns {boolean}
     */
    static isNil(val) {
        return !!(typeof val === "undefined" || val === null || ~["undefined", "null"].indexOf(`${val}`.toLowerCase()));
    }

    /**
     * 加全部属性
     * arr数组
     * obj对象
     * **/
    static addAll(arr) {
        if (null == arr || arr.length === 0) {
            return arr;
        }
        let arr1 = [];
        arr.forEach(element => {
            arr1.push(element);
        });
        arr1.unshift({ code: 0, codeName: "全部" });
        return arr1;
    }
}

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
}

import { isEqual, isObject, transform } from 'lodash'

/**
 * 
 * @param {*} curr 
 * @param {*} prev 
 * @returns 
 */
exports.getDiff = (curr, prev) => {
    function changes(object, base) {
        return transform(object, (result, value, key) => {
            if (!isEqual(value, base[key])) {
                result[key] = (isObject(value)
                    && isObject(base[key])) ? changes(value, base[key]) : value
            }
        })
    }
    return changes(curr, prev)
}
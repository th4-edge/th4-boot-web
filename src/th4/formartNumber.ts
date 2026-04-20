/**
 * 数字格式化函数
 *
 * 该函数提供了一种灵活的方式将数字格式化为字符串，包括设置精度、千位分隔符、小数点字符、前缀和后缀
 *
 * @param {number | string} value 要格式化的数字或数字字符串
 * @param {number} [precision = 2] 小数点后的位数，默认为 2
 * @param {string} [separator = ','] 千分位分隔符，默认为 ','
 * @param {string} [decimal = '.'] 小数点字符，默认为 '.'
 * @param {string} prefix 数字前的字符串，默认为 undefined
 * @param {string} suffix 数字后的字符串，默认为 undefined
 * @returns {string} 格式化后的字符串；如果输入值不是数字或字符串，则抛出类型错误
 */
export function formatNumber(
    value: number | string,
    precision: number = 2,
    separator: string = ',',
    decimal: string = '.',
    prefix?: string,
    suffix?: string
): string {
    // 类型检查
    if (typeof value !== 'number' && typeof value !== 'string') {
        console.warn('Expected value to be of type number or string')
    }
    if (typeof precision !== 'number') {
        console.warn('Expected precision to be of type number')
    }
    // 处理非数值或NaN的情况
    const numValue = Number(value)
    if (isNaN(numValue) || !isFinite(numValue)) {
        return ''
    }
    if (numValue === 0) {
        return numValue.toFixed(precision)
    }
    let formatValue = numValue.toFixed(precision)
    // 如果 separator 是数值而非字符串，会导致错误，此处进行检查
    if (typeof separator === 'string' && separator !== '') {
        const [integerPart, decimalPart] = formatValue.split('.')
        formatValue =
            integerPart.replace(/(\d)(?=(\d{3})+$)/g, '$1' + separator) + (decimalPart ? decimal + decimalPart : '')
    }
    return (prefix || '') + formatValue + (suffix || '')
}
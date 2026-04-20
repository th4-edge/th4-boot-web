/**
 * 数字金额转中文大写（适配财务凭证规范）
 * @param num 待转换的金额（支持整数/小数，最多2位小数）
 * @returns 中文大写金额（如：160.50 → 壹佰陆拾元伍角整）
 * @throws 非法金额时抛出错误
 */
export const amountToChinese=(num: number): string =>{
    // 1. 前置校验
    if (isNaN(num)) {
        throw new Error('金额必须为有效数字');
    }
    if (num < 0) {
        throw new Error('不支持负数金额');
    }
    if (num > 999999999999.99) {
        throw new Error('金额超出支持范围（最大支持999999999999.99）');
    }

    // 2. 定义基础字符
    const digitChars = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const integerUnits = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟']; // 整数单位（对应位数：个、十、百...仟亿）
    const decimalUnits = ['角', '分']; // 小数单位

    // 3. 格式化金额为 整数部分.小数部分（补零到2位）
    const fixedNum = num.toFixed(2); // 强制保留2位小数（如 160 → 160.00，160.5 → 160.50）
    const [integerStr, decimalStr] = fixedNum.split('.');
    const integer = parseInt(integerStr, 10);
    const decimal = parseInt(decimalStr, 10);

    // 4. 处理整数部分
    let integerChinese = '';
    if (integer === 0) {
        integerChinese = '零'; // 整数部分为0时，先写零
    } else {
        // 逐位处理整数（从高位到低位）
        const integerArr = integerStr.split('').map(Number);
        let zeroFlag = false; // 标记是否需要加零（避免连续零）

        for (let i = 0; i < integerArr.length; i++) {
            const digit = integerArr[i];
            const pos = integerArr.length - 1 - i; // 当前位的单位索引（个位=0，十位=1...）

            if (digit === 0) {
                zeroFlag = true; // 遇到0，标记需要加零（后续非0时补零）
                continue;
            }

            // 非0时，先补零（如果之前有0）
            if (zeroFlag) {
                integerChinese += '零';
                zeroFlag = false;
            }

            // 拼接数字+单位
            integerChinese += digitChars[digit] + integerUnits[pos];
        }
    }
    integerChinese += '元'; // 整数部分结尾加“元”

    // 5. 处理小数部分
    let decimalChinese = '';
    const jiao = Math.floor(decimal / 10); // 角位
    const fen = decimal % 10; // 分位

    if (decimal === 0) {
        decimalChinese = '整'; // 无小数时加“整”
    } else {
        if (jiao !== 0) {
            decimalChinese += digitChars[jiao] + decimalUnits[0];
        } else if (integer !== 0) {
            decimalChinese += '零'; // 角位为0但有分位，且整数部分非0时补零（如 160.05 → 壹佰陆拾元零伍分）
        }

        if (fen !== 0) {
            decimalChinese += digitChars[fen] + decimalUnits[1];
        }
    }

    // 6. 特殊处理：零元的情况（如 0.50 → 零元伍角整）
    if (integer === 0 && decimal > 0) {
        integerChinese = '零元';
    }

    // 7. 拼接最终结果（去除多余的零，如“零元零角整”→“零元整”）
    let result = integerChinese + decimalChinese;
    result = result.replace(/零元零角整/, '零元整');
    result = result.replace(/零角整/, '整');

    return result;
}

// 类型导出（可选）
export type AmountChineseOptions = {
    throwError?: boolean; // 是否抛出错误（默认true，false时返回空字符串）
};

/**
 * 安全版金额转大写（不抛出错误）
 * @param num 金额
 * @param options 配置
 * @returns 中文大写（失败返回空字符串）
 */
export const safeAmountToChinese=(
    num: number,
    options: AmountChineseOptions = { throwError: true }
): string =>{
    try {
        return amountToChinese(num);
    } catch (error) {
        if (options.throwError) {
            throw error;
        }
        console.error('金额转大写失败：', error);
        return '';
    }
}
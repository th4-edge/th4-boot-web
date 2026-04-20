export const color = [
    'rgba(37, 97, 239, 1)',
    'rgba(61, 212, 167, 1)',
    'rgba(102, 110, 232, 1)',
    'rgba(250, 116, 107, 1)',
    'rgba(253, 219, 120, 1)',
    'rgba(204, 204, 204, 1)'
]
export const listMMdd = (period: number, date: number = 0) => {
    const end = new Date();
    end.setTime(end.getTime() + date * 24 * 60 * 60 * 1000);
    const start = new Date(end.getTime() + period * 24 * 60 * 60 * 1000);
    const result = [];
    if (start.getTime() <= end.getTime()) {
        while (start.getTime() <= end.getTime()) {
            result.push((start.getMonth() + 1) + '-' + start.getDate());
            start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
        }
    } else {
        while (end.getTime() <= start.getTime()) {
            result.push((end.getMonth() + 1) + '-' + end.getDate())
            end.setTime(end.getTime() + 24 * 60 * 60 * 1000);
        }
    }

    return result;
}
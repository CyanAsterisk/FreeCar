export function padString(n: number) {
    return n < 10 ? '0'+n.toFixed(0) : n.toFixed(0)
}

export function formatDuration(sec: number) {
    const h = Math.floor(sec/3600)
    sec -= 3600 * h
    const m = Math.floor(sec / 60)
    sec -= 60 * m
    const s = Math.floor(sec)
    return {
        hh: padString(h),
        mm: padString(m),
        ss: padString(s),
    }
}

export function formatFee(cents: number) {
    return (cents / 100).toFixed(2)
}

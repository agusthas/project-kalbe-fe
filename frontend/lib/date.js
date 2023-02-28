const defaultOptions = { year: 'numeric', month: 'short', day: 'numeric' }

export function formatDate(date, options = null){
    return date.toLocaleDateString('en-us', options ?? defaultOptions)
}
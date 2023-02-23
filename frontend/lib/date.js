const options = { year: 'numeric', month: 'short', day: 'numeric' };

export function formatDate(date){
    return date.toLocaleDateString('id', options)
}
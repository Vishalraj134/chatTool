export function checkHeading(str){
    // to remove unnessecry star from answers
    return /^(\*)(\*)(.*)\*$/.test(str)
}

export function replaceHeadingStars(str){
    // to remove unnessecry star from answers
    return str.replace(/^(\*)(\*)|(\*)$/g,'')
}
export function checkHeading(str){
    // removing un neccesry *
    return /^(\*)(\*)(.*)\*$/.test(str)
}

export function replaceHeadingStarts(str){
    return str.replace(/^(\*)(\*)|(\*)$/g,'')
}
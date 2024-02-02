var original = document.getElementsByTagName('textarea')[0]
var textOriginal = original.value
var textEdit = textOriginal
var textHTML = document.getElementsByTagName('textarea')[1]

function convertTagsMDToHTML (){
    var original = document.getElementsByTagName('textarea')[0]
    var textOriginal = original.value
    var textEdit = textOriginal
    var html = document.getElementsByTagName('textarea')[1]
    var textHTML = html.value;
    replaceMarks();
}
function replaceMarks() {
    textEdit = textEdit.replaceAll('<', '&lt;')
    textEdit = textEdit.replaceAll('>', '&lt;')
    textEdit = textEdit.replaceAll('\n', '\n<br>\n')
    textEdit = textEdit.replaceAll('**', '<strong>')
    textEdit = textEdit.replaceAll('*','<i>')
    textEdit = textEdit.replaceAll('*','</i>')
    textEdit = textEdit.replaceAll('```jsx', '<code>')
    textEdit = textEdit.replaceAll('```html', '<code>')
    textEdit = textEdit.replaceAll('```css', '<code>')
    textEdit = textEdit.replaceAll('```', '</code>')
    textEdit = textEdit.replaceAll('###', '<h3>')
    textEdit = textEdit.replaceAll('##', '<h2>')
    textEdit = textEdit.replaceAll('#', '<h1>')
    textEdit = textEdit.replaceAll('- ', '<li>')
    indentationCode();
}
function indentationCode(){
    textEdit = textEdit.replaceAll('\n\n', '')
    closeTags();
}
function closeTags(){
    var tagSearch = ''
    var closeTag = ''
    var closeIndication = ''
    var nTagsToClose = 4

    for (let n = 0; n <= nTagsToClose; n++) {
        switch (n) {
            case 0:
                // li
                tagSearch = '<li>'
                closeTag = '</li>'
                closeIndication = '<br>'
                break;
            case 1:
                //h1
                tagSearch = '<h1>'
                closeTag = '</h1>'
                closeIndication = '<br>'
                break;
            case 2:
                //h2
                tagSearch = '<h2>'
                closeTag = '</h2>' 
                closeIndication = '<br>'      
                break;
            case 3:
                //h3
                tagSearch = '<h3>'
                closeTag = '</h3>'
                closeIndication = '<br>'    
                break;
            case 4:
                //'![Untitled]'
                tagSearch = '![Untitled]'
                replaceAtChar = ')'
                closeTag = '<!--<img src="">-->'
                break;
        
            default:
                break;
        }

        var indexAnalized = textEdit.indexOf(tagSearch) + tagSearch.length
        var search = tagSearch
        
        while(textEdit.split(tagSearch).length-1 != textEdit.split(closeTag).length-1){
            //enquanto o numero das tags não for igual ao numero de closetags => todas(do tipo procurado) não estiverem fechadas
            
            //procurar o search(tag ou indicationClose)
                //varrer o array textEdit até achar a tag ou indication procurado
                    //se estiver procurando a indicação de fechamento
                        //pode ser por exemplo uma quebra de linha('<br>')
                        //se não achar é pq essa tag termina ao final do textEdit:
                            //textEdit.concat(tagClose)
            while (textEdit.charAt(indexAnalized) != search[0]) {
                
                if (indexAnalized >= textEdit.length) {
                    textEdit = textEdit.concat(closeTag)
                    textHTML.value = textEdit    
                }
                indexAnalized++
            }
            if (textEdit.charAt(indexAnalized) == search[0]) {
                //verifique-se que todos os characteres correspondem aos da tag ou indicação procurados e não apenas o primeiro:
                //enquanto o char do index x corresponder com o do index analizado vá somando +1 se algum não corresponder saia do loop de comparação com a tag procurada e continuia procurando o primeito caracter: search[0] no textEdit
                let x = 0
                while (textEdit.charAt(indexAnalized) == search[x] && x < search.length) {
                    x++
                    indexAnalized++
                }
                if(textEdit.charAt(indexAnalized) == search[x] && x == search.length){
                    //tag encontrada agr tem que ver onde está a indicação de pausa
                    if(search == tagSearch){
                        search = closeIndication
                    }else if(search == closeIndication){
                        indexAnalized = indexAnalized - search.length
                        //se tiver achado a indicação de fechamento retorne para o index do primeiro character da closeIndication(indexAnalized = indexAnalized - search.length) e coloque a closeTag
                        textEdit = `${textEdit.slice(0,indexAnalized)}${closeTag}${textEdit.slice(indexAnalized, textEdit.length)}`
                        textHTML.value = textEdit
                    }
                }
            }
            //não é a tag procurada, continue procurando a tagSearch
        }
    }
}

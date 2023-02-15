const setLabels = document.querySelectorAll('#labels li');
const words = document.querySelectorAll('.word');
const updateSentArr = document.querySelectorAll('.updateSentence');
const taggedWords = document.querySelectorAll('.taggedSpan');

function activeLabelToggle(e) {
    let activeLabelCurrent = document.querySelector('.activeLabel');
    activeLabelCurrent.classList.toggle('activeLabel');
    this.classList.toggle('activeLabel');
}

function untaggingWord(e) {
    const clickedElmUnTagged = this;
    const spanWordUntagged = document.createElement('span');
    const wordIdx = clickedElmUnTagged.firstElementChild.getAttribute('data-widx');
    spanWordUntagged.append(clickedElmUnTagged.firstElementChild.innerText);
    spanWordUntagged.setAttribute('data-widx', wordIdx);
    spanWordUntagged.classList.add('word')
    spanWordUntagged.addEventListener('click', wordTagging)
    clickedElmUnTagged.replaceWith(spanWordUntagged)

}

function wordTagging(e) {
    const activeLabel = document.querySelector('.activeLabel');
    const clickedElm = this;
    const wordIdx = this.getAttribute('data-widx')
    const taggedWordSpan = document.createElement('span');
    const spanLabel = document.createElement('span');
    const spanLabelWord = document.createElement('span');
    taggedWordSpan.append(clickedElm.innerText);
    taggedWordSpan.setAttribute('data-widx', wordIdx);
    taggedWordSpan.classList.add('taggedWord', 'word');
    spanLabel.append(activeLabel.innerText);
    spanLabelWord.append(taggedWordSpan)
    spanLabelWord.append(spanLabel)
    // spanLabelWord.setAttribute('wlbl', activeLabel.innerText)
    spanLabelWord.classList.toggle('taggedSpan');
    spanLabelWord.addEventListener('click', untaggingWord);
    clickedElm.replaceWith(spanLabelWord);

}

function updateSentence() {
    const selectedRowSent = this.parentElement.parentElement.parentElement
    const updateSent = {}
    const updatedWords = []
    const semanticLabel = document.querySelector(`[id ="${selectedRowSent.id}"] #semanticLabel span`)
    const extractable = document.querySelector(`[id ="${selectedRowSent.id}"] #extractable span`)
    const selfContained = document.querySelector(`[id ="${selectedRowSent.id}"] #isSelfContained span`)
    const words = document.querySelectorAll(`[id ="${selectedRowSent.id}"] .sentPlace .word`)
    updateSent.sentNumber = selectedRowSent.id
    updateSent.semanticLabel = semanticLabel.innerText
    updateSent.isExtractable = extractable.innerText
    updateSent.isSelfContanined = selfContained.innerText
    for (let word of words) {
        const wordIndexPair = []
        let wordIdx = word.getAttribute('data-widx')
        if (word.classList.contains('taggedWord')) {
            let labelText = word.parentElement.children[1].innerText
            wordIndexPair.push(wordIdx)
            wordIndexPair.push(labelText)
        }
        else {
            wordIndexPair.push(wordIdx)
            wordIndexPair.push('none')
        }
        updatedWords.push(wordIndexPair)
    }

    updateSent.updatedWordsAndIndx = updatedWords
    axios({
        method: 'post',
        url: '/updatesentences',
        data: {
            data: updateSent
        }
    });
    console.log(updateSent)
}

// function updateSentence() {
//     axios({
//         method: 'post',
//         url: '/updatesentences',
//         data: {
//             firstName: 'Fred',
//             lastName: 'Flintstone'
//         }
//     });
// }

setLabels.forEach(label => {
    label.addEventListener('click', activeLabelToggle)
})



words.forEach(word => {
    word.addEventListener('click', wordTagging)
})


taggedWords.forEach(taggedWord => {
    taggedWord.addEventListener('click', untaggingWord)
})


updateSentArr.forEach(sent => {
    sent.addEventListener('click', updateSentence)
})
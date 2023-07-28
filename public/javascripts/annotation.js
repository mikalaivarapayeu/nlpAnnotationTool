const setLabels = document.querySelectorAll('#labels li');
const words = document.querySelectorAll('.word');
const updateSentArr = document.querySelectorAll('.updateSentence');
const taggedWords = document.querySelectorAll('.taggedSpan');
const semanticTags = document.querySelectorAll('.semanticTagSelection select')
const theSelfContained = document.querySelectorAll('.isSelfContainedSelection select')
const theExtractable = document.querySelectorAll('.extractionSelection select')
const searchPage = document.querySelector('#searchPageBtn')

// console.log(semanticTags)


function activeLabelToggle(e) {
    let activeLabelCurrent = document.querySelector('.activeLabel');
    activeLabelCurrent.classList.toggle('activeLabel');
    this.classList.toggle('activeLabel');
}

function untaggingWord(e) {
    const clickedElmUnTagged = this;
    const spanWordUntagged = document.createElement('span');
    console.log(clickedElmUnTagged)
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
    taggedWordSpan.classList.add('taggedWord');
    spanLabel.append(activeLabel.innerText);
    spanLabel.classList.add('taggedLabel')
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
    const semanticLabel = document.querySelector(`[id ="${selectedRowSent.id}"] .semanticLabel .semTagPlaceHolder span`)
    const extractable = document.querySelector(`[id ="${selectedRowSent.id}"] .extractable .extractablePlaceHolder span`)
    const selfContained = document.querySelector(`[id ="${selectedRowSent.id}"] .isSelfContained .containedPlaceHolder span`)
    const words = document.querySelectorAll(`[id ="${selectedRowSent.id}"] .sentPlace .word, [id ="${selectedRowSent.id}"] .sentPlace .taggedWord`)
    updateSent.sentNumber = selectedRowSent.id
    updateSent.semanticLabel = semanticLabel.innerText
    if (extractable.innerText === 'Yes') {
        updateSent.isExtractable = true
    } else {
        updateSent.isExtractable = false
    }
    if (selfContained.innerText === 'Yes') {
        updateSent.isSelfContanined = true
    } else {
        updateSent.isSelfContanined = false
    }

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
    let queryParam = reqParam.replaceAll('&amp;', '&');
    axios({
        method: 'post',
        // url: `/sents/updatesentences?page=${pageForUpdate}&name=${collname}&lbsname=${lblSetName}`,
        url: `/sents/updatesentences?${queryParam}${pageForUpdate}`,
        data: {
            data: updateSent
        }
    })

};


function semanticTagSelection(e) {
    const newSelectedTag = this;
    const currentTag = this.parentElement.parentElement.children[1].children[0]
    currentTag.innerText = newSelectedTag.value
    // console.log(currentTag)

}

function booleanSelection(e) {
    const newSelectedTag = this;
    const currentTag = this.parentElement.parentElement.children[1].children[0]
    // console.log(currentTag.innerText)
    if (newSelectedTag.value === 'true') {
        currentTag.innerText = 'Yes';
    } else {
        currentTag.innerText = 'No'
    }
    // console.log(currentTag)

}

function findPage(e) {
    e.preventDefault()
    const pageFormData = document.querySelector('#pageSearch')
    if ((pageFormData.value >= 1)) {
        let queryParam = reqParam.replaceAll('&amp;', '&');
        location.href = `/sents?${queryParam}${pageFormData.value}`
        // location.href = `/sents?page=${pageFormData.value}&name=${collname}&lbsname=${lblSetName}`
    }
}




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

semanticTags.forEach(semTagSpan => {
    semTagSpan.addEventListener('change', semanticTagSelection)
})

theSelfContained.forEach(selfContaninedItem => {
    selfContaninedItem.addEventListener('change', booleanSelection)
})

theExtractable.forEach(isExtractable => {
    isExtractable.addEventListener('change', booleanSelection)
})

searchPage.addEventListener('click', findPage)
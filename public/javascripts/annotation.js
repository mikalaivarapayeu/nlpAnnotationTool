const setLabels = document.querySelectorAll('#labels li');
const words = document.querySelectorAll('.word');
const updateSentArr = document.querySelectorAll('.updateSentence');
const taggedWords = document.querySelectorAll('.taggedWord');

function activeLabelToggle(e) {
    let activeLabelCurrent = document.querySelector('.activeLabel');
    activeLabelCurrent.classList.toggle('activeLabel');
    this.classList.toggle('activeLabel');
}

function untaggingWord(e) {
    const clickedElmUnTagged = this;
    const spanWordUntagged = document.createElement('span');
    spanWordUntagged.append(clickedElmUnTagged.firstElementChild.innerText);
    spanWordUntagged.classList.add('word')
    spanWordUntagged.addEventListener('click', wordTagging)
    clickedElmUnTagged.replaceWith(spanWordUntagged)

}

function wordTagging(e) {
    const activeLabel = document.querySelector('.activeLabel');
    const clickedElm = this;
    const taggedWordSpan = document.createElement('span');
    const spanLabel = document.createElement('span');
    const spanLabelWord = document.createElement('span');
    taggedWordSpan.append(clickedElm.innerText);
    spanLabel.append(activeLabel.innerText);
    spanLabelWord.append(taggedWordSpan)
    spanLabelWord.append(spanLabel)
    spanLabelWord.setAttribute('wlbl', activeLabel.innerText)
    spanLabelWord.classList.toggle('taggedWord');
    spanLabelWord.addEventListener('click', untaggingWord);
    clickedElm.replaceWith(spanLabelWord);

}

function updateSentence() {
    const updateSent = {}
    const semanticLabel = document.querySelector('#semanticLabel span')
    const extractable = document.querySelector('#extractable span')
    const isSelfContained = document.querySelector('#isSelfContained span')
    const sentence = document.querySelector('.sentPlace')

    console.log(semanticLabel.innerText)
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
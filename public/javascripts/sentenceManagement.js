// const wordLabelPair = document.querySelectorAll('.wordLabelPair');
const newPairs = document.querySelectorAll('.btnNewPair');
const modal = document.getElementById('Modal')
const wordSave = document.querySelector("#saveWord")
const deleteWords = document.querySelectorAll('.deleteWord');
const saveSentWords = document.querySelector("#saveSentWords")



function duplicateWordLabelPair(e) {
    e.preventDefault()
    console.log('Hello')
}


modal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const buttonModal = event.relatedTarget;
    const closestWordLabelDiv = buttonModal.closest('.wordLabelPair');
    if (buttonModal.innerText == 'Update Word') {
        // const closestWordLabelDiv = buttonModal.closest('.wordLabelPair');
        const sentWord = closestWordLabelDiv.children[0].children[0].innerText;
        const wordPlaceholder = document.querySelector('#sentWord');
        wordPlaceholder.placeholder = sentWord;
        wordPlaceholder.value = sentWord;
        closestWordLabelDiv.classList.add('updateWord');
        // console.log(buttonModal)
    } else {
        const wordPlaceholder = document.querySelector('#sentWord');
        wordPlaceholder.placeholder = '';
        wordPlaceholder.value = '';
        closestWordLabelDiv.classList.add('addWord');
    }
    // closestWordLabelDiv.classList.add('updateWord');

})



modal.addEventListener('hide.bs.modal', function (event) {
    const updateWordDiv = document.querySelector('.updateWord');
    const addWordDiv = document.querySelector('.addWord');
    if (updateWordDiv) {
        updateWordDiv.classList.remove('updateWord')
    }
    if (addWordDiv) {
        addWordDiv.classList.remove('addWord')
    }
})

wordSave.addEventListener('click', function (event) {
    const updateWordDiv = document.querySelector('.updateWord');
    const addWordDiv = document.querySelector('.addWord');
    const wordForm = document.querySelector('#sentWord');
    if (updateWordDiv) {
        // const wordForm = document.querySelector('#sentWord');
        const clickedWord = updateWordDiv.children[0].children[0];
        clickedWord.innerText = wordForm.value
    }
    if (addWordDiv) {
        if (wordForm.value) {
            // Common elements
            const rowDiv = document.createElement('div');
            const spanWord = document.createElement('span');
            // Words elements
            rowDiv.classList.add('row', 'wordLabelPair', 'pt-2');
            const wordDiv = document.createElement('div');
            wordDiv.classList.add('col-4', 'word')
            const wordSpan = document.createElement('span');
            // Label elelemnts
            const labelDiv = document.createElement('div');
            labelDiv.classList.add('col-2', 'label')
            const labelSpan = document.createElement('span');
            // Button elements
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('col-6')
            const updateButton = document.createElement('button')
            updateButton.classList.add('btn', 'btn-primary', 'btn-sm', 'px-1')
            const addButton = document.createElement('button')
            addButton.classList.add('btn', 'btn-primary', 'btn-sm', 'px-1')
            const deleteButton = document.createElement('button')
            deleteButton.classList.add('btn', 'btn-primary', 'btn-sm', 'deleteWord', 'px-1')
            // construct HTML frgament
            wordSpan.innerText = wordForm.value
            wordDiv.append(wordSpan)
            labelSpan.innerText = 'none'
            labelDiv.append(labelSpan)
            updateButton.innerText = 'Update Word'
            updateButton.setAttribute('data-bs-toggle', 'modal')
            updateButton.setAttribute('data-bs-target', '#Modal')
            buttonDiv.append(updateButton)
            addButton.innerText = 'Add Word'
            addButton.setAttribute('data-bs-toggle', 'modal')
            addButton.setAttribute('data-bs-target', '#Modal')
            buttonDiv.append(addButton)
            deleteButton.innerText = 'Delete Word'
            deleteButton.addEventListener('click', deletWordFunction)
            buttonDiv.append(deleteButton)
            rowDiv.append(wordDiv)
            rowDiv.append(labelDiv)
            rowDiv.append(buttonDiv)
            // Place element in correcrt place
            console.log(addWordDiv)
            addWordDiv.insertAdjacentElement('beforebegin', rowDiv)
        }

    }
    const selectedModal = bootstrap.Modal.getInstance(document.getElementById('Modal'));
    selectedModal.hide()
})


function deletWordFunction(event) {
    const buttonDeleteWord = this;
    const closestWordLabelDiv = buttonDeleteWord.closest('.wordLabelPair');
    closestWordLabelDiv.remove()
}


deleteWords.forEach(deleteWord => {
    deleteWord.addEventListener('click', deletWordFunction)
});


function saveWordsFunction(event) {
    const allWordLabelPairsDivs = document.querySelectorAll('.wordLabelPair')
    const buttonId = document.querySelector('#saveSentWords')
    // console.log(buttonId.getAttribute('data-sent-id'))
    const wordLabelList = []
    for (let wordLabelDiv of allWordLabelPairsDivs) {
        const wordLabelPair = []
        wordLabelPair.push(wordLabelDiv.children[0].children[0].innerText)
        wordLabelPair.push(wordLabelDiv.children[1].children[0].innerText)
        wordLabelList.push(wordLabelPair)

    }
    axios({
        method: 'post',
        url: '/sents/updatesentwords',
        data: {
            sent_id: buttonId.getAttribute('data-sent-id'),
            data: wordLabelList
        }
    });
    // console.log(wordLabelList[0])
}

saveSentWords.addEventListener('click', saveWordsFunction)


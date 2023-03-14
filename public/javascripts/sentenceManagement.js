// const wordLabelPair = document.querySelectorAll('.wordLabelPair');
const newPairs = document.querySelectorAll('.btnNewPair');
const modal = document.getElementById('Modal')
const wordSave = document.querySelector("#saveWord")




function duplicateWordLabelPair(e) {
    e.preventDefault()
    console.log('Hello')
}


modal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const buttonModal = event.relatedTarget;
    const closestWordLabelDiv = buttonModal.closest('.wordLabelPair');
    const sentWord = closestWordLabelDiv.children[0].children[0].innerText;
    const wordPlaceholder = document.querySelector('#sentWord');
    wordPlaceholder.placeholder = sentWord;
    wordPlaceholder.value = sentWord;
    closestWordLabelDiv.classList.add('clickedPair');
    // console.log(buttonModal)

})





modal.addEventListener('hide.bs.modal', function (event) {
    const clickedWordLabelPairDiv = document.querySelector('.clickedPair');
    clickedWordLabelPairDiv.classList.remove('clickedPair')
})

wordSave.addEventListener('click', function (event) {
    const clickedWordDiv = document.querySelector('.clickedPair');
    const wordForm = document.querySelector('#sentWord');
    const clickedWord = clickedWordDiv.children[0].children[0];
    const selectedModal = bootstrap.Modal.getInstance(document.getElementById('Modal'));
    console.log(clickedWordDiv)
    clickedWord.innerText = wordForm.value
    // clickedWordDiv.classList.remove('clickedPair')
    selectedModal.hide()
})
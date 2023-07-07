const goAnnotationButtons = document.querySelectorAll('.goToAnnotation');

function startAnnotation() {
    const collectionName = this.closest('.collectionNameRow').children[0].innerText
    const labelSetName = this.closest('.collectionNameRow').children[1].children[0].value
    let url = `/sents?page=1&name=${collectionName}&lbsname=${labelSetName}`
    window.location.href = url
    // console.log(labelSetName)
}


goAnnotationButtons.forEach(goAnnotationButton => {
    goAnnotationButton.addEventListener('click', startAnnotation)
})
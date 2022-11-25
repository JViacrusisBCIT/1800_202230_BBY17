var newFileModal = document.getElementById('new-file-modal')
var bsNewFileModal = new bootstrap.Modal(document.getElementById('new-file-modal'), {
    keyboard: false
})
var confirmCreateButton = document.getElementById('confirm-create-button')

// toggle file creation modal
newFileModal.addEventListener('show.bs.modal', function (event) {
    console.log("modal toggled");
    let modalTitle = newFileModal.querySelector('.modal-title');
    modalTitle.textContent = 'New File';
})

// confirm file creation
confirmCreateButton.addEventListener('click', function (event) {

    //hides the file creation modal
    bsNewFileModal.hide();

    let fileNameField = document.getElementById('file-name');
    let fileName = fileNameField.value;
    fileNameField.value = "";

    console.log(fileName);


})
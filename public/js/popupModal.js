
let backPop = document.querySelector('.backpop')
let con = document.querySelector('.con')
let updateCon = document.querySelector('.update-con')

let addBtn = document.querySelector('.add-btn')
addBtn.addEventListener('click', conFun)

let cancelBtn = document.querySelector('.cancel-btn')

function conFun(){
    backPop.style.visibility = 'visible'
    con.style.visibility = 'visible'

}

function closePopup(){
    backPop.style.visibility = 'hidden'
    con.style.visibility = 'hidden'
}

function updateModalOpen(){
    backPop.style.visibility = 'visible'
    updateCon.style.visibility = 'visible'
}
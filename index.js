const inputEl = document.getElementById("input")
const saveEl = document.getElementById("save-btn")
const showEl = document.getElementById("show-el")
const tabBtn=document.getElementById("tab-btn")
const dltBtn=document.getElementById("dlt-btn")
let myLeads=[]
let leadsFromMyStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromMyStorage) {
    myLeads = leadsFromMyStorage
    renderLeads()
}
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads()
    })
})
function renderLeads() {
    showEl.innerHTML = ""
    for (let i = 0; i < myLeads.length; i++) {
        showEl.innerHTML += `
            <li>
                <a href="${myLeads[i]}" target="_blank">
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
}
saveEl.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()
    inputEl.value = ""
})
dltBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    renderLeads()
})


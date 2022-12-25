let myLeads = []


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


//check whether leadsFromLocalStorage evaluates to a truthy value (whether there are any user-input links)
//if so, set your leads to the user input links, call renderLeads function
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (leadsFromLocalStorage)
{
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

//recieves an array, prints out links in the array
function render(leads)
{
    let listItems = ""
    for (let i = 0; i<leads.length; i++)
    {
        //template string:
        listItems += 
            `
                <li>
                    <a target ='blank' href ='${leads[i]}'> 
                        ${leads[i]} 
                    </a> 
                </li>
                `
        
    }
    ulEl.innerHTML = listItems
    
}

//saves input values to myLeads array, saves value of link in local storage
inputBtn.addEventListener("click",function()
{
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLeads))
    render(myLeads)
    
})


/*when double clicked, delete button deletes all links, including clearing 
local storage, myLeads array, as well as the DOM*/
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

//when clicked, tab button saves link of current tab to myLeads array, then saves updated array to local storage, and DOM
tabBtn.addEventListener("click", function(){
    //gets url of current tab from chrome tabs API
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLeads))
        render(myLeads)
    })
})


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-c51f7-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messageListInDB = ref(database, "messageList")


const inputField = document.getElementById("input-field")
const publishBtn = document.getElementById("publish-btn")
const messageList = document.getElementById("message-list")


publishBtn.addEventListener("click", function() {
    let inputValue = inputField.value.trim();
    
    //push(messageListInDB, inputValue)
    if (inputValue != "") {
        push(messageListInDB, inputValue);
        clearInputField()
        
    }
    
})

onValue(messageListInDB, function(snapshot) {
    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearMessageList()
    
    for (let i = 0; i < itemsArray.length; i++){
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        appendListMessages(currentItem)
    }
    } else {
        messageList.innerHTML = "You need to compose a note first..."
    }
})


function clearMessageList() {
    messageList.innerHTML = ""
}


function clearInputField() {
    inputField.value = ""
}



function appendListMessages(item) {
   let itemID = item[0]
   let itemValue = item[1]
   
   let newEl = document.createElement("p")
   
   newEl.textContent = itemValue
   
   newEl.addEventListener("click", function() {
       let exactLocationItemInDB = ref(database, `messageList/${itemID}`)
       remove(exactLocationItemInDB)
   })
   
   messageList.append(newEl)
}
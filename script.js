let userInput = document.getElementById("date") ;
userInput.max = new Date().toISOString().split("T")[0] ; 
let result = document.getElementById("result") ;
let historyList = document.getElementById("historyList");
let clearHistoryButton = document.getElementById("clearHistoryButton");

loadHistory();

function calculateAge() {
    let birthDate = new Date(userInput.value) ;

    let d1 = birthDate.getDate() ;
    let m1 = birthDate.getMonth() + 1 ;
    let y1 = birthDate.getFullYear() ;

    let today = new Date() ;

    let d2 = today.getDate() ;
    let m2 = today.getMonth() + 1 ;
    let y2 = today.getFullYear() ;

    let d3 , m3 , y3 ;

    y3 = y2 - y1 ;

    if(m2 >= m1) {
        m3 = m2 - m1 ;
    }else{
        y3-- ; 
        m3 = 12 + m2 - m1 ;
    }

    if(d2 >= d1){
        d3 = d2 - d1 ;
    }else{
        m3--;
        d3 = getDaysInMonths(y1 , m1) + d2 - d1 ;
    }
    if(m3 < 0 ) {
        m3 = 11 ; 
        y3--;
    }
    result.innerHTML = `You Are <span>${y3}</span> years, <span>${m3}</span> months and <span>${d3}</span> days old` ;

    addToHistory(y3, m3, d3);
    saveHistory();
}

function getDaysInMonths(year , month) {
    return new Date(year , month , 0)
}

function addToHistory(years, months, days) {
    const historyItem = document.createElement("li");
    historyItem.textContent = `Age: ${years} years, ${months} months, ${days} days`;
    historyList.appendChild(historyItem);
}

function saveHistory() {
    localStorage.setItem("ageHistory", JSON.stringify(Array.from(historyList.children).map(item => item.textContent)));
}
  
function loadHistory() {
    const historyData = localStorage.getItem("ageHistory");
    if (historyData) {
      const historyItems = JSON.parse(historyData);
      historyItems.forEach(item => {
        const historyItem = document.createElement("li");
        historyItem.textContent = item;
        historyList.appendChild(historyItem);
      });
    }
}

clearHistoryButton.addEventListener("click", clearHistory);

function clearHistory() {
    historyList.innerHTML = " ";
    localStorage.removeItem("ageHistory");
}
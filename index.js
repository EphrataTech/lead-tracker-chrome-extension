let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// Get leads from localStorage when page loads
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

// Save tab URL (Chrome extension functionality)
tabBtn.addEventListener("click", () => {
  // For demo purposes, we'll use the current page URL
  // In a real Chrome extension, this would use chrome.tabs.query()
  const currentUrl = window.location.href
  myLeads.push(currentUrl)
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)

  console.log("Current tab saved:", currentUrl)
})

// Save input value
function saveInput() {
  const inputValue = inputEl.value.trim()
  if (inputValue) {
    myLeads.push(inputValue)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log("Lead saved:", inputValue)
  }
}

// Delete all leads
function deleteAll() {
  if (myLeads.length > 0) {
    if (confirm("Are you sure you want to delete all leads?")) {
      myLeads = []
      localStorage.clear()
      render(myLeads)
      console.log("All leads deleted")
    }
  }
}

// Render leads to the DOM
function render(leads) {
  let listItems = ""

  if (leads.length === 0) {
    ulEl.innerHTML = '<div class="empty-state">No leads saved yet. Add some URLs to get started!</div>'
    return
  }

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i]
    const isUrl = lead.includes("http") || lead.includes("www") || lead.includes(".com")

    if (isUrl) {
      listItems += `
        <li class="new-item">
          <a target='_blank' href='${lead}'>
            ${lead}
          </a>
        </li>
      `
    } else {
      listItems += `
        <li class="new-item">
          <span>${lead}</span>
        </li>
      `
    }
  }

  ulEl.innerHTML = listItems
}

// Allow Enter key to save input
inputEl.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    saveInput()
  }
})

// Console logs for debugging (Scrimba style)
console.log("Leads Tracker loaded!")
console.log("Current leads:", myLeads)

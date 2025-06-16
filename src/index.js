// Const to get HTML elements
const guestForm = document.getElementById ('guestForm') 
const guestName = document.getElementById ('guestName')
const guestCategory = document.getElementById ('guestCategory')
const guestList = document.getElementById ('guestList')

let guests = []
// Setting up an event listener and preventing the page from loading with event.preventDefault
guestForm.addEventListener('submit', function (event) {
  event.preventDefault();
// Getting guest name and category from the form
  const name = guestName.value;
  const category = guestCategory.value;
// If conditions (no name & guest limit reached)
  if (!name) return;
  
  if (guests.length >= 10) {
    alert("Guest list limit reached (10 guests).");
    return;
  }
// Creating a guest object with id (unique identifier for each guest), name, category, rsvp and time added
    const guest = {
    id: Date.now(),
    name,
    category,
    rsvp: 'Not Attending',
    addedAt: new Date().toLocaleTimeString(),
    }

console.log(guest)
// Adding the guest to the guest array, shows updated list (renderList) & resets to clear input fields
guests.push(guest);
renderList();
guestForm.reset();
});

// Clears out list to rebuilt again, loops through each guest & creates list item for every guest
function renderList() {
  guestList.innerHTML = '';
  guests.forEach(guest => {
    const li = document.createElement('li');
    li.className = `guest ${guest.category.toLowerCase()}`;
// Add guest content inside list <li> & displays the buttons
    li.innerHTML = `
      <span><strong>${guest.name}</strong> <em>[${guest.category}]</em> - ${guest.addedAt}</span>
      <span class="status ${guest.rsvp === 'Attending' ? 'attending' : 'not-attending'}">
        ${guest.rsvp}
      </span>
      <button onclick="toggleRSVP(${guest.id})">Toggle RSVP</button>
      <button onclick="editGuest(${guest.id})">Edit</button>
      <button onclick="removeGuest(${guest.id})">Remove</button>
    `;

    guestList.appendChild(li);
  });
}

// Functions to toggle RSVP, edit and remove guests
function toggleRSVP(id) {
  guests = guests.map(guest => {
    if (guest.id === id) {
      return {
        ...guest,
        rsvp: guest.rsvp === "Attending" ? "Not Attending" : "Attending"
      };
    }
    return guest;
  });
  renderList();
}

function editGuest(id) {
  const guest = guests.find(guest => guest.id === id);
  const newName = prompt("Edit guest name:", guest.name);
  if (newName && newName) {
    guest.name = newName;
    renderList();
}
}

function removeGuest(id) {
  guests = guests.filter(guest => guest.id !== id);
  renderList();
}



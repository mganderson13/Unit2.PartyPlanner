const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events`;
//TODO
//The app contains a list of the names, dates, times, locations, and descriptions of all parties.
//Each party in the list has a delete button which removes the party when clicked.
//The app contains a form that allows a user to enter information about a party and add it to the list.
//The data stored in state is updated to stay in sync with the API.

const state = {
    parties: [],
}

const form = document.querySelector('#addParty');
const parties = document.querySelector('#parties');
form.addEventListener("submit", addParty);


async function render() {
    await getParties();
    renderParty();
}
render();

async function getParties() {
    try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.parties = json.data;
  } catch (error) {
    console.error(error);
  }
}
console.log(state);
function renderParty () {
    if(!state.parties.length){
        parties.innerHTML='There are no parties to plan :(';
        return;
    }
    const partyDisplay = state.parties.map((party) =>{
        const partyInfo = document.createElement('li');
        partyInfo.innerHTML=       
        `<h2>${party.name}</h2>
        <p>${party.date}<p>
        <p>${party.description}</p>;
        <p>${party.location}</p>`;
        //Delete button
        const button = document.createElement("button");
        button.textContent = "Delete party";
        //make button work, deleteButton declared outside function
        button.addEventListener('click', () => deleteButton(party.id));
        //add buttons to partyInfo
        partyInfo.append(button);

        return partyInfo;
    });
    //make sure info has a place to go
    parties.replaceChildren(...partyDisplay);
}
//deleteButton function
//needs to be async?
function deleteButton (id) {
    try {
        const response = fetch(`${API_URL}/${id}`, {
            method: "DELETE",
          });
    render();
}catch (error) {
    console.log(error);
  };
}

//create a party, then add it with addParty
async function createParty(name, date, location, description) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date, location, description }),
      });
      const json = await response.json();
     
      render();
    } catch (error) {
        console.error(error);
      };
    }
    
//add a party to the API with button
async function addParty(event) {
    event.preventDefault();
    // call our async function to create a party
    await createParty(
      form.name.value,
      form.date.value,
      form.location.value,
      form.description.value,
    );
    // clear the inputs
    form.name.value = '';
    form.date.value = '';
    form.location.value = '';
    form.description.value = '';
  }
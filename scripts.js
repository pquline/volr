//const WEBURL = "http://localhost:3000"; // Local development
const WEBURL = "https://beta.volr.cc"; // Online
const interchangeStationsRennes = [
    "Sainte-Anne",
    "Gares"];
const interchangeStationsMarseille = [
    "Saint-Charles",
    "Castellane"];
const interchangeStationsParis = [
    "Arts et Métiers",
    "Aulnay-sous-Bois",
    "Balard",
    "Barbès-Rochechouart",
    "Basilique de Saint-Denis",
    "Bastille",
    "Belleville",
    "Bercy",
    "Bibliothèque François Mitterrand",
    "Bobigny Pablo Picasso",
    "Bondy",
    "Bonne Nouvelle",
    "Champs-Élysées – Clemenceau",
    "Charles De Gaulle-Étoile",
    "Chaussée d'Antin - La Fayette",
    "Châtelet",
    "Châtelet-Les Halles",
    "Châtillon-Montrouge",
    "Cité Universitaire",
    "Concorde",
    "Daumesnil",
    "Denfert-Rochereau",
    "Duroc",
    "Franklin D. Roosevelt",
    "Gambetta",
    "Gare d'Austerlitz",
    "Gare de Lyon",
    "Gare de l'Est",
    "Gare du Nord",
    "Garges-Sarcelles",
    "Gennevilliers",
    "Grands Boulevards",
    "Havre-Caumartin",
    "Hôpital Béclère",
    "Hôtel de Ville",
    "Invalides",
    "Issy-Val-de-Seine",
    "Jaurès",
    "Jussieu",
    "Juvisy",
    "La Courneuve 8 Mai 1945",
    "La Défense",
    "La Motte Picquet-Grenelle",
    "Le Bourget",
    "Les Courtilles",
    "Les Saules",
    "Louis Blanc",
    "Madeleine",
    "Mairie de Saint-Ouen",
    "Malesherbes",
    "Marcadet-Poissonniers",
    "Marché de Saint-Denis",
    "Massy-Palaiseau",
    "Massy-Verrières",
    "Michel Ange-Auteuil",
    "Michel Ange-Molitor",
    "Miromesnil",
    "Montparnasse-Bienvenüe",
    "Nation",
    "Noisy-le-Sec",
    "Oberkampf",
    "Odéon",
    "Opéra",
    "Palais Royal - Musée du Louvre",
    "Pasteur",
    "Pereire-Levallois",
    "Pierrefitte Stains",
    "Pigalle",
    "Place d'Italie",
    "Place de Clichy",
    "Place des Fêtes",
    "Pont du Garigliano",
    "Porte Dorée",
    "Porte d'Italie",
    "Porte d'Ivry",
    "Porte d'Orléans",
    "Porte de Bagnolet",
    "Porte de Charenton",
    "Porte de Choisy",
    "Porte de Clichy",
    "Porte de Clignancourt",
    "Porte de Montreuil",
    "Porte de Pantin",
    "Porte de Saint-Ouen",
    "Porte de Vanves",
    "Porte de Versailles",
    "Porte de Vincennes",
    "Porte de la Chapelle",
    "Porte de la Villette",
    "Porte des Lilas",
    "Pyramides",
    "Père Lachaise",
    "Raspail",
    "Reuilly-Diderot",
    "Richelieu-Drouot",
    "Rosa Parks",
    "Réaumur Sébastopol",
    "République",
    "Saint-Cyr",
    "Saint-Denis",
    "Saint-Denis - Porte de Paris",
    "Saint-Fargeau",
    "Saint-Germain-en-Laye",
    "Saint-Lazare",
    "Saint-Michel",
    "Saint-Ouen",
    "Stalingrad",
    "Strasbourg-Saint-Denis",
    "Sèvres-Babylone",
    "Trocadéro",
    "Val de Fontenay",
    "Villiers",
    "Viroflay Rive Gauche",
    "Épinay-sur-Orge",
    "Épinay-sur-Seine"];

let isAscending = false; // Variable to keep track of sorting order

// Toggle theme mode button
function toggleDarkMode() {
    const themeMode = document.documentElement.getAttribute('data-bs-theme');
    const toggleButton = document.querySelector('.mode-toggle');

    if (themeMode == 'light') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        toggleButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
        document.cookie = "darkMode=true; path=/; max-age=31536000"; // Set cookie for dark mode
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        toggleButton.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
        document.cookie = "darkMode=false; path=/; max-age=31536000"; // Set cookie for light mode
    }
    updateButtonStyles();
}

// Check theme mode
function checkDarkModeCookie() {
    let darkModeCookie = document.cookie.split('; ').find(row => row.startsWith('darkMode='));
    let isDarkMode = false; // Default to light mode
    const toggleButton = document.querySelector('.mode-toggle');

    if (darkModeCookie) {
        isDarkMode = darkModeCookie.split('=')[1] === 'true';
    }

    if (isDarkMode) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        toggleButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        toggleButton.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
    }
}

function setCityCookie(city) {
    document.cookie = `selectedCity=${city}; path=/; max-age=31536000`; // Set cookie for one year
}

function getCityFromCookie() {
    const cityCookie = document.cookie.split('; ').find(row => row.startsWith('selectedCity='));
    return cityCookie ? cityCookie.split('=')[1] : null; // return the city or null if not set
}

function updateButtonStyles() {
    const themeMode = document.documentElement.getAttribute('data-bs-theme');
    const sortAndFilterButton = document.getElementById('sortAndFilterButton');

    if (themeMode === 'dark') {
        sortAndFilterButton.classList.remove('text-dark');
        sortAndFilterButton.classList.add('text-light');
    } else {
        sortAndFilterButton.classList.remove('text-light');
        sortAndFilterButton.classList.add('text-dark');
    }
}

// Fetch, filter, and display entries
function fetchEntries(sortBy, isAscending, filterByLine = 'all', filterByState = 'all', selectedCity = document.getElementById('citySelect').value) {
    fetch(`${WEBURL}/api/entries?city=${selectedCity}`)
        .then(response => response.json())
        .then(entries => {
            // Apply filters
            let filteredEntries = entries.filter(entry =>
                (filterByLine === 'all' || entry.line === filterByLine) &&
                (filterByState === 'all' || entry.state === filterByState)
            );

            if (filteredEntries.length === 0) {
                // Display a message or card indicating no entries match the criteria
                displayNoEntriesCard();
            } else {
                // Generate cards with filtered and sorted entries
                generateCards(filteredEntries, sortBy, isAscending);
            }
        })
        .catch(error => console.error('Error fetching entries:', error));
}

function displayNoEntriesCard() {
    const cardContainer = document.getElementById('cardContainer');
    const noEntriesCard = `
        <div class="card mb-3">
            <div class="card-body p-3">
                <div class="mb-0 fs-7">
                    <p class="card-text">Aucun danger signalé</p>
                </div>
            </div>
        </div>
    `;
    cardContainer.innerHTML = noEntriesCard;
}

function populateLinesForm(selectedCity = document.getElementById('citySelect').value) {
    fetch(`${WEBURL}/api/lines?city=${selectedCity}`)
        .then(response => response.json())
        .then(lines => {
            const lineSelect = document.getElementById('line_select');
            lineSelect.innerHTML = '<option selected disabled value="">Ligne...</option>'; // Reset

            lines.forEach(line => {
                const option = document.createElement('option');
                option.value = line.name;
                option.textContent = line.name;
                lineSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching lines:', error));
}

function populateLinesFilter(selectedCity = document.getElementById('citySelect').value) {
    fetch(`${WEBURL}/api/lines?city=${selectedCity}`)
        .then(response => response.json())
        .then(lines => {
            const lineSelect = document.getElementById('filterByLine');
            lineSelect.innerHTML = '<option selected value="all">Toutes</option>'; // Reset

            lines.forEach(line => {
                const option = document.createElement('option');
                option.value = line.name;
                option.textContent = line.name;
                lineSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching lines:', error));
}

function updateStationSelect(stations) {
    const stationSelect = document.getElementById('station_select');
    stationSelect.innerHTML = '<option selected disabled value="">Arrêt...</option>'; // Add a default option

    stations.forEach(station => {
        const option = new Option(station, station);
        stationSelect.add(option);
    });
}

function updateLocationSelect(lineType, selectedStation) {
    const locationSelect = document.getElementById('location_select');
    locationSelect.innerHTML = '<option selected disabled value="">Localisation...</option>'; // Add a default option

    if (lineType === 'subway' || lineType === 'rer') {
        locationSelect.add(new Option('Quai', 'Quai'));
        locationSelect.add(new Option('Sortie', 'Sortie'));
        const isInterchangeStationRennes = document.getElementById('citySelect').value === "Rennes" && interchangeStationsRennes.includes(selectedStation);
        const isInterchangeStationMarseille = document.getElementById('citySelect').value === "Marseille" && interchangeStationsMarseille.includes(selectedStation);
        const isInterchangeStationParis = document.getElementById('citySelect').value === "Paris" && interchangeStationsParis.includes(selectedStation);

        if (isInterchangeStationRennes || isInterchangeStationMarseille || isInterchangeStationParis) {
            locationSelect.add(new Option('Couloir de correspondance', 'Couloir de correspondance'));
        }
    } else if (lineType === 'bus' || lineType === 'tramway') {
        locationSelect.add(new Option('Arrêt', 'Arrêt'));
        locationSelect.add(new Option('Véhicule', 'Véhicule'));
    }
}

function updateDirectionSelect(termini) {
    const directionSelect = document.getElementById('direction_select');
    directionSelect.innerHTML = '<option selected disabled value="">Direction...</option>'; // Add a default option

    // Iterate over each terminus and add it as an option
    termini.forEach(terminus => {
        directionSelect.add(new Option(terminus, terminus));
    });
    directionSelect.add(new Option('Non précisée', 'Non précisée'));
}

function populateLocationSelect(selectElement, lineType, currentLocation, station) {
    selectElement.innerHTML = ''; // Reset
    let locations;
    if (lineType === 'subway' || lineType === 'rer') {
        locations = ['Quai', 'Sortie'];

        const isInterchangeStationRennes = document.getElementById('citySelect').value === "Rennes" && interchangeStationsRennes.includes(station);
        const isInterchangeStationMarseille = document.getElementById('citySelect').value === "Marseille" && interchangeStationsMarseille.includes(station);
        const isInterchangeStationParis = document.getElementById('citySelect').value === "Paris" && interchangeStationsParis.includes(station);
        if (isInterchangeStationRennes || isInterchangeStationMarseille || isInterchangeStationParis) {
            locations.push('Couloir de correspondance');
        }
    } else if (lineType === 'bus' || lineType === 'tramway') {
        locations = ['Arrêt de bus', 'Véhicule'];
    }

    locations.forEach(location => {
        const isSelected = location === currentLocation;
        const option = new Option(location, location, isSelected, isSelected);
        selectElement.appendChild(option);
    });
}

function populateDirectionSelect(selectElement, termini, currentDirection) {
    selectElement.innerHTML = ''; // Reset

    // Add each terminus as an option
    termini.forEach(terminus => {
        const isSelected = terminus === currentDirection;
        const option = new Option(terminus, terminus, isSelected, isSelected);
        selectElement.appendChild(option);
    });

    // Add 'Non précisée' option
    const isNoPrecisionSelected = 'Non précisée' === currentDirection;
    selectElement.add(new Option('Non précisée', 'Non précisée', isNoPrecisionSelected, isNoPrecisionSelected));
}

function populateEditForm(entryData) {
    // Populate and disable Line and Station selects
    const lineSelect = document.getElementById(`line_select${entryData._id}`);
    lineSelect.innerHTML = `<option selected>${entryData.line}</option>`;
    lineSelect.disabled = true;

    const stationSelect = document.getElementById(`station_select${entryData._id}`);
    stationSelect.innerHTML = `<option selected>${entryData.station}</option>`;
    stationSelect.disabled = true;

    const selectedCity = document.getElementById('citySelect').value; // Get the selected city

    // Populate Direction & Location select
    fetch(`${WEBURL}/api/lines/name/${entryData.line}?city=${selectedCity}`)
        .then(response => response.json())
        .then(lineData => {
            const directionSelect = document.getElementById(`direction_select${entryData._id}`);
            populateDirectionSelect(directionSelect, lineData.terminus, entryData.direction);
            const locationSelect = document.getElementById(`location_select${entryData._id}`);
            populateLocationSelect(locationSelect, lineData.type, entryData.location, entryData.station);
        })
        .catch(error => console.error('Error fetching line details:', error));

    // Populate state select
    const stateSelect = document.getElementById(`state_select${entryData._id}`);
    stateSelect.innerHTML = '';
    const states = {
        'Immobile': 'danger',
        'Mobile': 'warning'
    };

    for (const [text, value] of Object.entries(states)) {
        const isSelected = value === entryData.state;
        const option = new Option(text, value, isSelected, isSelected);
        stateSelect.appendChild(option);
    }
}

function pageReset() {
    document.getElementById('line_select').innerHTML = '<option selected disabled value="">Ligne...</option>';
    document.getElementById('station_select').innerHTML = '<option selected disabled value="">Sélectionnez une ligne...</option>';
    document.getElementById('location_select').innerHTML = '<option selected disabled value="">Sélectionnez un arrêt...</option>';
    document.getElementById('direction_select').innerHTML = '<option selected disabled value="">Sélectionnez une ligne...</option>';
    populateLinesForm();
    populateLinesFilter();
}

// Danger form
document.addEventListener('DOMContentLoaded', function () {

    const savedCity = getCityFromCookie();
    if (savedCity) {
        document.getElementById('citySelect').value = savedCity;
        populateLinesForm(savedCity);
        populateLinesFilter(savedCity);
        fetchEntries(document.getElementById('selectedSort').value, isAscending, 'all', 'all', savedCity);
    } else {
        const defaultCity = "Paris"; // Default city
        populateLinesForm(defaultCity);
        populateLinesFilter(defaultCity);
        fetchEntries(document.getElementById('selectedSort').value, isAscending, 'all', 'all', defaultCity);
    }

    pageReset();
    setupPullToRefresh();
    updateButtonStyles();

    document.getElementById('citySelect').addEventListener('change', function () {
        const selectedCity = this.value;
        setCityCookie(selectedCity);
        populateLinesForm(selectedCity);
        populateLinesFilter(selectedCity);
        fetchEntries(document.getElementById('selectedSort').value, isAscending, 'all', 'all', selectedCity);
    });

    document.getElementById('sortDirection').addEventListener('click', function () {
        isAscending = !isAscending; // Toggle the sorting order

        // Update the icon
        const icon = this.querySelector('i');
        if (!isAscending) {
            icon.classList.remove('bi-caret-up-square');
            icon.classList.add('bi-caret-down-square');
        } else {
            icon.classList.remove('bi-caret-down-square');
            icon.classList.add('bi-caret-up-square');
        }

        fetchEntries(document.getElementById('selectedSort').value, isAscending, document.getElementById('filterByLine').value, document.getElementById('filterByState').value);
    });

    document.getElementById('selectedSort').addEventListener('change', function () {
        var selectedSortCriteria = this.value;
        // Assume fetchEntries() fetches your entries and then calls generateCards
        fetchEntries(selectedSortCriteria, isAscending, document.getElementById('filterByLine').value, document.getElementById('filterByState').value);
    });

    document.getElementById('filterByLine').addEventListener('change', function () {
        const selectedLine = this.value;
        const selectedState = document.getElementById('filterByState').value; // Assuming there's a filterByState dropdown
        fetchEntries(document.getElementById('selectedSort').value, isAscending, selectedLine, selectedState);
    });

    document.getElementById('filterByState').addEventListener('change', function () {
        const selectedState = this.value;
        const selectedLine = document.getElementById('filterByLine').value;
        fetchEntries(document.getElementById('selectedSort').value, isAscending, selectedLine, selectedState);
    });

    document.getElementById('line_select').addEventListener('change', function () {
        const selectedLineName = this.value;
        const selectedCity = document.getElementById('citySelect').value; // Get the selected city
    
        fetch(`${WEBURL}/api/lines/name/${selectedLineName}?city=${selectedCity}`) // Include city in the API request
            .then(response => response.json())
            .then(lineData => {
                updateStationSelect(lineData.stations);
                updateDirectionSelect(lineData.terminus);
    
                // Set up event listener for station_select
                const stationSelect = document.getElementById('station_select');
                stationSelect.addEventListener('change', function () {
                    const selectedStation = this.value;
                    updateLocationSelect(lineData.type, selectedStation);
                });
            })
            .catch(error => console.error('Error:', error));
    });    

    var form = document.getElementById('signalADangerForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission in all cases

            const currentDate = new Date();
            const isoDateString = currentDate.toISOString();

            // Collect form data
            const formData = {
                city: document.getElementById('citySelect').value,
                line: document.getElementById('line_select').value,
                station: document.getElementById('station_select').value,
                location: document.getElementById('location_select').value,
                direction: document.getElementById('direction_select').value,
                state: document.getElementById('state_select').value,
                last_edit: isoDateString,
            };
            // Validate form data
            if (!validateFormData(formData)) {
                // Show validation feedback
                form.classList.add('was-validated');
            } else {
                // If form data is valid, continue with form processing

                fetch(`${WEBURL}/submit-form`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(response => response.json())
                    .then(data => {
                        validateSubmissionToast();
                        fetchEntries(document.getElementById('selectedSort').value, isAscending, document.getElementById('filterByLine').value, document.getElementById('filterByState').value);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                // Remove validation feedback
                form.classList.remove('was-validated');
                form.reset();
                pageReset();
            }
        });
    }
});

// Loop through entries and generate danger cards
function generateCards(entries, sortBy, isAscending) {
    var cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Clear existing content

    // Sort entries based on sortBy and isAscending parameters
    if (sortBy === 'line' || sortBy === 'station') {
        // Invert the sort order for 'line' and 'station'
        entries.sort((a, b) => isAscending ? b[sortBy].localeCompare(a[sortBy]) : a[sortBy].localeCompare(b[sortBy]));
    } else {
        // true (ascending) results in newer to older, false (descending) results in older to newer
        entries.sort((a, b) => isAscending ? new Date(a.last_edit) - new Date(b.last_edit) : new Date(b.last_edit) - new Date(a.last_edit));
    }

    entries.forEach(function (entry, index) {
        // Create card element
        var card = document.createElement('div');
        card.className = 'card mb-3';
        card.id = 'entryCardIndex' + index;
        card.innerHTML = `
            <div class="card-header px-3 py-2" id="heading${index}">
                <div class="row align-items-center">
                    <div class="col-auto d-flex align-items-center">
                        <span class="badge text-bg-${entry.state} stateBadge" data-bs-toggle="tooltip" data-bs-title="${entry.state === 'danger' ? 'Immobile' : 'Mobile'}">
                            ${entry.state === 'warning' ? '<i class="bi bi-person-walking"></i>' : '<i class="bi bi-person-arms-up"></i>'}
                        </span>
                    </div>
                    <div class="col text-truncate px-0">
                        <h6 class="mb-0 text-truncate" data-bs-toggle="tooltip" data-bs-title="${entry.station}">${entry.station}</h6>
                    </div>
                    <div class="col-auto d-flex justify-content-end">
                        <div class="dropdown">
                            <button class="btn btn-danger btn-sm dropdown-toggle" type="button" id="dropdownMenuButton${index}" data-bs-toggle="dropdown" aria-expanded="false">
                                Gérer
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right" style="min-width: auto;" aria-labelledby="dropdownMenuButton${index}">
                                <li>
                                    <a class="dropdown-item fs-7" href="#" data-bs-toggle="modal" data-bs-target="#confirmModal${index}">
                                        <i class="bi bi-check-circle pe-2 text-success" width="13px" height="13px"></i>
                                        Confirmer
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item fs-7" href="#" data-bs-toggle="modal" data-bs-target="#editModal${index}">
                                        <i class="bi bi-pencil-square pe-2 text-primary" width="13px" height="13px"></i>
                                        Modifier
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item fs-7" href="#" data-bs-toggle="modal" data-bs-target="#deleteModal${index}">
                                        <i class="bi bi-trash3 pe-2 text-danger" width="13px" height="13px"></i>
                                        Supprimer
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body p-3">
                <div class="mb-0 fs-7">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img src="./assets/icons/lines/${document.getElementById('citySelect').value}/${entry.line}.png" alt="icon line a" width="13px" height="13px" class="d-block mx-auto" data-bs-toggle="tooltip" data-bs-title="Ligne">
                        </div>
                        <div class="col px-0">
                            Ligne ${entry.line}
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <i class="bi bi-geo-alt-fill d-block mx-auto" style="font-size: 13px;" data-bs-toggle="tooltip" data-bs-title="Localisation"></i>
                        </div>
                        <div class="col px-0">
                            ${entry.location}
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <i class="bi bi-signpost-fill d-block mx-auto" style="font-size: 13px;" data-bs-toggle="tooltip" data-bs-title="Direction"></i>
                        </div>
                        <div class="col px-0">
                            ${entry.direction}
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col">
                            <div class="row align-items-center">
                                <div class="col-auto">
                                    <i class="bi bi-clock-fill d-block mx-auto" style="font-size: 13px;" data-bs-toggle="tooltip" data-bs-title="Dernier signalement"></i>
                                </div>
                                <div class="col px-0" id="lastEditDisplay${index}">
                                    Il y a ${timeSince(entry.last_edit)}
                                </div>
                            </div>
                        </div>
                        <div class="col-auto text-end">
                            <div class="badge numberBadge" data-bs-toggle="tooltip" data-bs-title="Nombre de contributions">${entry.edits}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        // Append the card to the container
        cardContainer.appendChild(card);

        // Modals for Confirmer, Modifier and Supprimer
        var confirmModal = document.createElement('div');
        confirmModal.innerHTML = `
            <!-- Confirm Modal -->
            <div class="modal fade" id="confirmModal${index}" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel${index}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-6" id="confirmModalLabel${index}H1">Confirmer</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                        </div>
                        <div class="modal-body fs-7">
                            Souhaitez-vous confirmer la présence du danger&nbsp;?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal" aria-label="cancel">Annuler</button>
                            <button type="submit" class="btn btn-sm btn-success" data-bs-dismiss="modal" onclick="updateLastEdit('${entry._id}')">Confirmer</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        cardContainer.appendChild(confirmModal);

        var editModal = document.createElement('div');
        editModal.innerHTML = `
            <!-- Edit Modal -->
            <div class="modal fade" id="editModal${index}" tabindex="-1" role="dialog" aria-labelledby="editModalLabel${index}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-6" id="editModalLabel${index}H1">Modifier</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                        </div>
                        <div class="modal-body">
                                <div class="card-body">
                                    <form id="editForm" class="needs-validation" novalidate>
                                        <div class="input-group input-group-sm mb-2">
                                            <label class="input-group-text" for="line_select${entry._id}">Ligne</label>
                                            <select class="form-select col" id="line_select${entry._id}" aria-label="line" disabled>
                                                <option selected>${entry.line}</option>
                                            </select>
                                        </div>
                                        <div class="input-group input-group-sm mb-2">
                                            <label class="input-group-text" for="station_select${entry._id}">Arrêt</label>
                                            <select class=" form-select" id="station_select${entry._id}" aria-label="station" disabled>
                                                <option selected>${entry.station}</option>
                                            </select>
                                        </div>
                                        <div class="input-group input-group-sm mb-2">
                                            <label class="input-group-text" for="location_select${entry._id}">Localisation</label
                                                aria-label="location">
                                            <select class="form-select" id="location_select${entry._id}">
                                                <option selected>${entry.location}</option>
                                            </select>
                                        </div>
                                        <div class="input-group input-group-sm mb-2">
                                            <label class="input-group-text" for="direction_select${entry._id}">Direction</label>
                                            <select class="form-select" id="direction_select${entry._id}" aria-label="direction">
                                                <option selected>${entry.direction}</option>
                                            </select>
                                        </div>
                                        <div class="input-group input-group-sm mb-0">
                                            <label class="input-group-text" for="state_select${entry._id}">État</label>
                                            <select class="form-select" id="state_select${entry._id}" aria-label="state">
                                                <option selected>${entry.state}</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal" aria-label="cancel">Annuler</button>
                            <button type="submit" class="btn btn-sm btn-primary" data-bs-dismiss="modal" onclick="editEntry('${entry._id}')">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        cardContainer.appendChild(editModal);
        // Find the "Modifier" link and add an event listener
        const editButton = document.querySelector(`[data-bs-target="#editModal${index}"]`);
        if (editButton) {
            editButton.addEventListener('click', function () {
                populateEditForm(entry);
            });
        }

        var deleteModal = document.createElement('div');
        deleteModal.innerHTML = `
            <!-- Delete Modal -->
            <div class="modal fade" id="deleteModal${index}" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel${index}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-6" id="deleteModalLabel${index}H1">Supprimer</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                        </div>
                        <div class="modal-body fs-7">
                            Souhaitez-vous confirmer l'absence du danger&nbsp;?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal" aria-label="cancel">Annuler</button>
                            <button type="submit" class="btn btn-sm btn-danger" data-bs-dismiss="modal" onclick="deleteEntry('${entry._id}')">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(deleteModal);
        initializeTooltips();
    });
}

// Form validation
function validateFormData(formData) {
    for (let key in formData) {
        if (formData[key] === '') {
            return false;
        }
    }
    return true;
}

function validateAndEditEntry(entryId) {
    // Perform Bootstrap form validation for the entire form
    const form = document.getElementById('editForm');

    if (form.checkValidity() === false) {
        // If the form is invalid, apply Bootstrap's validation styles
        form.classList.add('was-validated');
    } else {
        // If the form is valid, call the editEntry() function
        editEntry(entryId);

        // You can also remove Bootstrap's validation styles if needed
        form.classList.remove('was-validated');
    }
}

// Confirm entry
function updateLastEdit(entryId) {
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString();

    const updatedData = {
        last_edit: isoDateString,
    };

    fetch(`${WEBURL}/api/entries/${entryId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedEntry => {
            validateSubmissionToast();
            fetchEntries(document.getElementById('selectedSort').value, isAscending, document.getElementById('filterByLine').value, document.getElementById('filterByState').value);
        })
        .catch(error => console.error('Error:', error));
}

// Edit entry
function editEntry(entryId) {
    const line = document.getElementById(`line_select${entryId}`).value;
    const station = document.getElementById(`station_select${entryId}`).value;
    const location = document.getElementById(`location_select${entryId}`).value;
    const direction = document.getElementById(`direction_select${entryId}`).value;
    const state = document.getElementById(`state_select${entryId}`).value;

    const updatedData = {
        line: line,
        station: station,
        location: location,
        direction: direction,
        state: state,
        last_edit: new Date().toISOString(),
    };

    fetch(`${WEBURL}/api/entries/${entryId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedEntry => {
            validateSubmissionToast();
            fetchEntries(document.getElementById('selectedSort').value, isAscending, document.getElementById('filterByLine').value, document.getElementById('filterByState').value);
        })
        .catch(error => console.error('Error:', error));
}

// Delete entry
function deleteEntry(entryId) {
    fetch(`${WEBURL}/api/entries/${entryId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Deleted entry:', data);
            validateSubmissionToast(); // Show a confirmation toast
            fetchEntries(document.getElementById('selectedSort').value, isAscending, document.getElementById('filterByLine').value, document.getElementById('filterByState').value);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Time since last edit
function timeSince(isoDateString) {
    const pastDate = new Date(isoDateString);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const difference = currentDate - pastDate;

    // Convert the difference to seconds, minutes and hours
    const minutesPassed = Math.floor(difference / 60000);
    const hoursPassed = Math.floor(minutesPassed / 60);

    if (hoursPassed === 0) {
        // If less than an hour has passed, return only minutes
        if (minutesPassed === 0) {
            return `moins d'une minute`;
        } else {
            return `${minutesPassed} ${minutesPassed === 1 ? 'minute' : 'minutes'}`;
        }
    } else {
        // If one or more hours have passed, return hours and minutes
        const remainingMinutes = minutesPassed % 60;
        if (remainingMinutes === 0) {
            return `${hoursPassed} ${hoursPassed === 1 ? 'heure' : 'heures'}`;
        } else {
            return `${hoursPassed} ${hoursPassed === 1 ? 'heure' : 'heures'} et ${remainingMinutes} ${remainingMinutes === 1 ? 'minute' : 'minutes'}`;
        }
    }
}

// Validation toast
function validateSubmissionToast() {
    var toastEl = document.getElementById('submissionToast');
    console.log(toastEl);
    var toast = new bootstrap.Toast(toastEl);
    var toastProgressBar = toastEl.querySelector('.toastProgress');
    console.log(toastProgressBar);

    toastProgressBar.style.width = '0%';
    toastProgressBar.setAttribute('aria-valuenow', 0);
    toast.hide();
    toast.show();

    let progress = 0;
    const interval = 20; // Milliseconds interval for updating the progress
    const updateRate = interval / 2000 * 100; // How much to increase the progress on each update

    const progressInterval = setInterval(() => {
        progress += updateRate;
        toastProgressBar.style.width = progress + '%';
        toastProgressBar.setAttribute('aria-valuenow', progress);

        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                toast.hide();
            }, 500); // Additional delay to allow viewing of full progress bar
        }
    }, interval);
}

function setupPullToRefresh() {
    let startY, isEligibleForPullToRefresh = false;
    const progressBar = document.getElementById('pullToRefreshProgress');
    const threshold = 250;

    window.addEventListener('touchstart', (e) => {
        if (window.scrollY <= 0) {
            startY = e.touches[0].clientY;
            progressBar.style.width = '0';
            progressBar.style.display = 'block';
            isEligibleForPullToRefresh = true;
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (!isEligibleForPullToRefresh) return;

        let moveY = e.touches[0].clientY;
        let pullDistance = moveY - startY;

        if (pullDistance > 0) {
            let progress = Math.min(pullDistance / threshold, 1);
            progressBar.style.width = `${progress * 100}%`;
        }
    });

    window.addEventListener('touchend', (e) => {
        if (!isEligibleForPullToRefresh) return;

        let endY = e.changedTouches[0].clientY;
        if (endY - startY > threshold) {
            progressBar.style.width = '0%'; // Reset the width

            // Delay the refresh action
            setTimeout(() => {
                location.reload(); // Replace with your refresh logic.
            }, 500); // Delay of 500 milliseconds to allow the transition to complete
        } else {
            progressBar.style.width = '0%'; // Reset the width even if not refreshing
        }

        isEligibleForPullToRefresh = false;
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

// Call this function when the page loads
window.onload = function () {
    checkDarkModeCookie();
    updateButtonStyles();
};

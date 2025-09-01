import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Data for the attractions, with avgHours pre-calculated for time tracking
const sites = [
    { id: 1, site: 'National Museum of Natural History', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '2.5–4 h', avgHours: 3.25, about: 'Dinosaurs, fossils, gems, ocean & nature exhibits.' },
    { id: 2, site: 'National Museum of American History', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '2–3.5 h', avgHours: 2.75, about: 'U.S. cultural artifacts (Star-Spangled Banner, presidents, transport).' },
    { id: 3, site: 'National Air & Space Museum (Mall)', admission: 'Free', reservation: 'Yes – timed entry (10 a.m.–4 p.m.)', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '2.5–4 h', avgHours: 3.25, about: 'Aviation & spaceflight icons (Wright Flyer, Apollo 11).' },
    { id: 4, site: 'National Museum of African American History & Culture (NMAAHC)', admission: 'Free', reservation: 'Yes – timed entry', hours: 'Tue–Sun: 10 a.m.–5:30 p.m.; Mon: 12–5:30 p.m.', avgVisitTime: '3–4.5 h', avgHours: 3.75, about: 'African American history & culture; powerful journey.' },
    { id: 5, site: 'National Museum of African Art', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '1–1.5 h', avgHours: 1.25, about: 'Traditional & modern African art.' },
    { id: 6, site: 'National Museum of the American Indian', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '1.5–2.5 h', avgHours: 2.0, about: 'Native American history & culture; award-winning café.' },
    { id: 7, site: 'Smithsonian Castle', admission: 'Free', reservation: 'No', hours: '8:30 a.m.–5:30 p.m.', avgVisitTime: '0.5–1 h', avgHours: 0.75, about: 'Visitor info center; intro exhibits.' },
    { id: 8, site: 'Smithsonian American Art Museum (SAAM)', admission: 'Free', reservation: 'No', hours: '11:30 a.m.–7:00 p.m.', avgVisitTime: '1.5–2.5 h', avgHours: 2.0, about: 'Largest collection of American art.' },
    { id: 9, site: 'National Portrait Gallery', admission: 'Free', reservation: 'No', hours: '11:30 a.m.–7:00 p.m.', avgVisitTime: '1.5–2.5 h', avgHours: 2.0, about: 'Portraits of U.S. presidents & notable Americans.' },
    { id: 10, site: 'Renwick Gallery (SAAM branch)', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '1–1.5 h', avgHours: 1.25, about: 'American crafts & decorative arts.' },
    { id: 11, site: 'National Postal Museum', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '1–1.5 h', avgHours: 1.25, about: 'History of U.S. mail & stamps.' },
    { id: 12, site: 'Hirshhorn Museum & Sculpture Garden', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '1.5–2 h', avgHours: 1.75, about: 'Modern art & outdoor sculpture garden.' },
    { id: 13, site: 'Freer Gallery of Art', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '1–1.5 h', avgHours: 1.25, about: 'Asian art, including Whistler’s Peacock Room.' },
    { id: 14, site: 'Arthur M. Sackler Gallery', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '1–1.5 h', avgHours: 1.25, about: 'Asian art, rotating exhibits.' },
    { id: 15, site: 'Anacostia Community Museum', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '1–1.5 h', avgHours: 1.25, about: 'African American & local community life.' },
    { id: 16, site: 'National Zoo (Smithsonian)', admission: 'Free', reservation: 'Yes – timed entry', hours: '9:00 a.m.–6:00 p.m.', avgVisitTime: '2.5–4 h', avgHours: 3.25, about: 'Lions, elephants, pandas, conservation focus.' },
    { id: 17, site: 'Udvar-Hazy Center (Air & Space Annex, VA)', admission: 'Free', reservation: 'No', hours: '10:00 a.m.–5:30 p.m.', avgVisitTime: '3–4 h', avgHours: 3.5, about: 'Aircraft icons (Space Shuttle Discovery, Concorde).' },
    { id: 18, site: 'Holocaust Memorial Museum (USHMM)', admission: 'Free (+$1 online)', reservation: 'Yes – timed entry (Permanent Exhibit)', hours: '10:00 a.m.–5:30 p.m. (last entry 4:30 p.m.)', avgVisitTime: '1.5–2 h', avgHours: 1.75, about: 'Holocaust history & remembrance.' },
    { id: 19, site: 'Arlington National Cemetery Tram Tour', admission: '$19.50 pp', reservation: 'Yes – advance or same-day', hours: '8:30 a.m.–4:00 p.m. (trams every 20 min)', avgVisitTime: '45 min–1 h', avgHours: 0.875, about: 'Narrated tour; JFK gravesite, Tomb of the Unknown Soldier.' },
    { id: 20, site: 'Ford’s Theatre Historic Site', admission: '$3.50 fee', reservation: 'Yes – required', hours: '9:00 a.m.–4:00 p.m. (entries every 30 min)', avgVisitTime: '1–2 h', avgHours: 1.5, about: 'Lincoln assassination site; museum, Petersen House.' },
    { id: 21, site: 'Ford’s Theatre Special Tours', admission: 'Paid (varies)', reservation: 'Yes', hours: 'Varies', avgVisitTime: '~1–2 h', avgHours: 1.5, about: 'Evening/reenactment tours (Detective McDevitt, Ford’s@5).' },
    { id: 22, site: 'Washington Monument (to top)', admission: 'Free (+$1 online)', reservation: 'Yes – timed entry', hours: '9:00 a.m.–5:00 p.m. (last ticket 4 p.m.)', avgVisitTime: '30–45 min', avgHours: 0.625, about: 'Elevator to 500-ft observation deck.' },
    { id: 23, site: 'World War II Memorial', admission: 'Free', reservation: 'No', hours: '24/7', avgVisitTime: '20–30 min', avgHours: 0.417, about: 'Honors 16M Americans in WWII.' },
    { id: 24, site: 'Reflecting Pool', admission: 'Free', reservation: 'No', hours: '24/7', avgVisitTime: '15–20 min', avgHours: 0.292, about: 'Iconic walkway between WWII & Lincoln.' },
    { id: 25, site: 'Lincoln Memorial', admission: 'Free', reservation: 'No', hours: '24/7', avgVisitTime: '30–45 min', avgHours: 0.625, about: 'Statue & inscriptions; MLK’s “I Have a Dream” speech site.' },
    { id: 26, site: 'Vietnam Veterans Memorial', admission: 'Free', reservation: 'No', hours: '24/7', avgVisitTime: '20–30 min', avgHours: 0.417, about: 'Black granite wall engraved with 58,000 names.' },
    { id: 27, site: 'Korean War Veterans Memorial', admission: 'Free', reservation: 'No', hours: '24/7', avgVisitTime: '20–30 min', avgHours: 0.417, about: '19 soldier statues + Wall of Remembrance.' },
    { id: 28, site: 'Martin Luther King Jr. Memorial', admission: 'Free', reservation: 'No', hours: '24/7', avgVisitTime: '20–30 min', avgHours: 0.417, about: 'Stone of Hope statue & inspirational quotes.' },
    { id: 29, site: 'Jefferson Memorial', admission: 'Free', reservation: 'No', hours: '24/7', avgVisitTime: '30–45 min', avgHours: 0.625, about: 'Rotunda & statue of Thomas Jefferson on Tidal Basin.' },
];

let plannerName = '';
const selectedSites = new Set<number>();
const dinnerOptions = ['Italian', 'Mexican', 'Chinese', 'Pizza', 'American', 'Thai', 'Indian', 'None'];
const selectedDinners: { [key: string]: string } = {
    'Sept 13': 'None',
    'Sept 14': 'None',
    'Sept 15': 'None',
};
// Day 1: 1hr. Day 2: 8.5hr. Day 3: 8.5hr. Day 4: ~1hr. Total = 19hrs.
// Subtracting two 20-min breaks for each of the 2 full days (80 mins total).
const TOTAL_AVAILABLE_HOURS = 19 - (80 / 60); // Approx 17.7 hours

function renderApp() {
    const root = document.getElementById('root');
    if (!root) return;

    root.innerHTML = `
        <header>
            <h1>Washington D.C. Trip Planner</h1>
            <p>Select attractions for your trip, then generate a PDF plan.</p>
            <div class="name-input-container">
                <label for="planner-name">Persons Name:</label>
                <input type="text" id="planner-name" value="${plannerName}" placeholder="e.g., The Smith Family" required>
            </div>
        </header>
        <main>
            <div class="trip-info card">
                <h2>Trip Schedule Overview</h2>
                <p><strong>Dates:</strong> Sept 13–16, 2025</p>
                <ul>
                    <li><strong>Sept 13 (Arrival):</strong> Day begins at 5:00 PM.</li>
                    <li><strong>Sept 14 & 15 (Full Days):</strong> Day begins at 8:30 AM.</li>
                    <li><strong>Sept 16 (Departure):</strong> Leave for BWI airport at 9:25 AM for a 12:55 PM flight.</li>
                </ul>
                <p>Each day ends at 8:00 PM, with dinner from 6:00 PM to 8:00 PM. A 1-hour travel buffer is included per day. Two 20-minute snack/drink breaks are factored into each full day's schedule.</p>
            </div>

            <div class="time-tracker card">
                <h3>Time Planner</h3>
                <p>Total available time for activities: <strong>${TOTAL_AVAILABLE_HOURS.toFixed(1)} hours</strong></p>
                <p>Time for selected activities: <strong id="selected-hours">0.0 hours</strong></p>
                <div id="time-warning" class="warning" style="display: none;">
                    Warning: You have selected more activities than there is time available.
                </div>
            </div>

            <div class="dinner-planner card">
                <h2>Dinner Selections</h2>
                <div class="dinner-options-grid">
                    ${Object.keys(selectedDinners).map(date => `
                        <fieldset>
                            <legend>${date}</legend>
                            ${dinnerOptions.map(option => `
                                <div>
                                    <input type="radio" id="${date}-${option}" name="dinner-${date}" value="${option}" ${selectedDinners[date] === option ? 'checked' : ''}>
                                    <label for="${date}-${option}">${option}</label>
                                </div>
                            `).join('')}
                        </fieldset>
                    `).join('')}
                </div>
            </div>
        
            <div class="controls">
                <div class="select-all-container">
                    <input type="checkbox" id="select-all" aria-label="Select all sites">
                    <label for="select-all">Select All Attractions</label>
                </div>
                <button id="generate-pdf-btn" disabled>Generate PDF of Selections</button>
            </div>
            
            <div class="table-container" role="region" aria-labelledby="table-heading">
                <h2 id="table-heading" class="visually-hidden">Attractions Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" aria-label="Select"></th>
                            <th scope="col">Site</th>
                            <th scope="col">Admission</th>
                            <th scope="col">Reservation Needed?</th>
                            <th scope="col">Hours</th>
                            <th scope="col">Avg. Visit Time</th>
                            <th scope="col">About</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sites.map(site => `
                            <tr data-site-id="${site.id}">
                                <td><input type="checkbox" class="site-checkbox" data-id="${site.id}" aria-label="Select ${site.site}"></td>
                                <td class="site-name">${site.site}</td>
                                <td>${site.admission}</td>
                                <td>${site.reservation}</td>
                                <td>${site.hours}</td>
                                <td>${site.avgVisitTime}</td>
                                <td>${site.about}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="cards-container">
                ${sites.map(site => `
                    <div class="card attraction-card" data-site-id="${site.id}">
                        <div class="card-header">
                            <h2>${site.site}</h2>
                            <input type="checkbox" class="site-checkbox" data-id="${site.id}" aria-label="Select ${site.site}">
                        </div>
                        <div class="card-body">
                           <p><strong>Admission:</strong> ${site.admission}</p>
                           <p><strong>Reservation:</strong> ${site.reservation}</p>
                           <p><strong>Hours:</strong> ${site.hours}</p>
                           <p><strong>Visit Time:</strong> ${site.avgVisitTime}</p>
                           <p><strong>About:</strong> ${site.about}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </main>
    `;

    addEventListeners();
    updateUI();
}

function updateUI() {
    const generatePdfBtn = document.getElementById('generate-pdf-btn') as HTMLButtonElement;
    const selectAllCheckbox = document.getElementById('select-all') as HTMLInputElement;
    const allSiteCheckboxes = document.querySelectorAll<HTMLInputElement>('.site-checkbox');
    const selectedHoursEl = document.getElementById('selected-hours') as HTMLElement;
    const timeWarningEl = document.getElementById('time-warning') as HTMLElement;
    
    // Update site selections
    allSiteCheckboxes.forEach(checkbox => {
        const id = parseInt(checkbox.dataset.id || '0');
        checkbox.checked = selectedSites.has(id);
    });

    const selectedCount = selectedSites.size;
    const isNameEmpty = !plannerName.trim();

    // Update button state
    generatePdfBtn.disabled = selectedCount === 0 || isNameEmpty;
    generatePdfBtn.textContent = selectedCount > 0 ? `Generate PDF (${selectedCount} selected)` : 'Generate PDF of Selections';

    // Update select-all checkbox state
    if (selectedCount === sites.length) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
    } else if (selectedCount > 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
    } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    }

    // Update time tracker
    const totalSelectedHours = sites
        .filter(site => selectedSites.has(site.id))
        .reduce((total, site) => total + site.avgHours, 0);
    
    selectedHoursEl.textContent = `${totalSelectedHours.toFixed(1)} hours`;
    
    if (totalSelectedHours > TOTAL_AVAILABLE_HOURS) {
        timeWarningEl.style.display = 'block';
        selectedHoursEl.style.color = '#dc3545';
    } else {
        timeWarningEl.style.display = 'none';
        selectedHoursEl.style.color = '#212529';
    }
}

function addEventListeners() {
    const plannerNameInput = document.getElementById('planner-name') as HTMLInputElement;
    const selectAllCheckbox = document.getElementById('select-all') as HTMLInputElement;
    const generatePdfBtn = document.getElementById('generate-pdf-btn') as HTMLButtonElement;
    const allSiteCheckboxes = document.querySelectorAll<HTMLInputElement>('.site-checkbox');
    const dinnerRadios = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name^="dinner-"]');

    plannerNameInput.addEventListener('input', () => {
        plannerName = plannerNameInput.value;
        updateUI();
    });

    selectAllCheckbox.addEventListener('change', () => {
        if (selectAllCheckbox.checked) {
            sites.forEach(site => selectedSites.add(site.id));
        } else {
            selectedSites.clear();
        }
        updateUI();
    });

    allSiteCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const id = parseInt(checkbox.dataset.id || '0');
            if (checkbox.checked) {
                selectedSites.add(id);
            } else {
                selectedSites.delete(id);
            }
            updateUI();
        });
    });

    dinnerRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const date = radio.name.replace('dinner-', '');
            if (radio.checked) {
                selectedDinners[date] = radio.value;
            }
        });
    });

    generatePdfBtn.addEventListener('click', generatePDF);
}

function generatePDF() {
    const doc = new jsPDF({ orientation: 'landscape' });
    
    const selectedData = sites.filter(site => selectedSites.has(site.id));
    const totalSelectedHours = selectedData.reduce((total, site) => total + site.avgHours, 0);

    const attractionTableData = selectedData.map(site => [
        site.site,
        site.admission,
        site.reservation,
        site.hours,
        site.avgVisitTime,
        site.about
    ]);

    doc.setFontSize(18);
    doc.text(`${plannerName} - Washington D.C. Trip Plan`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text('Selected Itinerary for Sept 13–16, 2025', 14, 30);
    
    if (totalSelectedHours > TOTAL_AVAILABLE_HOURS) {
        doc.setTextColor(220, 53, 69); // Red color for warning
        doc.text(`Warning: Planned activities (${totalSelectedHours.toFixed(1)} hours) exceed available time (${TOTAL_AVAILABLE_HOURS.toFixed(1)} hours).`, 14, 38);
        doc.setTextColor(100);
    }

    autoTable(doc, {
        startY: 45,
        head: [['Site', 'Admission', 'Reservation?', 'Hours', 'Avg. Visit Time', 'About']],
        body: attractionTableData,
        theme: 'striped',
        headStyles: { fillColor: [33, 37, 41] },
        styles: {
            cellPadding: 3,
            fontSize: 8,
            overflow: 'linebreak',
        },
        columnStyles: {
            0: { cellWidth: 45 },
            1: { cellWidth: 25 },
            2: { cellWidth: 40 },
            3: { cellWidth: 50 },
            4: { cellWidth: 25 },
            5: { cellWidth: 'auto' },
        }
    });

    let finalY = (doc as any).lastAutoTable.finalY || 100;

    const dinnerData = Object.entries(selectedDinners)
        .filter(([_, cuisine]) => cuisine !== 'None')
        .map(([date, cuisine]) => [`${date}, 2025`, cuisine]);

    if (dinnerData.length > 0) {
        doc.setFontSize(14);
        doc.text('Dinner Plan', 14, finalY + 12);
        autoTable(doc, {
            startY: finalY + 15,
            head: [['Date', 'Cuisine']],
            body: dinnerData,
            theme: 'grid',
            headStyles: { fillColor: [33, 37, 41] },
        });
    }

    doc.save('DC-Trip-Plan.pdf');
}

document.addEventListener('DOMContentLoaded', renderApp);
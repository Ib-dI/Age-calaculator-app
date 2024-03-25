// console.log('connected')
let date = new Date()
let dateActuelle = new Date()

let day = document.querySelector('#day'),
    month = document.querySelector('#month'),
    year = document.querySelector('#year')

const   spnYear = document.querySelector('.year'),
    spnMonth = document.querySelector('.month'),
    spnDay = document.querySelector('.day'),
    btnCalcul = document.querySelector('.btn'),
    title = document.querySelector('.title')

const dayError = document.getElementById('errorDay'),
    monthError = document.getElementById('errorMonth'),
    yearError = document.getElementById('errorYear'),
    dayLabel = document.getElementById('dayLabel'),
    monthLabel = document.getElementById('monthLabel'),
    yearLabel = document.getElementById('yearLabel')

btnCalcul.addEventListener('click', checkDate)
document.addEventListener('keydown', (e) =>{
    if (e.key === 'Enter') {
        btnCalcul.click()
    }
})

function ageCalculator(year, month, day) {
    const dateActuelle = new Date();
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    let difYear = dateActuelle.getFullYear() - birthDate.getFullYear();

    if (dateActuelle.getMonth() < birthDate.getMonth() || (dateActuelle.getMonth() === birthDate.getMonth() && dateActuelle.getDate() < birthDate.getDate())) {
        difYear--;
    }

    let difMonth = dateActuelle.getMonth() - birthDate.getMonth();

    if (difMonth < 0 || (difMonth === 0 && dateActuelle.getDate() < birthDate.getDate())) {
        difMonth += 12;
    }
    let difDay = dateActuelle.getDate() - birthDate.getDate();

    if (difDay < 0 || (difDay === 0 && dateActuelle.getDate() < birthDate.getDate())) {
        difDay += new Date(dateActuelle.getFullYear(), dateActuelle.getMonth(), 0).getDate();
    }

    // console.log(difYear, difMonth, difDay);
    spnYear.innerHTML = `${difYear} `;
    spnMonth.innerHTML = `${difMonth} `;
    spnDay.innerHTML = `${difDay} `;
}

function checkDate() {
    // Réinitialiser les messages d'erreur
    yearError.innerText = ""
    dayError.innerText = ""
    monthError.innerText = ""

    // Réinitialiser les styles d'erreur
    yearLabel.classList.remove('error-label')
    monthLabel.classList.remove('error-label')
    dayLabel.classList.remove('error-label')
    year.classList.remove('error-input')
    month.classList.remove('error-input')
    day.classList.remove('error-input')

    // Récupérer les valeurs des inputs
    let inputYear = year.value.trim()
    let inputMonth = month.value.trim()
    let inputDay = day.value.trim()

    // Vérifier si les inputs sont vides
    if (inputDay === '' || inputMonth === '' || inputYear === '') {
        if (inputDay === '') {
            dayError.innerText = "This field is required"
            dayLabel.classList.add('error-label');
            day.classList.add('error-input');
        }
        if (inputMonth === '') {
            monthError.innerText = "This field is required"
            monthLabel.classList.add('error-label');
            month.classList.add('error-input');
        }
        if (inputYear === '') {
            yearError.innerText = "This field is required"
            yearLabel.classList.add('error-label');
            year.classList.add('error-input');
        }
        return
    }

    // Vérifier le champ jour
    if (isNaN(inputDay) || parseInt(inputDay) < 1 || parseInt(inputDay) > 31) {
        dayError.innerText = "Must be a valid day";
        dayLabel.classList.add('error-label');
        day.classList.add('error-input');
        return;
    } else {
        // Supprimer les styles d'erreur
        dayError.innerText = "";
        dayLabel.classList.remove('error-label');
        day.classList.remove('error-input');
    }

    // Vérifier le champ mois
    if (isNaN(inputMonth) || parseInt(inputMonth) < 1 || parseInt(inputMonth) > 12) {
        monthError.innerText = "Must be a valid month";
        monthLabel.classList.add('error-label');
        month.classList.add('error-input');
        return;
    } else {
        // Supprimer les styles d'erreur
        monthError.innerText = "";
        monthLabel.classList.remove('error-label');
        month.classList.remove('error-input');
    }

    // Vérifier le champ année
    if (isNaN(inputYear)) {
        yearError.innerText = "Must be a valid year";
        yearLabel.classList.add('error-label');
        year.classList.add('error-input');
        return;
    } else {
        // Supprimer les styles d'erreur
        yearError.innerText = "";
        yearLabel.classList.remove('error-label');
        year.classList.remove('error-input');
    }

    // Vérifier si la date est valide
    const dateIsValid = isValidDate(parseInt(inputYear), parseInt(inputMonth), parseInt(inputDay));
    if (!dateIsValid) {
        dayError.innerText = "Must be a valid date";
        dayLabel.classList.add('error-label');
        day.classList.add('error-input');
        monthLabel.classList.add('error-label');
        month.classList.add('error-input');
        yearLabel.classList.add('error-label');
        year.classList.add('error-input');
        return;
    }

    // Vérifier si l'année est dans le passé
    const currentYear = (new Date()).getFullYear();
    if (parseInt(inputYear) > currentYear) {
        yearError.innerText = "Must be in the past";
        yearLabel.classList.add('error-label');
        year.classList.add('error-input');
        return;
    } else {
        // Supprimer les styles d'erreur
        yearError.innerText = "";
        yearLabel.classList.remove('error-label');
        year.classList.remove('error-input');
    }

    // Si tous les champs sont valides, exécuter la fonction ageCalculator
    ageCalculator(inputYear, inputMonth, inputDay);
}

function isValidDate(year, month, day) {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

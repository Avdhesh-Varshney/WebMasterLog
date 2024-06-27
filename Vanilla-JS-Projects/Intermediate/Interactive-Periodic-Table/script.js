document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const overlayElement = document.getElementById('overlay-element');
    const overlayAtomicMass = document.getElementById('overlay-atomic-mass');
    const overlayAtomicNumber = document.getElementById('overlay-atomic-number');
    const overlayBlock = document.getElementById('overlay-block');
    const overlayClass = document.getElementById('overlay-class');
    const overlayState = document.getElementById('overlay-state');

    if (!modal || !overlayElement || !overlayAtomicMass || !overlayAtomicNumber || !overlayBlock || !overlayClass || !overlayState) {
        console.error('One or more modal elements not found.');
        return;
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const elements = data.elements;

            const listItems = document.querySelectorAll('.periodic-table li');

            listItems.forEach(li => {
                li.addEventListener('click', () => {
                    const atomicNumber = parseInt(li.querySelector('b').textContent);

                    const element = elements.find(el => el.atomic_number === atomicNumber);

                    if (element) {
                        overlayElement.textContent = element.name;
                        overlayAtomicMass.textContent = element.atomic_mass;
                        overlayAtomicNumber.textContent = element.atomic_number;
                        overlayBlock.textContent = element.block;
                        overlayClass.textContent = element.classification;
                        overlayState.textContent = element.state;

                        modal.style.display = 'block';
                    } else {
                        console.error(`Element with atomic number ${atomicNumber} not found in data.`);
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    document.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('close')) {
            modal.style.display = 'none';
        }
    });
});

const cardImages = {
    'Chocolate Cake': ['Picture/Chocolate Cake1.jpg', 'Picture/Chocolate Cake2.jpg', 'Picture/Chocolate Cake3.jpg'],
    'Fresh Croissant': ['Picture/Fresh Croissant1.jpg', 'Picture/Fresh Croissant2.webp', 'Picture/Fresh Croissant3.jpg'],
    'Assorted Cookies': ['Picture/Assorted Cookies1.jpg', 'Picture/Assorted Cookies2.jpg', 'Picture/Assorted Cookies3.jpg'],
    'Blueberry Muffins': ['Picture/Blueberry Muffins1.jpg', 'Picture/Blueberry Muffins2.webp', 'Picture/Blueberry Muffins3.jpg'],
    'Cupcakes': ['Picture/Cupcakes1.jpg', 'Picture/Cupcakes2.jpg', 'Picture/Cupcakes3.jpg'],
    'Artisan Bread': ['Picture/Artisan Bread1.jpg', 'Picture/Artisan Bread2.jpg', 'Picture/Artisan Bread3.jpg']
};

function toggleCard(clickedCard) {
    const isExpanded = clickedCard.classList.contains('expanded');

    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.remove('expanded');
    });

    let existingExpandedCards = document.querySelector('.expanded-cards');
    if (existingExpandedCards) {
        existingExpandedCards.remove();
    }
    if (!isExpanded) {
        clickedCard.classList.add('expanded');

        const container = document.querySelector('.card-container');
        const expandedCards = document.createElement('div');
        expandedCards.className = 'expanded-cards';

        const cardTitle = clickedCard.querySelector('h3').textContent;
        const images = cardImages[cardTitle] || [];

        images.forEach(imageSrc => {
            const moreCard = document.createElement('div');
            moreCard.className = 'card';
            moreCard.innerHTML = `
                <img src="${imageSrc}" alt="${cardTitle}">
                <h3>${cardTitle}</h3>
            `;
            expandedCards.appendChild(moreCard);

            moreCard.addEventListener('click', () => {
                Swal.fire({
                    title: 'Rate this item',
                    input: 'radio',
                    inputOptions: {
                        '1': '⭐',
                        '2': '⭐⭐',
                        '3': '⭐⭐⭐',
                        '4': '⭐⭐⭐⭐',
                        '5': '⭐⭐⭐⭐⭐'
                    },
                    inputValidator: (value) => {
                        if (!value) {
                            return 'You need to select a rating!';
                        }
                    },
                    confirmButtonText: 'Submit',
                    cancelButtonText: 'Cancel',
                    showCancelButton: true,
                    inputAttributes: {
                        'aria-label': 'Select a rating'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const rating = result.value;

                        clickedCard.querySelector('img').src = imageSrc;

                        console.log(`Rating given: ${rating} stars`);
                    }
                });

                clickedCard.classList.remove('expanded');
                expandedCards.remove();
            });
        });

        const cardRect = clickedCard.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        expandedCards.style.top = `${cardRect.top - containerRect.top}px`;
        expandedCards.style.left = `${cardRect.right - containerRect.left + 10}px`;

        container.appendChild(expandedCards);
    }
}

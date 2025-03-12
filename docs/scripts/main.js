document.addEventListener("DOMContentLoaded", function() {
    fetch('data/services.json')
        .then(response => response.json())
        .then(data => {
            const servicesContainer = document.getElementById('services-container');
            const servicesPerPage = 10; 
            let currentPage = 1; 

            function showServices(page) {
                servicesContainer.innerHTML = '';

                const startIndex = (page - 1) * servicesPerPage;
                const endIndex = page * servicesPerPage;
                const servicesToDisplay = data.slice(startIndex, endIndex);

                servicesToDisplay.forEach(service => {
                    const serviceDiv = document.createElement('div');
                    serviceDiv.classList.add('service');

                    const serviceLink = document.createElement('a');
                    serviceLink.href = `service.html?name=${encodeURIComponent(service.name)}`;
                    
                    serviceLink.innerHTML = `
                        <div class="service-header">
                            <img src="${service.logo}" alt="${service.name} logo" class="service-logo" />
                            <h3>${service.name}</h3>
                        </div>
                        <p>${service.description}</p>
                    `;

                    serviceDiv.appendChild(serviceLink);
                    servicesContainer.appendChild(serviceDiv);
                });
            }

            function createPagination(page) {
                const paginationContainer = document.getElementById('pagination-btn');
                paginationContainer.innerHTML = ''; // Limpa a navegação anterior

                const totalPages = Math.ceil(data.length / servicesPerPage);

                const firstPageButton = document.createElement('button');
                firstPageButton.textContent = '<<';
                firstPageButton.classList.add('pagination-btn');
                firstPageButton.disabled = page === 1;
                firstPageButton.addEventListener('click', () => {
                    currentPage = 1;
                    showServices(currentPage);
                    createPagination(currentPage);
                });
                paginationContainer.appendChild(firstPageButton);

                const prevPageButton = document.createElement('button');
                prevPageButton.textContent = 'Página Anterior';
                prevPageButton.classList.add('pagination-btn');
                prevPageButton.disabled = page === 1;
                prevPageButton.addEventListener('click', () => {
                    currentPage--;
                    showServices(currentPage);
                    createPagination(currentPage);
                });
                paginationContainer.appendChild(prevPageButton);

                const nextPageButton = document.createElement('button');
                nextPageButton.textContent = 'Próxima Página';
                nextPageButton.classList.add('pagination-btn');
                nextPageButton.disabled = page === totalPages;
                nextPageButton.addEventListener('click', () => {
                    currentPage++;
                    showServices(currentPage);
                    createPagination(currentPage);
                });
                paginationContainer.appendChild(nextPageButton);

                const lastPageButton = document.createElement('button');
                lastPageButton.textContent = '>>';
                lastPageButton.classList.add('pagination-btn');
                lastPageButton.disabled = page === totalPages;
                lastPageButton.addEventListener('click', () => {
                    currentPage = totalPages;
                    showServices(currentPage);
                    createPagination(currentPage);
                });
                paginationContainer.appendChild(lastPageButton);
            }

            showServices(currentPage);
            createPagination(currentPage);
        })
        .catch(error => console.error('Erro ao carregar os serviços:', error));
});

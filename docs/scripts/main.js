
const methods = {
    services: [],
    currentPage: 1,
    itemsPerPage: 10,
    filteredServices: [],
    loadServices: async () => {
        const response = await fetch(`https://criptolivre.online/data/services.json`)
        
        if(!response.ok) throw new Error("An unexpected error occurred while loading services")

        methods.services = await response.json()

        methods.showServices(methods.currentPage);
        methods.createPagination(methods.currentPage);
    },
    filterServices: async (searchTerm) => {
        if(!searchTerm.trim().length) {
            methods.showServices(methods.currentPage);
            methods.createPagination(methods.currentPage);
            return
        }

        let calculatedMach = methods.services.map(service => {
            let nameSimilarity = textSimilarity(toLower(searchTerm), toLower(service.name))
            let descriptionSimilarity = textSimilarity(toLower(searchTerm), toLower(service.description))
            return {
                similarity: (nameSimilarity+descriptionSimilarity) / 2,
                service,
            }
        })

        methods.filteredServices = calculatedMach.filter(s => s.similarity >= .23)
            .sort((a, b) => b.similarity - a.similarity)
            .map(item => item.service)
        
        methods.showServices(methods.currentPage, true);
        methods.createPagination(methods.currentPage, true);
    },
    showServices: (page, filtered = false) => {
        const servicesContainer = document.getElementById('services-container');
        servicesContainer.innerHTML = '';

        const startIndex = (page - 1) * methods.itemsPerPage;
        const endIndex = page * methods.itemsPerPage;
        let servicesToDisplay = methods.services.slice(startIndex, endIndex);
        if(filtered)
            servicesToDisplay = methods.filteredServices.slice(startIndex, endIndex);

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
    },
    createPagination: (page, filtered = false) => {
        const paginationContainer = document.getElementById('pagination-btn');
        paginationContainer.innerHTML = ''; // Limpa a navegação anterior

        let totalPages = Math.ceil(methods.services.length / methods.itemsPerPage);
        if(filtered)
            totalPages = Math.ceil(methods.filteredServices.length / methods.itemsPerPage);

        const firstPageButton = document.createElement('button');
        firstPageButton.textContent = '<<';
        firstPageButton.classList.add('pagination-btn');
        firstPageButton.disabled = page === 1;
        firstPageButton.addEventListener('click', () => {
            methods.currentPage = 1;
            methods.showServices(methods.currentPage);
            methods.createPagination(methods.currentPage);
        });
        paginationContainer.appendChild(firstPageButton);

        const prevPageButton = document.createElement('button');
        prevPageButton.textContent = 'Página Anterior';
        prevPageButton.classList.add('pagination-btn');
        prevPageButton.disabled = page === 1;
        prevPageButton.addEventListener('click', () => {
            methods.currentPage--;
            methods.showServices(methods.currentPage);
            methods.createPagination(methods.currentPage);
        });
        paginationContainer.appendChild(prevPageButton);

        const nextPageButton = document.createElement('button');
        nextPageButton.textContent = 'Próxima Página';
        nextPageButton.classList.add('pagination-btn');
        nextPageButton.disabled = page === totalPages;
        nextPageButton.addEventListener('click', () => {
            methods.currentPage++;
            methods.showServices(methods.currentPage);
            methods.createPagination(methods.currentPage);
        });
        paginationContainer.appendChild(nextPageButton);

        const lastPageButton = document.createElement('button');
        lastPageButton.textContent = '>>';
        lastPageButton.classList.add('pagination-btn');
        lastPageButton.disabled = page === totalPages;
        lastPageButton.addEventListener('click', () => {
            methods.currentPage = totalPages;
            methods.showServices(methods.currentPage);
            methods.createPagination(methods.currentPage);
        });
        paginationContainer.appendChild(lastPageButton);
    }
}

document.addEventListener("DOMContentLoaded", methods.loadServices);

document.addEventListener("DOMContentLoaded", function () {
    const servicesContainer = document.getElementById('services-container');
    const categoriesContainer = document.getElementById('categories-container');

    fetch('data/services.json')
        .then(response => response.json())
        .then(data => {
            renderCategories(data);
            renderServices(data);

            // Filtrar e exibir os serviços ao clicar na categoria
            categoriesContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('category-btn')) {
                    const selectedCategory = event.target.dataset.category;
                    const filteredServices = selectedCategory === "Todos"
                        ? data
                        : data.filter(service => service.categories.includes(selectedCategory));
                    renderServices(filteredServices);
                }
            });
        })
        .catch(error => console.error('Erro ao carregar os serviços:', error));

    // Renderizar botões de categorias
    function renderCategories(data) {
        const categories = new Set();
        categories.add("Todos");
        data.forEach(service => service.categories.forEach(category => categories.add(category)));

        categoriesContainer.innerHTML = ''; // Limpa para evitar duplicação
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.dataset.category = category;
            button.classList.add('category-btn');
            categoriesContainer.appendChild(button);
        });
    }

    // Renderizar serviços com estrutura idêntica ao início
    function renderServices(services) {
        servicesContainer.innerHTML = '';
        services.forEach(service => {
            const serviceDiv = document.createElement('div');
            serviceDiv.classList.add('service');

            const serviceLink = document.createElement('a');
            serviceLink.href = `service.html?name=${encodeURIComponent(service.name)}`;
            serviceLink.innerHTML = `
                <div class="service-header">
                    <!-- Usando o link direto para a logo -->
                    <img src="${service.logo}" alt="${service.name} logo" class="service-logo" />
                    <h3>${service.name}</h3>
                </div>
                <p><strong>${service.description}</strong></p>
            `;

            serviceDiv.appendChild(serviceLink);
            servicesContainer.appendChild(serviceDiv);
        });
    }
});

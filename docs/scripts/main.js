document.addEventListener("DOMContentLoaded", function() {
    fetch('data/services.json')
        .then(response => response.json())
        .then(data => {
            const servicesContainer = document.getElementById('services-container');
            data.forEach(service => {
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
        })
        .catch(error => console.error('Erro ao carregar os serviços:', error));
});

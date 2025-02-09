document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceName = urlParams.get('name');

    fetch('data/services.json')
        .then(response => response.json())
        .then(data => {
            const service = data.find(service => service.name === serviceName);
            if (service) {
                const serviceDetails = document.getElementById('service-details');
                serviceDetails.innerHTML = `
                    <div class="service-detail">
                        <div class="service-header">
                            <img src="${service.logo}" alt="${service.name} logo" class="service-logo">
                            <h2>${service.name}</h2>
                        </div>
                        <p>${service.detailedDescription}</p>
                        <p><strong>Categorias:</strong> ${service.categories.join(', ')}</p>
                        <a href="${service.links.web}" target="_blank">Acessar o Serviço</a>
                        ${service.links.tor ? `<a href="${service.links.tor}" target="_blank">Acessar .onion</a>` : ''}
                    </div>
                `;
            } else {
                document.getElementById('service-details').innerHTML = '<p>Serviço não encontrado.</p>';
            }
        })
        .catch(error => console.error('Erro ao carregar o serviço:', error));
});

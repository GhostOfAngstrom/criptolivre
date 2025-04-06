import { nip19, Relay } from "https://esm.sh/nostr-tools";

const relayUrl = "wss://nos.lol";

const getNostrProfile = async (npub) => {
  let pubkey = nip19.decode(npub).data;
  const relay = await Relay.connect(relayUrl);

  return new Promise((resolve, reject) => {
    const sub = relay.subscribe(
      [
        {
          kinds: [0],
          authors: [pubkey],
        },
      ],
      {
        onevent(event) {
          try {
            const content = JSON.parse(event.content);
            sub.close();
            resolve(content);
          } catch (error) {
            reject(error);
          }
        },
        oneose() {
          sub.close();
          reject(new Error("No event received"));
        },
      }
    );
  });
};

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceName = urlParams.get('name');

    fetch('data/services.json')
        .then(response => response.json())
        .then(async data => {
            const service = data.find(service => service.name === serviceName);
            if (service) {
                const nostrProfile = service.npub ? await getNostrProfile(service.npub) : undefined;

                const serviceDetails = document.getElementById('service-details');
        
                if (nostrProfile) {
                  const name = nostrProfile.displayName || nostrProfile.name || nostrProfile.display_name
                  serviceDetails.innerHTML = `
                      <div class="service-detail">
                          <div class="service-header">
                              <img src="${nostrProfile.picture}" alt="${name} logo" class="service-logo">
                              <h2>${name}</h2>
                          </div>
                          <p>${nostrProfile.about}</p>
                          <p><strong>Categorias:</strong> ${service.categories.join(', ')}</p>
                          <a href="${nostrProfile.website}" target="_blank">Acessar o Serviço</a>
                          ${service.links.tor ? `<a href="${service.links.tor}" target="_blank">Acessar .onion</a>` : ''}
                      </div>
                  `;
                }

                if (!nostrProfile) {
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
                }

                const existingComments = document.querySelector(".utterances");
                if (existingComments) {
                    existingComments.remove();
                }

                const serviceId = service.name.toLowerCase().replace(/\s+/g, "-");

                const script = document.createElement("script");
                script.src = "https://utteranc.es/client.js";
                script.setAttribute("repo", "GhostOfAngstrom/criptolivre");
                script.setAttribute("issue-term", serviceId);
                script.setAttribute("theme", "github-dark");
                script.setAttribute("crossorigin", "anonymous");
                script.setAttribute("async", "");

                document.getElementById("comments-section").appendChild(script);
            } else {
                document.getElementById('service-details').innerHTML = '<p>Serviço não encontrado.</p>';
            }
        })
        .catch(error => console.error('Erro ao carregar o serviço:', error));
});

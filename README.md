# CriptoLivre

**CriptoLivre** é um site que reúne os melhores serviços de criptomoedas sem KYC (Know Your Customer), promovendo privacidade e autonomia financeira.

## Funcionalidades
- Listagem exchanges descentralizadas (DEXs) e seguras.
- Marketplaces e ferramentas financeiras anônimas.
- Atualizações constantes com novos serviços.

## Tecnologias Utilizadas
- **HTML**
- **CSS**
- **JavaScript**
- **JSON**

## Por que sem KYC?
Priorizamos a privacidade e a descentralização, respeitando a soberania financeira dos usuários. O CriptoLivre promove a utilização de criptomoedas da forma como foram originalmente concebidas: livres de intermediários.

---

# Como Contribuir

### 1. Fork do Repositório
Clique no botão **Fork** no topo da página para criar uma cópia do repositório no seu GitHub.

### 2. Clone o Repositório
Clone o repositório para sua máquina local usando o comando:

```bash
git clone https://github.com/seu-usuario/CriptoLivre.git
```

### 3. Crie uma Nova Branch
Sempre trabalhe em uma branch nova:

```bash
git checkout -b adicionar-servico
```

### 4. Adicione o Serviço ao JSON
Abra o arquivo `dados.json` e siga o formato abaixo para adicionar um novo serviço:

```json
{
    "name": "Nome do Serviço",
    "description": "Breve resumo do serviço",
    "detailedDescription": "Descrição detalhada do serviço",
    "categories": ["Categoria do Serviço"],
    "links": {
      "web": "link da web",
      "tor": "link da rede Tor"
    },
    "logo": "link da logo do serviço"
  }
```

**Atenção:** Certifique-se de que seu JSON seja válido. Para isso, você pode validar usando [JSONLint](https://jsonlint.com).

### 5. Commit das Alterações
Salve suas alterações e faça o commit:

```bash
git add dados.json
git commit -m "Adiciona novo serviço ao JSON"
```

### 6. Envie para o GitHub
Faça o push das suas alterações:

```bash
git push origin adicionar-servico
```

### 7. Crie um Pull Request
No GitHub, acesse seu fork e clique em **Pull Request**. Adicione uma descrição clara sobre as alterações.

---

## Regras de Contribuição

- Siga o formato correto do JSON.
- Certifique-se de que o serviço é legítimo, útil e SEM KYC.
- Descreva brevemente o propósito do serviço.

---

## Dúvidas?
Se tiver dúvidas, abra uma **Issue** ou entre em contato.

---

Junte-se ao movimento por mais privacidade e autonomia no universo cripto com o **CriptoLivre**.

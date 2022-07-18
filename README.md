# challange-fullstack
Desafio - Desenvolvedor Fullstack

# Como subir o projeto
- Subir o script da database no Postgres
- Instalar as dependencias da API com npm install
- As variaveis da API podem ser alteradas no arquivo .env
- Subir a API com npm run dev
- Instalar as dependencias do Client com npm install --legacy-peer-deps
- As variaveis da API podem ser alteradas no arquivo .env
- Subir o Client com npm start

# Endpoints
- POST /clinics - Inserir uma nova clinica no banco de dados
 - body: {
    "name": string,
    "CNPJ": number,
    "address": {
        "line1": string,
        "number": string,
        "district": string,
        "line2": string",
        "city": string,
        "state": string,
        "country": string,
        "latitude": number,
        "longitude": number
    }
}

- GET /clinics - Obter todas as clinicas do banco de dados
 - resposta: {
    "results": [
        {
            "id": number,
            "name": string,
            "line1": string,
            "number": string,
            "district": string,
            "city": string,
            "state": string,
            "country": string,
            "latitude": string,
            "longitude": string
        }
     ]
 }

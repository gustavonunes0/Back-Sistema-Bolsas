# Informações:
- Os parênteses foram adicionados para facilitar a leitura, favor ignorar na hora de consumir as APIs
- Os valores que possuem a opção default não são opcionais mas o valor será aplicado apenas se não receber as informações necessárias.
- O token sempre vai ser o id do usuário.

## Como rodar:
- npm install
- npx prisma migrate dev --name university
- npm run build
- npm run start:prod

## Localizações:
localhost:5000 (server local)

## APIs:

### USER:

- [POST]Para criar um usuário é necessário enviar no BODY as seguintes infomações: name, email, password, role(default = Estudante)
/user/register

- [POST]Para se logar e receber o token de autorização é necessário enviar no BODY as seguintes informações: name, email, password
/user/login

- [GET]Caso seja necessário fazer a verificação do usuário e receber as informações do mesmo é preciso enviar o token no HEADER de nome authorization e com o valor
/user

### PROCESSOS:

- [POST]Para criar um novo processo é necessário ser coordenador e enviar o token pelo HEADER com nome authorization e as seguintes informações pelo BODY: name, description(opcional), startDate(opcional), endDate(opcional), spots(default = 0), scholarships(default = 0), course, status(opcional)
/processes

- [GET]Para ver todos os processos já criados, nenhuma informação adicional necessária
/processes

### HISTÓRICO DE PROCESSOS DO USUÁRIO:

- [POST]Para o usuário se inscrever em um processo é necessário enviar o token pelo HEADER com nome authorization e o id do processo também pelo HEADER com o nome processId
/userProcesses

- [GET]Para pegar o histórico de inscrições do usuário é preciso enviar o token pelo HEADER com nome authorization
/userProcesses

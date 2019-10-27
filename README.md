<h1 align="center">
    <img alt="Go Stack" src="https://github.com/Cleiton-D/Desafio-GoStack-MeetApp/blob/master/assets/gostack.png" />
    <br>
    <div style="display:flex; align-items:center">
      <img alt="Meetup Logo" width="" src="https://github.com/Cleiton-D/Desafio-GoStack-MeetApp/blob/master/assets/logo-meetapp.svg" />&nbsp;&nbsp;MeetApp 
    </div>
</h1>

<h4 align="center">
  Desafio para certificação do [RocketSeat GoStack Bootcamp](https://rocketseat.com.br/bootcamp)
</h4>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Cleiton-D/Desafio-GoStack-MeetApp.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Cleiton-D/Desafio-GoStack-MeetApp.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Cleiton-D/Desafio-GoStack-MeetApp.svg">
  <a href="https://github.com/Cleiton-D/Desafio-GoStack-MeetApp/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Cleiton-D/Desafio-GoStack-MeetApp.svg">
  </a>
</p>

<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-como-utilizar">Como utilizar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>
![App Screenshot]()
![App Screenshot]()

## :rocket: Tecnologias

Este projeto foi desenvolvido utilizando as seguintes recursos:

### FRONT-END

- [ReactJS](https://reactjs.org/)
- [customize-cra](https://github.com/arackaf/customize-cra)
- [prop-types](https://github.com/facebook/prop-types)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [React Router v5](https://github.com/ReactTraining/react-router)
- [styled-components](https://www.styled-components.com/)
- [Axios](https://github.com/axios/axios)
- [History](https://www.npmjs.com/package/history)
- [Immer](https://github.com/immerjs/immer)
- [Polished](https://polished.js.org/)
- [React-Toastify](https://fkhadra.github.io/react-toastify/)
- [React-Icons](http://react-icons.github.io/react-icons/)
- [Unform](https://github.com/Rocketseat/unform)
- [Yup](https://www.npmjs.com/package/yup)
- [date-fns](https://date-fns.org/)
- [react-confirm-alert](https://github.com/GA-MO/react-confirm-alert)
- [react-datepicker](https://github.com/Hacker0x01/react-datepicker)
- [react-loader-spinner](https://github.com/mhnpd/react-loader-spinner)
- [Reactotron](https://infinite.red/reactotron)
- [VS Code][vc] com [EditorConfig][vceditconfig], [ESLint][vceslint] e [Prettier][vcprettier]

### MOBILE

- [ReactJS](https://reactjs.org/)
- [React Native](https://facebook.github.io/react-native/)
- [Android Studio](https://developer.android.com/studio)
- [prop-types](https://github.com/facebook/prop-types)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [Immer](https://github.com/immerjs/immer)
- [react-navigation](https://reactnavigation.org/)
- [styled-components](https://www.styled-components.com/)
- [Axios](https://github.com/axios/axios)
- [Polished](https://polished.js.org/)
- [React-native-flash-message](https://github.com/lucasferreira/react-native-flash-message#readme)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-svg](https://github.com/react-native-community/react-native-svg)
- [react-native-alert-async](https://github.com/slorber/react-native-alert-async)
- [react-native-linear-gradient](https://github.com/react-native-community/react-native-linear-gradient)
- [date-fns](https://date-fns.org/)
- [Reactotron](https://infinite.red/reactotron)
- [VS Code][vc] com [EditorConfig][vceditconfig], [ESLint][vceslint] e [Prettier][vcprettier]

### BACK-END

- [Node.js][nodejs]
- [Express](https://expressjs.com/)
- [nodemon](https://nodemon.io/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Docker](https://www.docker.com/docker-community)
- [Sequelize](http://docs.sequelizejs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Youch](https://www.npmjs.com/package/youch)
- [Yup](https://www.npmjs.com/package/yup)
- [Bee Queue](https://www.npmjs.com/package/bcrypt)
- [Nodemailer](https://nodemailer.com/about/)
- [date-fns](https://date-fns.org/)
- [Sentry](https://sentry.io/)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [VS Code][vc] com [EditorConfig][vceditconfig], [ESLint][vceslint] e [Prettier][vcprettier]

## :information_source: Como utilizar

Para executar esta aplicação, você precisará do [Git](https://git-scm.com), [Nodejs v10.16][nodejs] ou superior e o [Yarn][yarn]. No seu terminal:

### Instalar API

```bash
# Clone este repositório:
$ git clone https://github.com/Cleiton-D/

# Vá para o repositório da api:
$ cd meetapp-gostack/back-end

# Instalar as dependências
$ yarn install

# Criar o conteiner Docker
$ docker run --name database_meetapp -e POSTGRES_PASSWORD=meetpass -e POSTGRES_DB=meetapp -p 5432:5432 -d postgres


# Criar o conteiner Redis
$ docker run --name redismeetapp -p 6379:6379 -d -t redis:alpine

# Executar as migrations
$ yarn migrate

# Iniciar a api
$ yarn dev
```

Em uma nova aba do terminal:
Para inicar o serviço de envio de e-mail.

```bash
$ yarn jobs
```

### Instalar o MeetApp Web

```bash

# Vá para a pasta front
$ cd meetapp-gostack/front

# Instalar as dependências
$ yarn install

# Iniciar a aplicação
$ yarn start
```

### Instalar o MeetApp Mobile

Observação: App desenvolvido para Android.

```bash

# Vá para a pasta mobile
$ cd meetapp-gostack/mobile

```

caso esteja utilizando a depuração por USB no Android executar:
para fazer o redirecionamento das portas da API e do Rectotron.

```bash
$ yarn adb
```

caso contrário, no arquivo env.js, alterar o valor da variável HOST para o ip de sua máquina ou '10.0.2.2' caso estiver esando o emulador do Android.

```
//HOST='localhost'
//HOST='10.0.2.2'
HOST='192.168.0.103'

# instale as dependências
$ yarn install

# Inicie a aplicação
$ yarn start
```

Em uma nova aba do terminal:

```bash
$ yarn react-native run-android
```

---

Construido por Cleiton Dione Ahnerth Kiper [LinkedIn](https://www.linkedin.com/in/cleiton-dione-ahnerth-kiper-4098b4127/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vcprettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

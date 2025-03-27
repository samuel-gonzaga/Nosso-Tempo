# Nosso Tempo

Nosso Tempo é um aplicativo mobile desenvolvido com React Native e Firebase, criado para acompanhar o tempo de relacionamento de forma dinâmica e em tempo real.

## Visão Geral
O aplicativo foi desenvolvido em apenas 3 dias e tem como objetivo principal ser um contador do tempo de relacionamento. A partir de uma data inicial armazenada em uma coleção no Firebase, o app calcula e exibe, utilizando a biblioteca dayjs, informações como:
- Contagem total de tempo
- Quantidade total de meses
- Quantidade total de dias
- Quantidade total de horas
Essas informações são atualizadas em tempo real, proporcionando uma experiência única e personalizada.


## Tecnologias e Bibliotecas
O desenvolvimento do Nosso Tempo contou com as seguintes tecnologias e bibliotecas:

- React Native – Framework para desenvolvimento mobile
- Firebase – Backend e armazenamento de dados
- dayjs – Manipulação e formatação de datas
- react-native-safe-area-context – Garantia de layout adequado em diferentes dispositivos
- react-native-vector-icons – Ícones personalizados para uma melhor experiência visual

## Instalação e Configuração do Projeto

1. Clone o repositório
```bash
  git clone https://github.com/samuel-gonzaga/Nosso-Tempo.git
  cd Nosso-Tempo
```
2. Instale os pacotes necessários

Utilize o npm para instalar as dependências
```bash
  npm install
```

3. Configuração do Firebase

- Crie um projeto no Firebase Console.
- Configure a coleção contendo a data inicial do seu namoro.
- Atualize o arquivo firebaseConfig.js (ou similar) com as credenciais do seu projeto Firebase:
```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db};
```

4. Executando o Aplicativo
Inicie o aplicativo em seu dispositivo ou emulador:

```bash
  npm start
  # ou
  npx expo start
```

## Customizações Visuais e de Conteúdo
### Troca das Imagens
- Navegue até a pasta src/assets.
- Substitua as imagens existentes pelas suas fotos (recomenda-se utilizar imagens no formato 9x16 para um layout ideal).

### Personalização das Mensagens
- Para alterar a mensagem final do aplicativo, edite o arquivo onde a mensagem está definida
- Modifique o texto conforme a sua preferência para uma mensagem personalizada e especial.

## Contribuição
Contribuições são sempre bem-vindas! Se você tiver sugestões ou melhorias, sinta-se à vontade para contribuir fazendo uma fork do projeto.

## Autor

- [@samuel-gonzaga](https://www.github.com/samuel-gonzaga)

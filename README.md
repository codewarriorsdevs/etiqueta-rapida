# Etiqueta Rápida 🏷️

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-green)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Licença](https://img.shields.io/badge/licença-proprietária-red)

O "Etiqueta Rápida" é um aplicativo mobile para iOS e Android que capacita pequenos e médios negócios a criar e imprimir etiquetas profissionais de forma rápida e intuitiva, utilizando impressoras térmicas Wi-Fi.

<p align="center">
  <img src="URL_DA_SUA_IMAGEM_AQUI" alt="Screenshot do App Etiqueta Rápida" width="300"/>
</p>

## 📋 Tabela de Conteúdos

1.  [Sobre o Projeto](#sobre-o-projeto)
2.  [Funcionalidades](#funcionalidades)
3.  [Stack de Tecnologia](#stack-de-tecnologia)
4.  [Começando](#começando)
    * [Pré-requisitos](#pré-requisitos)
    * [Instalação](#instalação)
5.  [Uso](#uso)
6.  [Roadmap](#roadmap)
7.  [Como Contribuir](#como-contribuir)
8.  [Licença](#licença)
9.  [Contato](#contato)

## 🎯 Sobre o Projeto

Este projeto nasceu da necessidade de uma solução simples e móvel para a impressão de etiquetas. Muitos softwares de etiquetas são complexos, baseados em desktop e pouco amigáveis. O Etiqueta Rápida resolve isso com uma interface limpa e um fluxo de trabalho direto, permitindo que qualquer comerciante imprima etiquetas de preço, códigos de barra ou QR codes em segundos, diretamente do seu celular.

## ✨ Funcionalidades

* **🎨 Editor Intuitivo:** Interface de arrastar e soltar para criar etiquetas personalizadas.
* **✍️ Elementos Dinâmicos:** Adicione Texto, Códigos de Barras (EAN-13), QR Codes e mais.
* **📱 Conexão Simplificada:** Configure sua impressora térmica Wi-Fi em poucos passos.
* **🖨️ Impressão Direta:** Envio de comandos de impressão ESC/POS para impressoras Epson e compatíveis.
* **📂 Gestão de Templates:** Salve seus designs para reutilizá-los com um único toque.

## 🛠️ Stack de Tecnologia

A arquitetura do projeto foi escolhida para otimizar a velocidade de desenvolvimento и a escalabilidade.

* **Plataforma Mobile:** [React Native](https://reactnative.dev/)
* **Backend & Banco de Dados:** [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage)
* **Gestão de Assinaturas:** [RevenueCat](https://www.revenuecat.com/)
* **Impressão Térmica:** [react-native-thermal-printer](https://github.com/hayanperera/react-native-thermal-printer)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Gerenciador de Pacotes:** [Yarn](https://yarnpkg.com/)

## 🚀 Começando

Para obter uma cópia local do projeto e executá-la, siga estes passos.

### Pré-requisitos

Certifique-se de ter o ambiente de desenvolvimento React Native configurado em sua máquina.

* Siga o guia oficial em: [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) (selecione a aba "React Native CLI Quickstart").
* Node.js (versão 18 ou superior)
* Yarn
* Watchman (para macOS)
* JDK (para desenvolvimento Android)
* Xcode (para desenvolvimento iOS)

### Instalação

1.  Clone o repositório para a sua máquina local.
    ```sh
    git clone URL_DO_SEU_REPOSITORIO_PRIVADO
    cd etiqueta-rapida
    ```
2.  Instale as dependências do projeto.
    ```sh
    yarn install
    ```
3.  Instale as dependências nativas do iOS.
    ```sh
    cd ios && pod install
    ```
4.  **Configuração do Firebase:**
    * Faça o download do seu arquivo de configuração do Firebase.
    * Para Android, coloque o arquivo `google-services.json` em `android/app/`.
    * Para iOS, coloque o arquivo `GoogleService-Info.plist` em `ios/etiqueta-rapida/`.

## 🏃 Uso

Após a instalação, você pode rodar o aplicativo no simulador/emulador ou em um dispositivo físico.

* **Para rodar no Android:**
    ```sh
    yarn android
    ```
* **Para rodar no iOS:**
    ```sh
    yarn ios
    ```

## 🗺️ Roadmap

* [ ] Suporte à impressão de imagens e logotipos.
* [ ] Sincronização de templates na nuvem.
* [ ] Importação de dados de planilhas CSV para impressão em lote.
* [ ] Biblioteca de templates por segmento (Moda, Alimentos, Cosméticos).
* [ ] Descoberta automática de impressoras na rede local.

## 🤝 Como Contribuir

Como este é um projeto proprietário, as contribuições externas não são aceitas no momento. Para membros da equipe:

1.  Crie uma Branch para a sua Feature (`git checkout -b feature/FuncionalidadeIncrivel`)
2.  Faça o Commit das suas alterações (`git commit -m 'Adiciona FuncionalidadeIncrivel'`)
3.  Faça o Push para a Branch (`git push origin feature/FuncionalidadeIncrivel`)
4.  Abra um Pull Request para a branch `main`.

## 📜 Licença

Distribuído sob a licença "Todos os Direitos Reservados".




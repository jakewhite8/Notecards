<a name="readme-top"></a>
# Notecards

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]


<!-- LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jakewhite8/Notecards">
    <img src="assets/card-multiple-outline.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Notecards</h3>

  <p align="center">
    A React Native with TypeScript project
    <br />
    <br />
    <a href="https://github.com/jakewhite8/Notecards/issues">Report Bug</a>
    ·
    <a href="https://github.com/jakewhite8/Notecards/issues">Request Feature</a>
    ·
    <a href="https://github.com/jakewhite8/Notecards/wiki">Documentation</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#run-the-app-locally">Run The App Locally</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

<div align="center">
  <img src="https://github.com/jakewhite8/Notecards/assets/5599320/93179b1a-92c1-481d-8800-45df7d746ed9 alt="Home" width="300" height="600">
</div>

This is the User Interface of the Notecards Application. The application is used to create, display, and manage sets of Notecards as well as to track a Users activity. The corresponding REST API is located in the [notecards-server repository](https://github.com/jakewhite8/notecards-server)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The Notecards User Interface is built with TypeScript and React Native. It uses Expo to assist with the development and deployment of the mobile application. The User Interface uses the React Navigation library for routing. The React Native Elements library is used to provide components with consistent styles and functionality.

* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Run The App Locally
### Prerequisites
Download the [Expo Application](Expo-url) (SDK: 51, client version: 2.31.1) on your mobile device

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/jakewhite8/Notecards.git
   ```
2. Using node version 16.20.2 and npm version 8.19.4, install NPM packages 
   ```sh
   npm install
   ```   
3. Start the application
   ```sh
   npm start
   ```
   Note the URL provided beginning with `exp` (ex: `exp://10.0.0.84:8081`)
4. Open the Expo application on your mobile device. Enter the URL provided in the previous step and press connect. After a brief loading period (~30 seconds), the Login page of the Notecard application should be displayed

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Jake White - jake.white@colorado.edu

Project Link: [https://github.com/jakewhite8/Notecards](https://github.com/jakewhite8/Notecards)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Resources I found helpful and would like to give credit to
* [Img Shields](https://shields.io)
* [Best-README-template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md#readme-top)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/jakewhite8/Notecards.svg?style=for-the-badge
[contributors-url]: https://github.com/jakewhite8/Notecards/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jakewhite8/Notecards.svg?style=for-the-badge
[forks-url]: https://github.com/jakewhite8/Notecards/network/members
[stars-shield]: https://img.shields.io/github/stars/jakewhite8/Notecards.svg?style=for-the-badge
[stars-url]: https://github.com/jakewhite8/Notecards/stargazers
[issues-shield]: https://img.shields.io/github/issues/jakewhite8/Notecards.svg?style=for-the-badge
[issues-url]: https://github.com/jakewhite8/Notecards/issues
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Expo-url]: https://expo.dev/

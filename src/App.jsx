import React from "react";
import Grafico from "./Grafico";
import ReactDOM from 'react-dom';
import './App.css';

function App() {
    return (
        
      <>
        <header>
        </header>
            <body>
              <div class="tudo">
              <h1>Dashboard anemômetro digital 📊</h1>
              <div class="intro">
                De que se trata este projeto? 🤔
              </div>
              <div class="texto">
              O projeto tem como principal objetivo mostrar na prática a aplicação dos meus conhecimentos emem algumas tecnologias que venho estudando.
              Segue as principais tecnologias que utilizei para trazer esse projeto à vida:
              </div>
              <div class = "techs">
              <div class = "tech">
                <img src="/react.svg" alt="React" height="100px" width="100px"/>
                <h2 style={{color: "#0cd6fb"}}>React</h2>
              </div>
              <div class = "tech">
                <img src="/5968322.png" alt="Node.js" height="100px" width="100px"/>
                <h2>Node.js</h2>
              </div>
              <div class = "tech">
                <img src="/iot.png" alt="IoT" height="100px" width="100px"/>
                <h2>I o T</h2>
              </div>
              </div>
              <div class="como">
                Como funciona? 🤔
              </div>
              <div class = "texto">
                <p>
                  Os dados são captados pela estrutura do anemômetro e enviados por um microcontrolador esp32 ao 
                  server em Node.js e Express. Depois de recebido, o Node armazena os dados em arquivos 
                  .json, escaneia esses arquivos e os envia à página em React que recebe os dados e os transforma nesse
                  belo DashBoard interativo que você pode ver abaixo:
                </p>
              </div>
              <div>
                <h1>DashBoard Interativo:</h1>
                <br />
                <Grafico />
              </div>
              </div>
          </body>
      </>

    );
}

export default App;

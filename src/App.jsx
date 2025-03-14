/* import { useState, useEffect } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch('/api/mensagem')  // O Vite redireciona para http://localhost:8080/api/mensagem
      .then(res => res.json())
      .then(data => setMensagem(data.mensagem))
      .catch(err => console.error('Erro ao buscar mensagem:', err));
  }, []);

  return (
    <div>
      <h1>Teste de comunicação 🚀</h1>
      <p>Mensagem do backend: {mensagem}</p>
    </div>
  );
}

export default App;
 */


import React from "react";
import Grafico from "./Grafico";
import ReactDOM from 'react-dom';

function App() {
    return (
        
      <>
        <header>
          <h1>Dashboard de dados ambientes coletados com um anemômetro digital</h1>
        </header>
            <body>
              <div>
              <div>
                <p>
                  Projeto tem como principal finalidade mostrar algumas funcionalidades do 
                  React <img src="/react.svg" alt="" height="15px" width="15px"/> e Node.js 
                  <img src="/5968322.png" alt="" height="15px" width="15px"/>.
                  Os dados são captados pela estrutura do anemômetro e enviados por um microcontrolador esp32 ao 
                  server em Node.js e Express. Depois de recebido, o Node armazena os dados em arquivos 
                  .json, escaneia esses arquivos e os envia ao React que recebe os dados e os transforma nesse
                  belo gráfico interativo que você pode ver abaixo:
                </p>
              </div>
              <div>
                <h1>Gráfico de Temperatura</h1>
                <Grafico />
              </div>
              </div>
          </body>
      </>

    );
}

export default App;

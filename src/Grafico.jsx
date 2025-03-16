import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import MiniJanela from "./MiniJanela"; 
import './Grafico.css';
import { BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
function Grafico() {
    const [dados, setDados] = useState([]);
    const [janelaAberta, setJanelaAberta] = useState(false);
    const [dadosSelecionados, setDadosSelecionados] = useState(null);
    const [dadosExtras, setDadosExtras] = useState(null);

    useEffect(() => {
        async function fetchDados() {
            try {
                const resposta = await fetch("/api/dados"); 
                const dadosRecebidos = await resposta.json();
                console.log("Dados recebidos do backend:", dadosRecebidos);
                setDados(dadosRecebidos);
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
            }
        }
        fetchDados();
    }, []);

    if (dados.length === 0) return <p>Carregando dados...</p>;

    const labels = dados.map(da => new Date(da.data).toLocaleString());
    const temperaturas = dados.map(d => d.temperatura);
    const humidades = dados.map(h => h.humidade);
    const velocidades = dados.map(v => v.velocidade);
    const direcoes = dados.map(dir => dir.direcao);
    const pressoes = dados.map(p => p.pressao);



    function getRandomRGB() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
    
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    const rgbs = velocidades.map(() => getRandomRGB());

    const data = {
        labels,
        datasets: [
            {
                label: "Temperatura (°C)",
                data: temperaturas,
                borderColor: "red",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Humidade (%)",
                data: humidades,
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const dataBar = {
        labels: labels,
        datasets: [
          {
            label: "Velocidade (Km/h)",
            data: velocidades,
            backgroundColor: rgbs,
            borderWidth: 1,
          },
        ],
      };

      const dataLine2 = {
        labels: labels,
        datasets: [
          {
            label: 'Pressão Atmosférica (Pa)',
            data: pressoes,
            borderColor: rgbs,
            backgroundColor: rgbs,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          }
        ]
      };

          // Função para abrir a mini janela ao clicar em um ponto do gráfico
    const handleClickLinha = (event, elements) => {
        if (elements.length > 0) {
            const datasetIndex = elements[0].datasetIndex;
            const index = elements[0].index;
            const datasetLabel = data.datasets[datasetIndex].label;
            const value = data.datasets[datasetIndex].data[index]
            const time = data.labels[index];

            setDadosSelecionados({ label: datasetLabel, value, time });
            setDadosExtras( null );
            !janelaAberta ? setJanelaAberta(true) : setJanelaAberta(false);
            
        }
    };

    const handleClickBarra = (event, elements) => {
        if (elements.length > 0) {
            const datasetIndex = elements[0].datasetIndex;
            const index = elements[0].index;
            const datasetLabel = dataBar.datasets[datasetIndex].label;
            const value = dataBar.datasets[datasetIndex].data[index];
            const time = dataBar.labels[index];
            const direction = direcoes[index];

            setDadosSelecionados({ label: datasetLabel, value, time });
            setDadosExtras( direction );

            !janelaAberta ? setJanelaAberta(true) : setJanelaAberta(false);
            
        }
    };

    const handleClickLinha2 = (event, elements) => {
        if (elements.length > 0) {
            const datasetIndex = elements[0].datasetIndex;
            const index = elements[0].index;
            const datasetLabel = dataLine2.datasets[datasetIndex].label;
            const value = dataLine2.datasets[datasetIndex].data[index]
            const time = dataLine2.labels[index];

            setDadosSelecionados({ label: datasetLabel, value, time });
            setDadosExtras( null );
            !janelaAberta ? setJanelaAberta(true) : setJanelaAberta(false);
            
        }
    };
      
      return (
    <>
        <div class="geral">
        <h2>Gráfico de Temperatura e Humidade</h2>
            <div class = "grafico">
              <Line data={data} options={{onClick: handleClickLinha}} />
            </div>
        <h2>Gráfico de Velocidade e Direção do Vento</h2>
            <div class = "grafico">
              <Bar data={dataBar} options={{onClick: handleClickBarra}} />
            </div>
        <h2>Gráfico de Pressão Atmosférica</h2>
            <div class = "grafico">
              <Line data={dataLine2} options={{onClick: handleClickLinha2}} />
            </div>
            <div>
                <p></p>
            </div>
        </div>

        <h2>Tabela de Dados (dados brutos)</h2>
        <div class = "tabela">
            <table border="1">
                <thead>
                    <tr>
                        <th>Leitura</th>
                        <th>Data</th>
                        <th>Temperatura (°C)</th>
                        <th>Humidade (%)</th>
                        <th>Pressão (Pa)</th>
                        <th>Vel. Vento (Km/h)</th>
                        <th>Dir. vento</th>
                        <th>Altitude (m)</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((dado, index) => (
                        <tr key={index}>
                            <td>{dado.leitura}</td>
                            <td>{new Date(dado.data).toLocaleString()}</td>
                            <td>{dado.temperatura}</td>
                            <td>{dado.humidade}</td>
                            <td>{dado.pressao}</td>
                            <td>{dado.velocidade}</td>
                            <td>{dado.direcao}</td>
                            <td>{dado.altitude}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

              {janelaAberta && (
                  <MiniJanela 
                      dados = {dadosSelecionados} dados2 = {dadosExtras}
                  />
              )}
    </>
      );
      
}

export default Grafico;

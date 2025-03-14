import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import ReactDOM from 'react-dom';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Grafico() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        async function fetchDados() {
            try {
                const resposta = await fetch("/api/dados"); // Agora esperamos um array de objetos JSON
                const dadosRecebidos = await resposta.json(); // Apenas pegamos a resposta direta
                console.log("Dados recebidos do backend:", dadosRecebidos);
                setDados(dadosRecebidos);
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
            }
        }
        fetchDados();
    }, []);

    // Se não houver dados, exibe carregando
    if (dados.length === 0) return <p>Carregando dados...</p>;

    // Organizar os dados para o Chart.js
    const labels = dados.map(d => new Date(d.data).toLocaleTimeString());
    const temperaturas = dados.map(d => d.temperatura);
    const humidades = dados.map(h => h.humidade);
    const pressao = dados.map(p => p.pressao);

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
                borderColor: "blue", // Cor diferente para umidade
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Pressão (Pa)",
                data: pressao,
                borderColor: "yellow", // Cor diferente para umidade
                borderWidth: 2,
                fill: false,
            },
        ],
    };
        // Manipular clique nos pontos do gráfico
        const handleClick = (event, elements) => {
            if (elements.length > 0) {
                const datasetIndex = elements[0].datasetIndex;
                const index = elements[0].index;
                const datasetLabel = data.datasets[datasetIndex].label;
                const value = data.datasets[datasetIndex].data[index];
                const time = data.labels[index];
    
                alert(`Você clicou em:\n${datasetLabel}: ${value}\nHorário: ${time}`);
            }
        };

        return <Line data={data} options={{ onClick: handleClick }} />;
}

export default Grafico;


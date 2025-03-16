import React from "react";

function MiniJanela({ dados, dados2}) {
    if (!dados) return null;

    if(dados2 == null){
        return (
            <div style={{
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -20%)",
                background: "white",
                padding: "20px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                borderRadius: "5px"
            }}>
                <h3>Detalhes do Dado</h3>
                <p><strong>Horário:</strong> {dados.time}</p>
                <p><strong>Tipo:</strong> {dados.label}</p>
                <p><strong>Valor:</strong> {dados.value}</p>
                <p style={{
                    textAlign: "center"
                }}>clique no ponto novamente para fechar</p>
            </div>
        );
    }
    else{
        return (
            <div style={{
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -20%)",
                background: "white",
                padding: "20px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                borderRadius: "5px"
            }}>
                <h3>Detalhes do Dado</h3>
                <p><strong>Horário:</strong> {dados.time}</p>
                <p><strong>Tipo:</strong> {dados.label}</p>
                <p><strong>Valor:</strong> {dados.value}</p>
                <p><strong>Direção:</strong> {dados2}</p>
                <p style={{
                    textAlign: "center"
                }}>clique no ponto novamente para fechar</p>
            </div>
        );
    }
    
}

export default MiniJanela;

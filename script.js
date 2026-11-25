const dados = {
  "Brasília": { estado:"Distrito Federal - Brasil", temp:20, desc:"Céu limpo", sensacao:22, umidade:81, vento:4, precip:0, uv:8.2, nascer:"05:31", por:"18:45" },
  "Florianópolis": { estado:"Santa Catarina - Brasil", temp:24, desc:"Parcialmente nublado", sensacao:26, umidade:75, vento:12, precip:0.2, uv:7.5, nascer:"06:10", por:"19:20" },
  "São Paulo": { estado:"São Paulo - Brasil", temp:22, desc:"Chuva leve", sensacao:23, umidade:88, vento:8, precip:1.5, uv:5.0, nascer:"06:05", por:"18:30" },
  "Rio de Janeiro": { estado:"Rio de Janeiro - Brasil", temp:28, desc:"Ensolarado", sensacao:30, umidade:65, vento:10, precip:0, uv:9.0, nascer:"05:50", por:"18:15" },
  "Salvador": { estado:"Bahia - Brasil", temp:29, desc:"Ensolarado", sensacao:31, umidade:70, vento:15, precip:0, uv:9.5, nascer:"05:40", por:"18:05" },
  "Porto Alegre": { estado:"Rio Grande do Sul - Brasil", temp:19, desc:"Nublado", sensacao:18, umidade:90, vento:6, precip:0.5, uv:4.0, nascer:"06:20", por:"19:00" },
};
function gerarPrevisao() {
  const diasSemana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
  let html = "";
  for(let i=0;i<10;i++){
    const data = new Date();
    data.setDate(data.getDate()+i);
    const dd = String(data.getDate()).padStart(2,'0');
    const mm = String(data.getMonth()+1).padStart(2,'0');
    let titulo = diasSemana[data.getDay()];
    if(i===0) titulo = "Hoje";
    if(i===1) titulo = "Amanhã";
    const max = 28 - (i%3);
    const min = 18 + (i%2);
    html += `<div class="dia"><b>${titulo}</b><br>${dd}/${mm}<br>☀️<br>Ensolarado<br><b>${max}° / ${min}°</b><br>💧 ${(i*5)%40}%</div>`;
  }
  document.getElementById('previsao').innerHTML = html;
}
function buscar(cidade){
  cidade = cidade.trim();
  if(cidade === ""){
    document.getElementById('aviso').style.display = "block";
    return;
  }
  document.getElementById('aviso').style.display = "none";
  document.getElementById('loading').style.display = "block";
  document.getElementById('resultado').style.display = "none";
  setTimeout(() => {
    document.getElementById('loading').style.display = "none";
    const info = dados[cidade] || dados["Brasília"];
    document.getElementById('nomeCidade').textContent = cidade;
    document.getElementById('estado').textContent = info.estado;
    document.getElementById('tempAtual').textContent = info.temp;
    document.getElementById('descricao').textContent = info.desc;
    document.getElementById('detalhes').innerHTML = `
      <div>Sensação<br><b>${info.sensacao}°C</b></div>
      <div>Umidade<br><b>${info.umidade}%</b></div>
      <div>Vento<br><b>${info.vento} km/h</b></div>
      <div>Precipitação<br><b>${info.precip} mm</b></div>
      <div>Índice UV<br><b>${info.uv}</b></div>
      <div>Sol<br><b>${info.nascer} / ${info.por}</b></div>`;
    document.getElementById('resultado').style.display = "block";
    gerarPrevisao();
  }, 800);
}
function buscarChip(cidade){
  document.getElementById('cidade').value = cidade;
  buscar(cidade);
}
document.getElementById('btnBuscar').addEventListener('click', () => {
  buscar(document.getElementById('cidade').value);
});
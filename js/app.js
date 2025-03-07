const today = document.getElementById('date').valueAsDate = new Date();

// Função para calcular total de horas
function calculateTotalTime() {
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    if (startTime && endTime) {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        
        let startTotalMinutes = startHour * 60 + startMinute;
        let endTotalMinutes = endHour * 60 + endMinute;
        
        if (endTotalMinutes >= startTotalMinutes) {
            let totalMinutes = endTotalMinutes - startTotalMinutes;
            let hours = Math.floor(totalMinutes / 60);
            let minutes = totalMinutes % 60;
            document.getElementById('total-time').innerHTML = `<h4> ${hours}h ${minutes}m </h4>`;
        } else {
            const texterror = document.getElementById('total-time');
            texterror.style.color = "#FA4000";
            texterror.style.font = 'bold';
            texterror.innerHTML = "Horário inválido";
        }
    }
}

document.getElementById('start-time').addEventListener('input', calculateTotalTime);
document.getElementById('end-time').addEventListener('input', calculateTotalTime);

// 🔹 Recupera os dados salvos no localStorage (se houver)
let savedData = JSON.parse(localStorage.getItem("bancoDeHoras")) || [];

// 🔹 Função para salvar os dados
function saveData() {
    const today = new Date().toISOString().split('T')[0];

    const date = document.getElementById('date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const totalTime = document.getElementById('total-time').innerText.trim();
    const notes = document.getElementById('notes').value;
    const input100 = document.getElementById('horas100');

    // Validando se é hora extra de 50% ou 100%
    const tipo = input100.checked ? "100%" : "50%";

    // Validando que todos os dados necessários estejam preenchidos
    if (!startTime || !endTime || totalTime === "Horário inválido" || totalTime === "") {
        swal({
            title: "Erro!",
            text: "Por favor, preencha os horários corretamente.",
            icon: "error",
            button: "Voltar",
        });
        return;
    }
    
    // Validando se já existe um registro para essa data
    if (savedData.some(entry => entry.date === date)) {
        swal({
            title: "Atenção!",
            text: "Já existe um registro para essa data.",
            icon: "warning",
            button: "Ok"
        });
        return;
    }
    
    // Validando se a Data escolhida não é maior do que a data atual
    if (date > today) {
        swal({
            title: "Data Incorreta!",
            text: "Não é possível registrar dados para uma data futura.",
            icon: "error",
            button: "Voltar"
        });
        return;
    }

    // Criando entrada de dados
    const entry = { date, startTime, endTime, totalTime, notes, tipo };
    savedData.push(entry);

    // 🔹 Atualiza o localStorage com os novos dados
    localStorage.setItem("bancoDeHoras", JSON.stringify(savedData));

    console.log("Dados salvos:", savedData);

    swal({
        title: "Dados salvos com sucesso!",
        icon: "success",
        button: "Ok"
    });

    // Atualiza a interface com os novos dados
    populandoData();
    // formatData(date);

    // 🔹 Limpa os campos após o submit
    document.getElementById('date').valueAsDate = new Date();
    document.getElementById('start-time').value = "";
    document.getElementById('end-time').value = "";
    document.getElementById('total-time').innerHTML = "";
    document.getElementById('notes').value = "";
    input100.checked = false;
}

// 🔹 Função para exibir os dados no HTML
function populandoData() {
    const container = document.querySelector('.container .row');
    container.innerHTML = ""; // Evita duplicações ao atualizar

    savedData.forEach(item => {
        const newBox = document.createElement('div');
        newBox.classList.add('col-12', 'col-md-6', 'col-lg-6');

        newBox.innerHTML = `
        <div class="box-text-banco">
            <div class="text-info">
                <p>DIA:</p>
                <span>${formatData(item.date)}</span>
            </div>
            <div class="text-info">
                <p>ENTRADA:</p>
                <span>${item.startTime}</span>
            </div>
            <div class="text-info">
                <p>SAÍDA:</p>
                <span>${item.endTime}</span>
            </div>
            <div class="motivo">
                <p class="title-motivo">
                    <span>Motivo:</span> 
                    <span class="tipo">${item.tipo}</span>
                </p>
                <p class="text-motivo">${item.notes}</p>
            </div>
            <div class="text-info">
                <p>TOTAL:</p>
                <span>${item.totalTime}</span>
            </div>
        </div>`;
        
        container.appendChild(newBox);
    });
}

// formatando as datas para aparecerem no modelo brasileiro
function formatData(date){
    const [ano, mes, dia] = date.split('-'); // Divide "aaaa-mm-dd"
    return `${dia}/${mes}/${ano}`; // Retorna "dd/mm/aaaa"
}

// 🔹 Carrega os dados ao iniciar a página
document.addEventListener("DOMContentLoaded", populandoData);

// Populando o HTML (Menu)
const hamburBtn = document.querySelector('.menu-hamburguer');
const boxMenu = document.querySelector('.menu-inline');
const closedMenu = document.querySelector('.x');
const menuEl = document.querySelector('.menu');
const iconSapn = document.querySelector('.bd');
const h5 = document.createElement('p');

hamburBtn.addEventListener('click', () => {
    menuEl.classList.add('menu-speed');
    boxMenu.classList.add('box-menu');
    hamburBtn.style.display = 'none';
    closedMenu.style.display = "block";

    iconSapn.innerHTML = '<i class="fa-solid fa-database"></i>';
    h5.innerText = "Banco de horas";
    iconSapn.appendChild(h5);
});

closedMenu.addEventListener('click', () => {
    closedMenu.style.display = "none";
    boxMenu.classList.remove('box-menu');
    hamburBtn.style.display = "flex";
    iconSapn.innerHTML = '';
});

// Direcionando para a página de banco de horas
document.querySelector('#banco-ancora').addEventListener('click', () => {
    document.getElementById('banco-dado').style.display = "block";
    document.querySelector('.main').style.display = "none";
});

// Criando um botão para voltar para Página inicial
document.getElementById('home').addEventListener('click', () => {
    document.getElementById('banco-dado').style.display = "none";
    document.querySelector('.main').style.display = "block";
    boxMenu.classList.remove('box-menu');
    hamburBtn.style.display = "flex";
    iconSapn.innerHTML = '';
});

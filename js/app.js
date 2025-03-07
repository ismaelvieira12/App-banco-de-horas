document.getElementById('date').valueAsDate = new Date();
// console.log(`dia:${dia.getDay()}/${dia.getMonth()}/${dia.getFullYear()}`);

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
            texterror.style.color="#FA4000";
            texterror.style.font='bold';
            texterror.innerHTML = "Horário inválido";
        }
    }
}

document.getElementById('start-time').addEventListener('input', calculateTotalTime);
document.getElementById('end-time').addEventListener('input', calculateTotalTime);

let savedData = [];

function saveData() {
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const totalTime = document.getElementById('total-time').innerText.trim(); // o innerText.trim() serve para pegar os dados da div ou span
    const notes = document.getElementById('notes').value;
    const input50 = document.getElementById('horas50');
    const input100 = document.getElementById('horas100');

    if(input50.checked && input100.checked){
        swal({
            title: "Erro!",
            text: "So pode selecionar um tipo de hora extra '50% OU 100%'.",
            icon: "error",
            button: "Voltar",
        });
        return;
    }


    //Validando que pelo menos um dos horários estejam selecionados
    if( !input50.checked && !input100.checked){
        swal({
            title: "Erro!",
            text: "Selecione pelo menos um tipo de hora extra '50% OU 100%'.",
            icon: "error",
            button: "OK",
        });
        return;
    }


    if (!startTime || !endTime || totalTime === "Horário inválido" || totalTime === "") {
        swal({
            title: "Erro!",
            text: "Por favor, preencha os horários corretamente.",
            icon: "error",
            button: "Voltar",
        });
        return;
    }
    
    if (savedData.some(entry => entry.date === date)) {
        swal({
            title: "Atenção!",
            text: "Já existe um registro para essa data.",
            icon: "warning",
            button: "Ok"
        });
        return;
    }
    
    
    const entry = { date, startTime, endTime, totalTime, notes };
    savedData.push(entry);
    console.log("Dados salvos:", savedData);
    swal({
        title: "Dados salvos com sucesso!",
        icon: "success",
        button: "Ok"
    });    

    populandoData(savedData);


    // 🔹 LIMPAR OS CAMPOS APÓS O SUBMIT 🔹
    document.getElementById('date').valueAsDate = new Date(); // Reseta para a data atual
    document.getElementById('start-time').value = "";
    document.getElementById('end-time').value = "";
    document.getElementById('total-time').innerHTML = ""; // Zera a exibição do total de horas
    document.getElementById('notes').value = "";
    input50.checked = false;
    input100.checked = false;
    
}
// .toLocaleDateString('pt-BR', {
//     //Formatando a data para o formato brasileiro.toLocaleDateString('pt-BR', {
//     day: '2-digit', // formata para dia
//     month: '2-digit', // formata para mês
//     year: 'numeric' // Formata para anos
// });

function populandoData(savedData){

    // Supondo que esses dados sejam retornados do console ou de algum lugar
    
    // Acessar o container onde você deseja adicionar os dados
    const container = document.querySelector('.container .row'); // A linha dentro do container
    
    // Criar um novo box de dados
    const newBox = document.createElement('div');
    newBox.classList.add('col-12', 'col-md-6', 'col-lg-6');
    

    const divBoxTextBanco = document.querySelector('.box-text-banco');
    divBoxTextBanco.classList.add("box-text-banco");

    newBox.innerHTML = `
        <div class="box-text-banco">
            <div class="text-info">
                <p>DIA:</p>
                <span>${savedData[0].date}</span>
            </div >
            <div class="text-info">
                <p>ENTRADA:</p>
                <span>${savedData[0].startTime}</span>
            </div>
            <div class="text-info">
                <p>SAÍDA:</p>
                <span>${savedData[0].endTime}</span>
            </div>
            <div class="motivo">
                <p>Motivo:</p>
                <p class="text-motivo">${savedData[0].notes}</p>
            </div>
            <div class="text-info">
                <p>TOTAL:</p>
                <span> ${savedData[0].totalTime}</span>
            </div>
        </div>
    `;
    
    // Adicionar o novo box no container
    container.appendChild(newBox);
}


// Populando o HTML
const hamburBtn = document.querySelector('.menu-hamburguer');
const boxMenu = document.querySelector('.menu-inline');
const closedMenu = document.querySelector('.x');
const menuEl = document.querySelector('.menu');
const iconSapn = document.querySelector('.bd');
const h5 = document.createElement('p');
hamburBtn.addEventListener('click', () => {
    menuEl.classList.add('menu-speed');
    boxMenu.classList.add('box-menu');
    hamburBtn.style.display='none';
    closedMenu.style.display="block";

    iconSapn.innerHTML = '<i class="fa-solid fa-database"></i>';
    h5.innerText = "Banco de horas";
    iconSapn.appendChild(h5);
});

closedMenu.addEventListener('click', () => {
    closedMenu.style.display="none";
    boxMenu.classList.remove('box-menu');
    hamburBtn.style.display="flex";
    iconSapn.innerHTML = '';
})




// Direcionando para a página de banco de horas

document.querySelector('#banco-ancora').addEventListener('click', () => {
    document.getElementById('banco-dado').style.display="block";
    document.querySelector('.main').style.display="none";
});

// Criando uma ancora para voltar para Página inicial
document.getElementById('home').addEventListener('click', () => {
    document.getElementById('banco-dado').style.display="none";
    document.querySelector('.main').style.display="block";
    boxMenu.classList.remove('box-menu');
    hamburBtn.style.display="flex";
    iconSapn.innerHTML = '';
});


// const input = document.getElementById('horas50');

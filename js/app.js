document.getElementById('date').valueAsDate = new Date();
        
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
                    document.getElementById('total-time').value = `${hours}h ${minutes}m`;
                } else {
                    document.getElementById('total-time').value = "Horário inválido";
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
            const totalTime = document.getElementById('total-time').value;
            const notes = document.getElementById('notes').value;
            
            if (!startTime || !endTime || totalTime === "Horário inválido") {
                alert("Por favor, preencha os horários corretamente.");
                return;
            }
            
            if (savedData.some(entry => entry.date === date)) {
                alert("Já existe um registro para essa data. Exclua os dados anteriores antes de cadastrar um novo horário.");
                return;
            }
            
            const entry = { date, startTime, endTime, totalTime, notes };
            savedData.push(entry);
            console.log("Dados salvos:", savedData);
            alert("Dados salvos com sucesso!");
        }
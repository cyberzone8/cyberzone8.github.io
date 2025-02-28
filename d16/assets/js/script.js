// Array inicial de tareas con nuevos campos: proyecto y prioridad
const tasks = [
    { id: 1, description: "Implementar primera funcionalidad MVP", proyecto: "software", prioridad: "alta", completed: false },
    { id: 2, description: "Revisar literatura para el capítulo 3", proyecto: "tesis", prioridad: "media", completed: false },
    { id: 3, description: "Practicar 20 minutos de listening en inglés", proyecto: "ingles", prioridad: "media", completed: false },
    { id: 4, description: "Revisar reporte mensual de ventas", proyecto: "empresas", prioridad: "alta", completed: false },
    { id: 5, description: "Preparar presentación para reunión semanal", proyecto: "trabajo", prioridad: "alta", completed: false },
];

// Tareas en modo enfoque (máximo 3)
const focusTasks = [null, null, null];

// Referencias a elementos del DOM
const taskInput = document.getElementById("taskInput");
const projectSelect = document.getElementById("projectSelect");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const projectStats = document.getElementById("projectStats");
const filterProject = document.getElementById("filterProject");
const filterPriority = document.getElementById("filterPriority");
const clearFilters = document.getElementById("clearFilters");
const focusList = document.getElementById("focusList");

// Renderizar tareas en la tabla según los filtros actuales
function renderTasks() {
    // Obtener valores de filtros
    const projectFilter = filterProject.value;
    const priorityFilter = filterPriority.value;
    
    // Filtrar tareas
    let filteredTasks = [...tasks];
    
    if (projectFilter !== "todos") {
        filteredTasks = filteredTasks.filter(task => task.proyecto === projectFilter);
    }
    
    if (priorityFilter !== "todas") {
        filteredTasks = filteredTasks.filter(task => task.prioridad === priorityFilter);
    }
    
    // Limpiar tabla
    taskList.innerHTML = "";
    
    // Renderizar tareas filtradas
    filteredTasks.forEach((task) => {
        const row = document.createElement("tr");
        
        // Aplicar clases según prioridad y estado
        if (task.completed) {
            row.classList.add("completada");
        } else if (task.prioridad === "alta") {
            row.classList.add("prioridad-alta");
        } else if (task.prioridad === "media") {
            row.classList.add("prioridad-media");
        }
        
        // Columna de ID
        const idCell = document.createElement("td");
        idCell.textContent = task.id;
        row.appendChild(idCell);
        
        // Columna de descripción
        const descCell = document.createElement("td");
        descCell.textContent = task.description;
        row.appendChild(descCell);
        
        // Columna de proyecto
        const proyectoCell = document.createElement("td");
        const indicadorProyecto = document.createElement("span");
        indicadorProyecto.classList.add("indicador-proyecto", `proyecto-${task.proyecto}`);
        proyectoCell.appendChild(indicadorProyecto);
        
        // Nombre del proyecto formateado
        let nombreProyecto = "";
        switch(task.proyecto) {
            case "software": nombreProyecto = "Software"; break;
            case "tesis": nombreProyecto = "Tesis"; break;
            case "ingles": nombreProyecto = "Inglés"; break;
            case "empresas": nombreProyecto = "Empresas"; break;
            case "trabajo": nombreProyecto = "Trabajo MT"; break;
            case "otro": nombreProyecto = "Otro"; break;
            default: nombreProyecto = "Sin asignar";
        }
        proyectoCell.appendChild(document.createTextNode(nombreProyecto));
        row.appendChild(proyectoCell);
        
        // Columna de prioridad
        const prioridadCell = document.createElement("td");
        prioridadCell.textContent = task.prioridad.charAt(0).toUpperCase() + task.prioridad.slice(1);
        row.appendChild(prioridadCell);
        
        // Columna de completado (checkbox)
        const completedCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("click", () => toggleTaskCompletion(task.id));
        completedCell.appendChild(checkbox);
        row.appendChild(completedCell);
        
        // Columna de acciones
        const actionsCell = document.createElement("td");
        
        // Botón para agregar a lista de enfoque (si no está completada)
        if (!task.completed) {
            const focusButton = document.createElement("button");
            focusButton.textContent = "⭐";
            focusButton.title = "Agregar a tareas de enfoque";
            focusButton.classList.add("focus");
            focusButton.addEventListener("click", () => addToFocus(task.id));
            actionsCell.appendChild(focusButton);
        }
        
        // Botón borrar
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => deleteTask(task.id));
        actionsCell.appendChild(deleteButton);
        
        row.appendChild(actionsCell);
        
        // Agregar fila a la tabla
        taskList.appendChild(row);
    });
    
    updateStats();
    updateFocusList();
}

// Agregar una nueva tarea
function addTask() {
    const description = taskInput.value.trim();
    const proyecto = projectSelect.value;
    const prioridad = prioritySelect.value;
    
    if (description === "") {
        alert("Por favor, ingresa una descripción para la tarea.");
        return;
    }
    
    if (proyecto === "") {
        alert("Por favor, selecciona un proyecto para la tarea.");
        return;
    }
    
    if (prioridad === "") {
        alert("Por favor, selecciona una prioridad para la tarea.");
        return;
    }
    
    const newTask = {
        id: Date.now(),
        description: description,
        proyecto: proyecto,
        prioridad: prioridad,
        completed: false,
    };
    
    tasks.push(newTask);
    
    // Limpiar formulario
    taskInput.value = "";
    projectSelect.selectedIndex = 0;
    prioritySelect.selectedIndex = 0;
    
    renderTasks();
}

// Borrar una tarea
function deleteTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
        // Eliminar de la lista de tareas
        tasks.splice(index, 1);
        
        // Eliminar de la lista de enfoque si está presente
        removeFromFocus(id);
        
        renderTasks();
    }
}

// Marcar una tarea como completada
function toggleTaskCompletion(id) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.completed = !task.completed;
        
        // Si se marca como completada, eliminar de la lista de enfoque
        if (task.completed) {
            removeFromFocus(id);
        }
        
        renderTasks();
    }
}

// Agregar tarea a la lista de enfoque
function addToFocus(id) {
    const task = tasks.find(task => task.id === id);
    if (!task || task.completed) return;
    
    // Buscar un espacio disponible
    const emptyIndex = focusTasks.findIndex(item => item === null);
    
    if (emptyIndex !== -1) {
        // Verificar si la tarea ya está en la lista de enfoque
        const existingIndex = focusTasks.findIndex(item => item && item.id === id);
        
        if (existingIndex !== -1) {
            alert("Esta tarea ya está en la lista de enfoque.");
            return;
        }
        
        focusTasks[emptyIndex] = task;
        updateFocusList();
    } else {
        alert("Ya tienes 3 tareas en la lista de enfoque. Elimina una para agregar otra.");
    }
}

// Eliminar tarea de la lista de enfoque
function removeFromFocus(id) {
    const index = focusTasks.findIndex(item => item && item.id === id);
    if (index !== -1) {
        focusTasks[index] = null;
        updateFocusList();
    }
}

// Actualizar la lista visual de tareas de enfoque
function updateFocusList() {
    const listItems = focusList.querySelectorAll("li");
    
    for (let i = 0; i < 3; i++) {
        const task = focusTasks[i];
        const item = listItems[i];
        
        if (task) {
            item.textContent = task.description;
            item.classList.remove("empty");
            
            // Agregar botón para eliminar
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "×";
            removeBtn.className = "remove-focus";
            removeBtn.style.marginLeft = "10px";
            removeBtn.style.border = "none";
            removeBtn.style.background = "none";
            removeBtn.style.color = "#dc3545";
            removeBtn.style.fontWeight = "bold";
            removeBtn.style.cursor = "pointer";
            
            removeBtn.addEventListener("click", function() {
                removeFromFocus(task.id);
            });
            
            item.appendChild(removeBtn);
        } else {
            item.textContent = "Sin tarea seleccionada";
            item.classList.add("empty");
        }
    }
}

// Actualizar estadísticas
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
    
    // Estadísticas por proyecto
    const proyectos = ["software", "tesis", "ingles", "empresas", "trabajo", "otro"];
    let statsHTML = "";
    
    proyectos.forEach(proyecto => {
        const tasksInProject = tasks.filter(task => task.proyecto === proyecto);
        const completedInProject = tasksInProject.filter(task => task.completed).length;
        const totalInProject = tasksInProject.length;
        
        if (totalInProject > 0) {
            let nombreProyecto = "";
            switch(proyecto) {
                case "software": nombreProyecto = "Software"; break;
                case "tesis": nombreProyecto = "Tesis"; break;
                case "ingles": nombreProyecto = "Inglés"; break;
                case "empresas": nombreProyecto = "Empresas"; break;
                case "trabajo": nombreProyecto = "Trabajo MT"; break;
                case "otro": nombreProyecto = "Otro"; break;
            }
            
            statsHTML += `<p><span class="indicador-proyecto proyecto-${proyecto}"></span> ${nombreProyecto}: ${completedInProject}/${totalInProject}</p>`;
        }
    });
    
    projectStats.innerHTML = statsHTML || "<p>No hay proyectos con tareas</p>";
}

// Limpiar filtros
function resetFilters() {
    filterProject.value = "todos";
    filterPriority.value = "todas";
    renderTasks();
}

// Guardar tareas en localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('focusTasks', JSON.stringify(focusTasks));
}

// Cargar tareas desde localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    const savedFocusTasks = localStorage.getItem('focusTasks');
    
    if (savedTasks) {
        tasks.length = 0; // Limpiar array actual
        tasks.push(...JSON.parse(savedTasks));
    }
    
    if (savedFocusTasks) {
        const loadedFocusTasks = JSON.parse(savedFocusTasks);
        for (let i = 0; i < 3; i++) {
            focusTasks[i] = loadedFocusTasks[i];
        }
    }
}

// Asociar eventos
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

filterProject.addEventListener("change", renderTasks);
filterPriority.addEventListener("change", renderTasks);
clearFilters.addEventListener("click", resetFilters);

// Guardar al cerrar/recargar
window.addEventListener('beforeunload', saveTasks);

// Cargar datos guardados e inicializar
loadTasks();
renderTasks();
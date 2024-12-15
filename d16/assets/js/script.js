// Array inicial de tareas
const tasks = [
    { id: 1, description: "Hacer mercado", completed: false },
    { id: 2, description: "Estudiar para la prueba", completed: false },
    { id: 3, description: "Sacar a pasear a Tobby", completed: false },
];

// Referencias a elementos del DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

// Renderizar tareas en la tabla
function renderTasks() {
    taskList.innerHTML = ""; // Limpiar lista
    tasks.forEach((task) => {
        const row = document.createElement("tr");

        // Columna de ID
        const idCell = document.createElement("td");
        idCell.textContent = task.id;
        row.appendChild(idCell);

        // Columna de descripción
        const descCell = document.createElement("td");
        descCell.textContent = task.description;
        row.appendChild(descCell);

        // Columna de completado (checkbox)
        const completedCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("click", () => toggleTaskCompletion(task.id));
        completedCell.appendChild(checkbox);
        row.appendChild(completedCell);

        // Columna de acciones (botón borrar)
        const actionsCell = document.createElement("td");
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
}

// Agregar una nueva tarea
function addTask() {
    const description = taskInput.value.trim();
    if (description === "") {
        alert("Por favor, ingresa una descripción para la tarea.");
        return;
    }
    const newTask = {
        id: Date.now(), // Generar ID único
        description: description,
        completed: false,
    };
    tasks.push(newTask); // Agregar al arreglo
    taskInput.value = ""; // Limpiar el input
    renderTasks(); // Actualizar lista
}

// Borrar una tarea
function deleteTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1); // Eliminar del arreglo
        renderTasks(); // Actualizar lista
    }
}

// Marcar una tarea como completada
function toggleTaskCompletion(id) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.completed = !task.completed; // Alternar estado
        renderTasks(); // Actualizar lista
    }
}

// Actualizar estadísticas
function updateStats() {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter((task) => task.completed).length;
}

// Asociar eventos
addTaskButton.addEventListener("click", addTask);

// Renderizar tareas iniciales
renderTasks();

document.addEventListener("DOMContentLoaded", function () {
    // Lista de tareas
    const taskList = document.querySelector("#todolist");
    const taskInput = document.querySelector("#newTask");
    const btnAgregar = document.querySelector("#addTask");
    const taskQuantity = document.querySelector("#taskQuantity");

    // Coloco el arreglo inicial
    let todolist = [
        { id: 1, task: "Hacer las compras", state: true },
        { id: 2, task: "Bañar al perro", state: true },
        { id: 3, task: "Salir a correr", state: true }
    ];

    // Evento del botón para agregar tareas
    btnAgregar.addEventListener("click", () => {
        const taskName = taskInput.value;
        const newId = todolist.length > 0 ? Math.max(...todolist.map(task => task.id)) + 1 : 1;
        todolist.push({ id: newId, task: taskName, state: false });

        taskInput.value = "";
        renderTodolist();
    });

    // Método Filter: devuelve un arreglo nuevo con lo que estoy filtrando, en este caso cuando el estado de la tarea es true
    function filterTasks() {
        return todolist.filter(a => a.state == true);
    }

// Mostrar tareas iniciales
function renderTodolist() {
    let html = "";
    let completedTasks = 0; // Contador para tareas realizadas

    for (let x of todolist) {
        html += `<tr>
        <td>${x.id}</td>
        <td>${x.task}</td>
        <td><input type="checkbox" ${x.state ? 'checked' : ''} onchange="cambiarEstado(${x.id}, this.checked)"></td>
        <td><button onclick="borrar(event)">Eliminar</button></td>
    </tr>`;
    

        if (x.state) {
            completedTasks++; // Incrementa el contador si la tarea está realizada
        }
    }

    // Limpia el contenido del tbody antes de agregar las nuevas filas
    const tbody = document.querySelector("#todolist tbody");
    tbody.innerHTML = html;

    // Actualizar la cantidad de tareas
    taskQuantity.textContent = `Total: ${todolist.length}`;
    // Actualizar la cantidad de tareas realizadas
    document.getElementById("taskMade").textContent = `Realizadas: ${completedTasks}`;
}

    // Función para cambiar el estado de una tarea
    function cambiarEstado(id, checked) {
        let task = todolist.find(item => item.id === id);
        if (task) {
            task.state = checked;
            renderTodolist();
        }
    }

 // Función para borrar una tarea
function borrar(event) {
    const button = event.target;
    const row = button.closest('tr'); // Encuentra la fila más cercana al botón clicado
    const id = parseInt(row.querySelector('td:first-child').textContent, 10);

    todolist = todolist.filter(item => item.id !== id);
    renderTodolist();
}

    // Renderizar la lista inicial
    renderTodolist();
});

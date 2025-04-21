function fetchTasks() {
    fetch('/tasks')
      .then(res => res.json())
      .then(tasks => {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach(task => {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.innerHTML = `
            <span contenteditable="true" onblur="updateTask(${task.id}, this.textContent)">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">&times;</button>
          `;
          taskList.appendChild(li);
        });
      });
  }
  
  function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text) {
      fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      }).then(() => {
        input.value = "";
        fetchTasks();
      });
    }
  }
  
  function updateTask(id, text) {
    fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    }).then(fetchTasks);
  }
  
  function deleteTask(id) {
    fetch(`/tasks/${id}`, { method: 'DELETE' }).then(fetchTasks);
  }
  
  window.onload = fetchTasks;
  
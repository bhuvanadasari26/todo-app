const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// Sounds
const addSound = document.getElementById("addSound");
const deleteSound = document.getElementById("deleteSound");
const completeSound = document.getElementById("completeSound");

// Load tasks
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task.text, task.completed));
};

// Add task
addBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;

  createTask(text, false);
  addSound.play();
  saveTasks();
  input.value = "";
};

// Create task
function createTask(text, completed) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  if (completed) span.classList.add("completed");

  span.onclick = () => {
    span.classList.toggle("completed");
    completeSound.play();
    saveTasks();
  };

  const del = document.createElement("span");
  del.textContent = "❌";
  del.className = "delete-btn";

  del.onclick = () => {
    li.style.transform = "scale(0)";
    deleteSound.play();
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 300);
  };

  li.appendChild(span);
  li.appendChild(del);
  list.appendChild(li);
}

// Save tasks
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    const text = li.children[0].textContent;
    const completed = li.children[0].classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// PARTICLES
const particles = document.querySelector(".particles");

for (let i = 0; i < 40; i++) {
  const span = document.createElement("span");
  span.style.left = Math.random() * 100 + "%";
  span.style.animationDuration = (5 + Math.random() * 10) + "s";
  particles.appendChild(span);
}

// CURSOR GLOW
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
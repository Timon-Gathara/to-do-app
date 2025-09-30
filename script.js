const input = document.getElementById("newTodo"); 
const addBtn = document.getElementById("addBtn"); 
const list = document.getElementById("todoList"); 
const count = document.getElementById("count"); 
const clearBtn = document.getElementById("clearCompleted"); 
const themeBtn = document.getElementById("toggleTheme");
 let filter = "all";

 function updateCount() { 
    const itemsLeft = [...list.children].filter( (li) => !li.classList.contains("completed") ).length; count.textContent = `${itemsLeft} items left`;
 } 

 function addTodo(text) {
     if (!text.trim()) return; 
     const li = document.createElement("li"); 
     li.draggable = true; li.innerHTML = ` <span>${text}</span> <div> <button class="done">✔</button> <button class="delete">✖</button> </div> `;
      list.appendChild(li); updateCount(); input.value = ""; 
 addDragAndDrop(li);
     applyFilter(); 
 }

 addBtn.addEventListener("click", () => addTodo(input.value));
  input.addEventListener("keypress", (e) => { if (e.key === "Enter") addTodo(input.value); });
  list.addEventListener("click", (e) => { if (e.target.classList.contains("delete")) { e.target.closest("li").remove();
   } 
   else if (e.target.classList.contains("done")) { e.target.closest("li").classList.toggle("completed");

    } updateCount(); });
     clearBtn.addEventListener("click", () => { [...list.children] .filter((li) => li.classList.contains("completed")) .forEach((li) => li.remove()); updateCount();

      });
      // Filter
      document.querySelectorAll("[data-filter]").forEach((btn) => { btn.addEventListener("click", () => { filter = btn.dataset.filter; [...list.children].forEach((li) => { if (filter === "all") { li.style.display = "flex";

      } 
      else if (filter === "active" && li.classList.contains("completed")) 
        { li.style.display = "none"; } else if (filter === "completed" && !li.classList.contains("completed")) { li.style.display = "none";

         } 
         else { li.style.display = "flex";

          } });
         }); 
        });

        // Theme toggle
        themeBtn.addEventListener("click", () => { document.body.classList.toggle("dark");
            themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙"; });
             // Drag and Drop 
             let dragged; list.addEventListener("dragstart", (e) => { dragged = e.target; e.target.style.opacity = 0.5; 

             }); list.addEventListener("dragend", (e) => { e.target.style.opacity = ""; }); 
             list.addEventListener("dragover", (e) => { e.preventDefault(); 
                const target = e.target.closest("li"); if (target && target !== dragged) { const rect = target.getBoundingClientRect(); const next = e.clientY - rect.top > rect.height / 2; list.insertBefore(dragged, next ? target.nextSibling : target); } });
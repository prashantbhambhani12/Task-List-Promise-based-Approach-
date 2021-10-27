import * as ev from "./events.js";
import * as fn from "./functions.js";

ev.createContainer(".taskBody")
  .then((res) => {
    ev.handleEvent(".taskInput", "keyup", (e) => fn.submitForm(e)); //Start point(Module)
  })
  .then(() => {
    document.querySelector("#taskForm").addEventListener("submit", (e) => {
      e.preventDefault();
      let taskInput = document.querySelector(".taskInput");
      if (taskInput.value.length) {
        document.querySelector(".taskBody").innerHTML += `
               <tr class="row mx-auto w-100 position-relative">
               <td class="col-12 mx-auto">
               <div class="form-group position-relative" >
               <input class="form-control border-0 shadow-none taskList rounded-0" readonly value="${taskInput.value}">
               <button class="btn btn-sm delBtn px-3 position-absolute end-0 top-50 translate-middle rounded shadow-none">Delete</button>
               </div>
               </td>
               </tr>
               `;
        document.forms.taskForm.reset();
        taskInput.focus();
      } else {
        alert("This field can't be empty");
        return false;
      }
    });
  })
  .then(() => {
    let taskBody = document.querySelector(".taskBody");
    let observeChanges = new MutationObserver((changes) => {
      taskBody.querySelectorAll("tr").forEach((v) => {
        ev.handleEvent(".taskList", "click", (e) => {
          e.stopImmediatePropagation();
          fn.changeTargetStyle(e.target, "striked");
        });

        ev.handleEvent(".delBtn", "click", (e) => {
          e.stopImmediatePropagation();
          fn.changeTargetStyle(
            e.target.parentElement.parentElement.parentElement,
            "hide"
          );
          setTimeout(() => {
            e.target.parentElement.parentElement.parentElement.remove();
          }, 500);
        });
      }, observeChanges);
    });
    observeChanges.observe(taskBody, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  })
  .then(() => {
    let taskBody = document.querySelector(".taskBody");

    ev.handleEvent(".clearBtn", "click", (e) => {
      e.stopImmediatePropagation();
      if (document.querySelectorAll(".taskList").length) {
        fn.changeTargetStyle(
          e.target.previousElementSibling.querySelector(".taskBody"),
          "hide"
        );
      }

      setTimeout(() => {
        taskBody.innerHTML = "";
        taskBody.classList.remove("hide");
      }, 500);
    });
  });

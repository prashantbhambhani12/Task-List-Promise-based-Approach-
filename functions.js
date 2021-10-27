/*Function that Strikes through the task onclick(as if its done) */
let changeTargetStyle = (event, clasName) => {
  event.classList.contains(clasName)
    ? event.classList.remove(clasName)
    : event.classList.add(clasName);
};

let submitForm = (e) => {
  if (e.key == 13) {
    document.querySelector("#taskForm").submit();
  }
};

export { submitForm, changeTargetStyle };

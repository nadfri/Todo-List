window.onload = function () {


  newTache.onclick = () => { add(); };
  input.onkeyup = () => { if (event.keyCode == 13) add(); };



  const add = () => {
    if (input.value == "") {

      divControl.innerHTML =
        "<i>Tâche vide, rien n'a été ajouté à votre liste...</i>";
      divControl.style.backgroundColor = "pink";
      divControl.className = "effects";

      clearEffects();

    } else {
      const date = new Date();
      let day = (date.getDay() < 10) ? "0" + date.getDay() : date.getDay();
      let month = (date.getMonth() < 10) ? "0" + date.getMonth() : date.getMonth();
      let hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
      let minute = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
      const dateNow = `${day}/${month}/${date.getFullYear()} à ${hour}:${minute}`;

      divControl.innerHTML = "<i>Tâche ajoutée avec succès!</i> ";
      divControl.style.backgroundColor = "#bbf7ca";
      divControl.className = "effects";

      fieldset.appendChild(document.createElement("p")).innerHTML = `${done} ${input.value} 
                                                              <span class='tab'><i> Ajouté le: ${dateNow}</i></span> 
                                                              ${options}`;
      input.value = "";
      input.focus();

      clearEffects();
    }

  };

  const clearEffects = () => {
    setTimeout(() => {
      divControl.style.display = "none";
      divControl.style.display = "";
      divControl.innerHTML = "";
      divControl.style.backgroundColor = ""
    }, 5000);
  };


  const done = `<span id='done'>✔️</span>`;
  const options = `<span id='urgent' class='options'>⭐</span>
                   <span id='delete' class='options'>❌</span>`;




}
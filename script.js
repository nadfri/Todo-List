/***********************Start of window.onload*****************************************/
window.onload = function () {

  const check        = `<span class = 'check options' 
                        title = 'Cliquez ici si cette tâche est terminée'>✔️</span>`;

  const urgent       = `<span class = 'urgent options'
                        title = 'Cliquer ici si la tâche est urgente'>⭐</span>`;

  const del          = `<span class = 'del options'
                        title = 'Cliquez ici pour supprimer une tâche'>❌</span>`;

  const task_empty   = "<i>Tâche vide, rien n'a été ajouté à votre liste...</i>";
  const task_success = "<i>Tâche ajoutée avec succès!</i>";
  const task_delete  = "<i>Tâche supprimée avec succès!</i>";
  const task_history = "<i>Félicitations! tâche deplacée dans l'historique...</i>";

/************************Add New Task*******************/
  input.onkeyup = () => 
  { 
    if (event.keyCode == 13) //Confirm with ENTRY key (13)
    {
      if (input.value == "") divControlEffects(task_empty, "pink");
      
      else
      {
        divControlEffects(task_success, "#BBF7CA");

        fieldsetTask.appendChild(document.createElement("p")).innerHTML = `${check} <z>${input.value}</z> 
                                    <span class='tab'>
                                      <i>Ajouté le: ${dateNow()}</i> ${urgent}${del}
                                    </span>`;
        input.value = "";
        input.focus();
      }
    }

  };

 /**********************Add a date of Task**********************/
  const dateNow = () => { //return date in the good format
    const date = new Date();
    let day    = (date.getDate()        < 10) ? "0" + date.getDate() : date.getDate();
    let month  = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let hour   = (date.getHours()       < 10) ? "0" + date.getHours() : date.getHours();
    let minute = (date.getMinutes()     < 10) ? "0" + date.getMinutes() : date.getMinutes();
    return `${day}/${month}/${date.getFullYear()} à ${hour}:${minute}`;
  };

  /****************************Div Effects**********************************************/
  const divControlEffects = (text, color) =>{
    divControl.style.display         = "none";
    divControl.style.display         = "";
    divControl.innerHTML             = text;
    divControl.style.backgroundColor = color;
    divControl.classList.add("effects");

    setTimeout(() => {
      divControl.innerHTML             = "";
      divControl.style.backgroundColor = "";
      divControl.classList.remove("effects");
    }, 3000);    
  };

  /*****************************Delete Task*********************************************/

  function deleteTask(element,text,color)
  {
    element.target.closest("p").classList.add("effectsOut");
    setTimeout(() => {element.target.closest("p").remove();},500);
    divControlEffects(text, color);
  }

  /******************************Running of options for the Task*************************/
    fieldsetTask.onclick = (element) =>
    {
        if (element.target.classList.contains("del"))
        {
          deleteTask(element, task_delete, "pink");
        }

        else if (element.target.classList.contains("urgent"))
          element.target.style.opacity = (element.target.style.opacity != "1") ? "1" : "0.3";
          

        else if (element.target.classList.contains("check"))
        {
          const regex = /<z>(.*)<\/z>/; //use false balise <z> to catch the text of Task
          let textTask = element.target.closest("p").innerHTML.match(regex)[0];
          fieldsetHist.appendChild(document.createElement("p")).innerHTML = `${textTask}
                              <span class='tab2'>
                                <i>Fait le: ${dateNow()}</i> ${del}
                              </span>`;

          element.target.innerHTML =""; //del check button faster to avoid bug in historic
          deleteTask(element,task_history,"#BBF7CA");
        }

    };

  /***************************Delete Task on Historic**********************************/
    fieldsetHist.onclick = (element) =>
    {
      if (element.target.classList.contains("del"))
        deleteTask(element, task_delete, "pink");
    };

   /********************Display of Historic***********************/
   btHistoric.onclick = () =>{
    
    if(btHistoric.textContent    == "Historique")
    {
      fieldsetTask.style.display = "none";
      fieldsetHist.style.display = "block";
      btHistoric.textContent     = "Tâches";
      input.disabled             = true;
      input.placeholder          = "Cliquez sur Tâches pour revenir à la liste en cours...";

    }

    else
    {
      fieldsetTask.style.display = "";
      fieldsetHist.style.display = "none";
      btHistoric.textContent     = "Historique";
      input.disabled             = false;
      input.placeholder          = "Ajouter une nouvelle tâche (Ex: Faire mes courses)";
      input.focus();
      
    }
  };
  
  btSave.onclick = () =>
  {
    let save = {
      listeTask: fieldsetTask.innerHTML,
      listHistoric: fieldsetHist.innerHTML,
    };
    localStorage.setItem("save", JSON.stringify(save));
  };

  btLoad.onclick =() =>
  {
    let save = JSON.parse(localStorage.getItem('save'));
    fieldsetTask.innerHTML = save.listeTask;
    fieldsetHist.innerHTML = save.listHistoric;
  };

  btClear.onclick =() => 
  {
    if(confirm("Ceci va effacer votre sauvegarde et vos saisies en cours\nEtes vous sûre?"))
    {    
      localStorage.clear();
      fieldsetTask.innerHTML = "<legend>Liste des Tâches:</legend>";
      fieldsetHist.innerHTML = "<legend>Historique:</legend>";
    }

  };













/*************************End of window.onload***************************************/
}
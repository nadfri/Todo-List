/***************************Start of window.onload*****************************************/
window.onload = function () {
  "use strict";
/***************************Globlal Variables**********************************************/
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
  const task_save    = "<i>Données sauvegardées avec succès!</i>";
  const task_load    = "<i>Données chargées avec succès!</i>";
  const task_loadErr = "<i>Aucune données à charger...</i>";
  const task_clear   = "<i>Toutes les données ont été supprimées</i>";

  let elementBeforeDrag; //use like a temp for the drag n drop
 
/*****************************Add New Task*************************************************/
  input.onkeyup = () => 
  { 
    if (event.keyCode == 13) //Confirm with ENTRY key (13)
    {
      if (input.value == "") divControlEffects(task_empty, "pink");
      
      else
      {
        divControlEffects(task_success, "#BBF7CA");

        const p = document.createElement("p");
        p.classList.add("draggable");
        p.draggable = true;

        if (navigator.userAgent.indexOf("Mobile") !=-1)
          fieldsetTask.appendChild(p).innerHTML = `${check} <z>${input.value}</z> 
            <span class='tab'>${urgent}${del}</span>`;
        else
          fieldsetTask.appendChild(p).innerHTML = `${check} <z>${input.value}</z> 
          <span class='tab'><i>Ajouté le: ${dateNow()}</i> ${urgent}${del}
          </span>`;

        input.value = "";
        input.focus();

        dragNDrop(p);
      }
    }

  };

/*******************************Add a date of Task****************************************/
  const dateNow = () => { //return date in the good format
    const date  = new Date;


    if (navigator.userAgent.indexOf("Mobile") !=-1)
      return Intl.DateTimeFormat().format(date); //only date
    else
      return Intl.DateTimeFormat("fr-FR",{day: "numeric", month: "numeric", year:"numeric", 
                                          hour:"numeric", minute:"numeric"}).format(date);
  };                                    // date + time

/********************************Div Effects**********************************************/
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

/********************************Delete Task*********************************************/
  const deleteTask = (element,text,color) =>
  {
    element.target.closest("p").classList.add("effectsOut");
    setTimeout(() => {element.target.closest("p").remove();},500);
    divControlEffects(text, color);
  };

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

      if (navigator.userAgent.indexOf("Mobile") !=-1)
        fieldsetHist.appendChild(document.createElement("p")).innerHTML = `✔️${textTask}
        <span class='tab2'>${del}</span>`;

      else
        fieldsetHist.appendChild(document.createElement("p")).innerHTML = `✔️${textTask}
        <span class='tab2'><i>Fait le: ${dateNow()}</i> ${del}</span>`;

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

/********************Display of Historic*************************************/
  btHistoric.onclick = () =>
  {
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

/***************************WebStorage***************************************/
  btSave.onclick = () =>
  {
    const save = 
    {
      listeTask: fieldsetTask.innerHTML,
      listHistoric: fieldsetHist.innerHTML,
    };

    localStorage.setItem("save", JSON.stringify(save));
    divControlEffects(task_save, "green");
  };

  btLoad.onclick =() =>
  {
    if(localStorage.getItem('save'))
    {
      const save = JSON.parse(localStorage.getItem('save'));
      fieldsetTask.innerHTML = save.listeTask;
      fieldsetHist.innerHTML = save.listHistoric;
      divControlEffects(task_load, "orange");
    }
    else divControlEffects(task_loadErr, "pink");
  };

  btClear.onclick =() => 
  {
    if(confirm("Ceci va effacer votre sauvegarde et vos saisies en cours\nEtes vous sûre?"))
    {    
      localStorage.clear();
      fieldsetTask.innerHTML = "<legend>Liste des Tâches:</legend>";
      fieldsetHist.innerHTML = "<legend>Historique:</legend>";
      divControlEffects(task_clear, "red");
    }
  };

/******************************Drag and Drop****************************************/
  const dragNDrop = (element) => 
  {
    element.ondragstart     = event =>
    { //event is dragstart
      elementBeforeDrag     = element; //save the element before change 
      element.style.opacity = '0.4';
      event.dataTransfer.setData('text/html', element.innerHTML);
    };
  
    element.ondrop = event =>
    {
      elementBeforeDrag.innerHTML = element.innerHTML;
      element.innerHTML           = event.dataTransfer.getData('text/html');
      element.classList.remove('dragEffects');
    };
  
    element.ondragenter  = ()      => element.classList.add   ('dragEffects');
    element.ondragleave  = ()      => element.classList.remove('dragEffects');
    element.ondragover   = event   => event.preventDefault(); // to enabled drop
    element.ondragend    = ()      => element.style.opacity = "1";
  
  };
  
  
/*************************End of window.onload***************************************/
}
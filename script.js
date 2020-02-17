/********************Functions to use on elements created by JS*************************/
const divControlEffects = (text, color) =>{
  divControl.style.display         = "none";
  divControl.style.display         = "";
  divControl.innerHTML             = text;
  divControl.style.backgroundColor = color;
  divControl.className             = "effects";

  setTimeout(() => {
    divControl.innerHTML             = "";
    divControl.style.backgroundColor = "";
    divControl.className             = "";
  }, 3000); 
};

const task_delete  = "<i>Tâche supprimée avec succès!</i>";
const task_history = "<i>Félicitations! tâche deplacée dans l'historique...</i>";
/********************************************************************/
const setUrgent = (element) => {
  element.style.opacity = (element.style.opacity != "1") ? "1" : "0.3";
};

/********************************************************************/
const deleteTask =(element,text,color)=>{
  element.parentNode.className = "effectsOut";
  setTimeout(() => {element.parentNode.remove();},1000);
  divControlEffects(text, color);

};

/********************************************************************/
const saveTask = (element) => {

  const del    = `<span class ='options' onclick="deleteTask(this,task_delete,'pink')"
                   title ='Cliquez ici pour supprimer une tâche'>❌</span>`;

  const dateNow = () => { //return date in the good format
    const date = new Date();
    let day    = (date.getDate()        < 10) ? "0" + date.getDate() : date.getDate();
    let month  = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let hour   = (date.getHours()       < 10) ? "0" + date.getHours() : date.getHours();
    let minute = (date.getMinutes()     < 10) ? "0" + date.getMinutes() : date.getMinutes();
    return `${day}/${month}/${date.getFullYear()} à ${hour}:${minute}`;
  };

  const regex = /<z>(.*)<\/z>/; //use false balise <z> to catch the text of Task
  let textTask = element.parentNode.innerHTML.match(regex)[0];
  fieldsetHist.appendChild(document.createElement("p")).innerHTML = `${textTask}
                              <span class='tab'>
                                <i>Fait le: ${dateNow()}</i>
                              </span>
                              ${del}`;
 

  deleteTask(element,task_history,"#BBF7CA");
};

/***********************Start of window.onload*****************************************/
window.onload = function () {

  const check        = `<span class = 'options' onclick="saveTask(this)"  
                        title = 'Cliquez ici si cette tâche est terminée'>✔️</span>`;
  const urgent       = `<span class = 'options' onclick="setUrgent(this)" 
                        title = 'Cliquer ici si la tâche est urgente'>⭐</span>`
  const del          = `<span class = 'options' onclick="deleteTask(this,task_delete,'pink')"
                        title = 'Cliquez ici pour supprimer une tâche'>❌</span>`;

  const task_empty   = "<i>Tâche vide, rien n'a été ajouté à votre liste...</i>";
  const task_success = "<i>Tâche ajoutée avec succès!</i>";
  const task_delete  = "<i>Tâche supprimée avec succès!</i>";
  const task_history = "<i>Félicitations! tâche deplacée dans l'historique...</i>";

/*******************************************/
  input.onkeyup = () => { if (event.keyCode == 13) add(); };

  const add = () => {
    if (input.value == "") divControlEffects(task_empty, "pink");
      
    else
    {
      divControlEffects(task_success, "#BBF7CA");

      fieldsetTask.appendChild(document.createElement("p")).innerHTML= `${check} <z>${input.value}</z> 
                                    <span class='tab'>
                                      <i>Ajouté le: ${dateNow()}</i>
                                    </span>
                                    ${urgent}${del}`;
      input.value = "";
      input.focus();
    }

  };

 /********************************************/
  const dateNow = () => { //return date in the good format
    const date = new Date();
    let day    = (date.getDate()        < 10) ? "0" + date.getDate() : date.getDate();
    let month  = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let hour   = (date.getHours()       < 10) ? "0" + date.getHours() : date.getHours();
    let minute = (date.getMinutes()     < 10) ? "0" + date.getMinutes() : date.getMinutes();
    return `${day}/${month}/${date.getFullYear()} à ${hour}:${minute}`;
  };

  /*******************************************/
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

  /*******************************************/
  const divControlEffects = (text, color) =>{
    divControl.style.display         = "none";
    divControl.style.display         = "";
    divControl.innerHTML             = text;
    divControl.style.backgroundColor = color;
    divControl.className             = "effects";

    setTimeout(() => {
      divControl.innerHTML             = "";
      divControl.style.backgroundColor = "";
      divControl.className             = "";
    }, 3000);    
  };



/*************************End of window.onload***************************************/
}
const formID = document.querySelector(".task-edit-id");
const formNAME = document.querySelector(".task-edit-name");

//55. タスクの名前を編集してみよう
const formCONTAINER = document.querySelector(".container");
const formALERT = document.querySelector(".form-alert");

//56. 完了・未完了状態を編集してみよう
const formCOMPLETED = document.querySelector(".task-edit-completed");

//53. 編集中のタスクIDを取得してみよう
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

//54. タスクIDを使って特定のタスクを１つだけ取得して表示しよう

const showTask = async ()=> {
    try{
        const response = await axios.get(`/api/v1/tasks/${id}`);
        const { data: task } = response;      //dataオブジェクトのみを task に入れる
        const { _id, name , completed } = task;           //dataオブジェクトの _id と name だけを取り出す
        console.log({_id, name, completed});
        
        formID.textContent = _id;
        formNAME.value = name;
        //58. 編集画面のバグ修正
        formCOMPLETED.checked = completed;
      } catch (error){
        console.log(error);
      }
}

showTask();

//55. タスクの名前を編集してみよう
formCONTAINER.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const id = formID.textContent;
  const text = formNAME.value;
  const checkcomp = formCOMPLETED.checked;

  // console.log(text);
  // console.log(id);

  try {
    const response = await axios.patch(`/api/v1/tasks/${id}`, {
      name:text , 
      completed:checkcomp
    });
    console.log(response);
    formALERT.style.display = "block";
    formALERT.textContent = "編集に成功しました";
    formALERT.classList.add("text-success");

  } catch (error){
    console.log(error);
  }

  setTimeout(()=> {
    formALERT.style.display = "none";
  },3000);

});
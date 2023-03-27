const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const formINPUT = document.querySelector(".task-input");
const formALERT = document.querySelector(".form-alert");


//データを１つずつ取り出してHTMLに出力してみよう  46
const showTasks = async function getUser() {
  try {
    const { data: tasks } = await axios.get('/api/v1/tasks');

    //データ取得のエラーハンドリングをしてみよう  49
    if (tasks.length < 1){
      tasksDOM.innerHTML = `
          <h5 "class="emplity-list">No records found.</h5>
      `;
      return;
    }

    const allTasks = tasks.map((task) => {
      const { completed, _id, name } = task;

      return `<div class="single-task ${completed && "task-completed"}">
                <h5>
                  <span><i class="fas fa-check-circle"></i></span>${name}
                </h5>
                <div class="task-links">
                  <!-- Edit -->
                  <!-- 52. 特定のタスクの編集ページを指定して遷移させよう -->
                  <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                  </a>
                  <!-- Delete -->
                  <a type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                  </a>
                </div>
              </div>`;
    });
      console.log(allTasks);
      tasksDOM.innerHTML = allTasks.join('');
    } catch (error) {
      console.log(error);
    }
  };


//初回実行時に表示させる
showTasks();



//axiosを使ってクライアントサイドからデータを作成してみよう  47
formDOM.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = formINPUT.value;

  try{
    const response = await axios.post('/api/v1/tasks', { name: text });
    console.log(response.data);
    showTasks();
    formINPUT.value = "";
    //50. データ作成のエラーハンドリングをしてみよう
    formALERT.style.display = "block";
    formALERT.textContent = "タスクが追加されました";
    formALERT.classList.add("text-success");
  } catch (error){
    console.log(error);
    //50. データ作成のエラーハンドリングをしてみよう
    formALERT.style.display = "block";
    formALERT.innerHTML = "20文字を超えています";
  }
  //50. データ作成のエラーハンドリングをしてみよう
  setTimeout(() =>{
    formALERT.style.display = "none";
  }, 3000);
  
});


//axiosを使ってクライアントサイドからデータを削除してみよう 48
tasksDOM.addEventListener('click', async (event) => {
  const element = event.target;
  console.log(element.parentElement);
  if(element.parentElement.classList.contains("delete-btn")){
    const id = element.parentElement.getAttribute("data-id");
    console.log(id)
    try{
      const response = await axios.delete(`/api/v1/tasks/${id}`);
      console.log(response.data);
      showTasks();
    } catch (error){
      console.log(error);
    }
  }
});

// //51. Todoタスク編集ページを作成しよう
// tasksDOM.addEventListener('click', async (event) => {
//   const element = event.target;
//   console.log(element.parentElement);
//   if(element.parentElement.classList.contains("edit-link")){
//     location.href = "edit.html";
//   }
// });
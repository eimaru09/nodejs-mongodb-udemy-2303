const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const formINPUT = document.querySelector(".task-input");


//データを１つずつ取り出してHTMLに出力してみよう  46
const showTasks = async function getUser() {
  try {
    const { data: tasks } = await axios.get('/api/v1/tasks');

    const allTasks = tasks.map((task) => {
      const { completed, _id, name } = task;
      return `<div class="single-task">
                <h5><span><i class="fas fa-check-circle"></i></span>${name}</h5>
                <div class="task-links">
                  <!-- Edit -->
                  <a href="#" class="edit-link">
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
  } catch (error){
    console.log(error);
  }
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


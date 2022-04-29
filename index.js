let input = document.querySelector("#text");
let ul = document.querySelector("ul");
let all = document.querySelector(".all")
let active = document.querySelector(".active")
let completed = document.querySelector(".completed")
let clear = document.querySelector(".clear")
let count = document.querySelector(".count");
let allTodos = JSON.parse(localStorage.getItem("todos")) || []

function addTodos(event) {
    if (event.keyCode === 13 && event.target.value !== "") {
        allTodos.push({
            name: event.target.value,
            isDone: false
        })
        event.target.value = "";
        createUi(allTodos, ul)
         incompleteCount();


    }
    localStorage.setItem("todos", JSON.stringify(allTodos))
}
function deleteTodo(event) {
    console.log(event.target.dataset.id)
    allTodos.splice(event.target.dataset.id, 1);
    localStorage.setItem("todos", JSON.stringify(allTodos))
    createUi(allTodos, ul);
     incompleteCount()
    toggleClear();

}
function handleToggle(event) {
    let id = event.target.dataset.id;
    allTodos[id].isDone = !allTodos[id].isDone
    createUi(allTodos, ul)
    incompleteCount();
    toggleClear();
}
function createUi(data, ul) {
    ul.innerHTML = ''
    data.forEach((item, index) => {
        let li = document.createElement("li");
        li.addEventListener("mousemove",(event)=>{
        span.style.display = "inline-block"
        })
        li.addEventListener("mouseout",(event)=>{
            span.style.display = "none"
            })
        let input = document.createElement("input")
        input.type = "checkbox"
        input.setAttribute("data-id", index);
        input.addEventListener("input", handleToggle)
        input.checked = item.isDone;
        let p = document.createElement("p")
        p.innerText = item.name;
        if(input.checked == true){
            p.style.textDecoration = "line-through"
            p.style.fontWeight = "lighter"
            p.style.opacity = "0.4"
        }
        let span = document.createElement("span")
        span.innerText = "X"
        span.style.display = "none"
        span.setAttribute("data-id", index)
        span.addEventListener("click", deleteTodo)
        span.classList.add("hideCross")
        li.append(input, p, span);
        ul.append(li);
    })
}
createUi(allTodos, ul);
input.addEventListener("keyup", addTodos)

all.addEventListener("click", (event) => {
    createUi(allTodos, ul)
    taskInfo(event.target.className);
})
active.addEventListener("click", (event) => {
    let activeTodos = allTodos.filter(x => {
        return x.isDone == false
    })
    createUi(activeTodos, ul)
    taskInfo(event.target.className);
})
completed.addEventListener("click", (event) => {
    let data = allTodos.filter(x => {
        return x.isDone == true
    })
    createUi(data, ul)
    taskInfo(event.target.className);
})
clear.addEventListener("click", (event) => {
    allTodos = allTodos.filter((x) => {
         return x.isDone == false      
    });
    createUi(allTodos, ul)
    localStorage.setItem("todos", JSON.stringify(allTodos))
})
function  incompleteCount(){

 count.innerText = allTodos.reduce( (acc, cv)=>{
    if(cv.isDone == false){
        return ++acc
    }
    return acc;
},0)
}
function toggleClear(){
    let check = allTodos.some(item=>{
        return item.isDone});

        if(check == true){
            clear.classList.add("show")
        }
        else{
            clear.classList.add("hide")
            clear.classList.remove("show")
        }
}
function taskInfo(className){
    all.classList.remove("border")
    active.classList.remove("border")
    completed.classList.remove("border")
 if(className == "all"){
     all.classList.add("border")
 }
 else if(className == "active"){
    active.classList.add("border")
}
else  {
    completed.classList.add("border");
}
}
all.classList.add("border");
 incompleteCount();
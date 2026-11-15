function getPerformance(marks){
    if(marks>=80){
        return "Excellent"
    }
    else if(marks>=70){
        return "Very Good"
    }
    else if(marks>=60){
        return "Good"
    }
    else if(marks>=50){
        return "Average"
    }
    else{
        return "Failed"
    }
}

function displayStudents(listToShow=students){
    const tbody =document.getElementById("records-body")
    const noRecords = document.getElementById("no-records")

    if(tbody===null){
        return;
    }
    tbody.innerHTML=""

    for (let i=0; i<listToShow.length; i++){
        const s= listToShow[i];
        tbody.innerHTML +=`
        <tr>
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>${s.gender}</td>
            <td>${s.course}</td>
            <td>${s.marks}</td>
            <td>${getPerformance(s.marks)}</td>
            <td><button onclick="deleteStudent(${s.id})">Delete</button></td>
            <td><button onclick="updateMarks(${s.id})">Update</button></td>
        </tr>`
    }
//update button check later , records stoped working everything
    if(students.length===0){
        noRecords.style.display="block";
    }
    else{
        noRecords.style.display="none"
    }
}

//dashboard numbers
function updateStatistics(){
    const totalBox = document.getElementById("total-students")

    if(totalBox ===null){
        return;
    }

    let total= students.length
    let sum = 0
    let passed = 0
    let failed = 0

    for (let i= 0; i< students.length; i++){
        sum=sum+students[i].marks;
    
    if(students[i].marks>=50){
        passed++
    }
    else{
        failed++
    }
}
let average= 0
if (total>0){
    average = sum/total
}
totalBox.textContent=total
document.getElementById("total-passed").textContent=passed
document.getElementById("total-failed").textContent= failed
document.getElementById("average-marks").textContent=average.toFixed(1)
}

function deleteStudent(id){
    for(let i=0; i<students.length; i++){
        if (students[i].id===id){
            students.splice(i,1)
            break
        }
    }
        refreshPage()
}

function refreshPage(){
    displayStudents()
    updateStatistics()
}

let students=[]
let nextId=1
const form=document.getElementById("student-form")
const message = document.getElementById("message")

function showMessage(text, type){
    message.textContent = text
    message.className = type
}

function searchStudents(){
    const searchInput=document.getElementById("search-input")
    const searchMessage=document.getElementById("search-message")

    if (searchInput===null){
        return
    }
    const searchText= searchInput.value.trim().toLowerCase()

    if (searchText===""){
        searchMessage.textContent=""
        displayStudents()
        return
    }

    const matches=[]
    for (let i=0; i<students.length; i++){
        const studentName=students[i].name.toLowerCase()
        if(studentName.includes(searchText)){
            matches.push(students[i])
        }
    }

    displayStudents(matches)

    if (matches.length===0){
        searchMessage.textContent="No matching students Found!"
        searchMessage.className="error"
    }
    else{
        searchMessage.textContent=matches.length +"student(s) found!"
        searchMessage.className="success"
    }
}
if(form){
    form.addEventListener("submit", function(event){
        event.preventDefault()
        const name= document.getElementById("name").value.trim()
        const ageText= document.getElementById("age").value.trim()
        const gender = document.getElementById("gender").value
        const course = document.getElementById("course").value
        const marksText= document.getElementById("marks").value.trim()

        if(name==="" || ageText==="" || gender==="" || course==="" || marksText===""){
            showMessage("Please Fill In Valid Details")
            return;
        }

        const age = Number(ageText)
        const marks= Number(marksText)

        if(isNaN(age) || age <=16){
            showMessage("Age must be 16 years and above")
            return;
        }

        if(isNaN(marks) || marks <0 || marks>100){
            showMessage("Marks must be a number between 0 and 100")
            return
        }

        const student={
            id: nextId,
            name: name,
            age: age,
            gender: gender,
            course: course,
            marks: marks
        }
nextId++

        students.push(student)
        refreshPage()
        showMessage("Congratulations! Student registered successfully!")
        form.reset()
        console.log(student)
    
    })
}
//gives muscle to the search button
const searchButton= document.getElementById("search-button")
const clearButton=document.getElementById("clear-button")
if(searchButton){
    searchButton.addEventListener("click", searchStudents)

    clearButton.addEventListener("click", function(){
        document.getElementById("search-input").value=""
        document.getElementById("search-message").textContent=""
        displayStudents()
    })
}
refreshPage()
//updating the marks
function updateMarks(id){
    const input=prompt("Enter marks...")
    
    if(input===null){
        return
    }
    const newMarks=Number(input)

    if(input.trim()==="" || isNaN(newMarks) || newMarks <0 || newMarks >100){
        alert("Marks must be between 0 to 100!")
        return
    }
    for (let i=0; i <students.length; i++)
        if(students[i].id===id){
            students[i].marks=newMarks
            break
        }
    refreshPage()
    }




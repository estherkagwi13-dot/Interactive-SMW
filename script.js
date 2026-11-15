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

    for (let i=0; i<students.length; i++){
        const s= students[i];
        tbody.innerHTML +=`
        <tr>
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>${s.gender}</td>
            <td>${s.course}</td>
            <td>${s.marks}</td>
            <td>${getPerformance(s.marks)}</td>
        </tr>`
    }

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

function refreshPage(){
    displayStudent()
    updateStatistics()
}

let students=[]
const form=document.getElementById("student-form")
const message = document.getElementById("message")

function showMessage(text, type){
    message.textContent = text
    message.className = type
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
            name: name,
            age: age,
            gender: gender,
            course: course,
            marks: marks
        }

        students.push(student)
        refreshPage()
        showMessage("Congartulations! Student registered successfully!")
        form.reset()
        console.log(student)
    
    })
}

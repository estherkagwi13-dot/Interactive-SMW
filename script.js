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
        showMessage("Congartulations! Student registered successfully!")
        form.reset()
        console.log(student)
    
    })
}

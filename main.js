//select the count element

let count=document.querySelector(".quize-info .count span"); 
let quizeArea = document.querySelector(".quize-area"); 
let answerArea = document.querySelector(".answer-area"); 
let submitBtn = document.querySelector(".submit-btn"); 
let bullets =document.querySelector('.bullets');
let finalResult =document.querySelector('.result');
let countDownElement =document.querySelector('.count-down');
let tryAgain =document.querySelector('.try-again');


let currentIndex=0;
let rightAnswers=0;

 
 
 function getQustions(){
    let myRequest= new XMLHttpRequest();
    
    myRequest.onreadystatechange  = function() {
        if(this.readyState == 4 && this.status == 200){
                  let quistionObject= JSON.parse(this.responseText);
                let qcount=quistionObject.length;

        creatBullets(qcount);
        //Add qustion Data
        addQustionData(quistionObject[currentIndex],qcount);
        // Show contiong down 
        countDown(20,qcount);

        tryAgain.style.display ='none';
        submitBtn. onclick = ()=>{

           let rigthAnswer=quistionObject[currentIndex].right_answer;
           currentIndex++;
           answerCheck(rigthAnswer,qcount);
           quizeArea.innerHTML="";
           answerArea.innerHTML="";
            addQustionData(quistionObject[currentIndex],qcount);
      
       //Handel my bullets
             handelBullets();
             clearInterval(countDownInterval);
       countDown(10,qcount);
    //showing the resaults
              showResult(qcount);
        };
        
        }
   
    };
 
    myRequest.open("GET","yarab.json",true);
    myRequest.send();
}

getQustions();



function creatBullets(num){
    count.innerHTML=`<strong>${num}</strong>`;
  //  creat num spans
  for(let i=0;i<num;i++){
    let b=document.createElement('span');
    document.querySelector('.bullets .spans').appendChild(b);
    if(i==0){
        b.classList.add('on');
    }
   


  }
}
 function addQustionData(obj,count){
   if(currentIndex <  count){
     //creat the qustions
     let qtitle=document.createElement('h2');
     let qtext=document.createTextNode(obj['titel']);
     qtitle.appendChild(qtext);
     quizeArea.appendChild(qtitle);
     //Creat The Answers
     for(let i=1;i<=4;i++){

        let mainDiv=document.createElement("div");

        mainDiv.className ="answer";

        let radio=document.createElement("input");

        radio.type='radio';
        radio.name='question';
        radio.id= `answer_${i}`;
        radio.dataset.answer= obj[`answer_${i}`];
        
        //creat the label
        let label =document.createElement("label");
        
        label.htmlFor=`answer_${i}`;

        let labelText =document.createTextNode(obj[`answer_${i}`]);

       
        
        label.appendChild(labelText);

        //append all to main div

        mainDiv.appendChild(radio);
        mainDiv.appendChild(label);
         
        //Apend all in answer area

        answerArea.appendChild(mainDiv);

     }
   }


}
function answerCheck (rAnswer,count){
    let choosenAnswer;
    let answers =document.getElementsByName('question');
    for(let i =0;i<answers.length;i++){
        if(answers[i].checked)
         choosenAnswer=answers[i].dataset.answer; 
    }
        if(choosenAnswer===rAnswer){
            rightAnswers++;
     }

}
function handelBullets(){
    let bulletsSpans =document.querySelectorAll('.bullets .spans span');
    let bulletsArray=Array.from(bulletsSpans);
  //  console.log(currentIndex);
    bulletsArray.forEach((span,index) => {
        if(currentIndex===index){
            span.className='on';

        }
 });
     


}

 function showResult(count){
    let theResults;
    
    if(currentIndex ===count){
        quizeArea.remove();
        bullets.remove();
        answerArea.remove();
        submitBtn.remove();
        

        
        
        if(rightAnswers >5 && rightAnswers < count){
           theResults= `<span class ="good" >GOOD</span> ${rightAnswers} from ${count}`; 
        }
        else if(rightAnswers === count){
            theResults= `<span class ="perfect" >YA GAMED</span> , ${rightAnswers} from ${count}` ; 
            
        }
        else {
            theResults= `<span class ="bad" >BAD</span> , ${rightAnswers} from ${count}`; 
    }
    finalResult.innerHTML=theResults;
    finalResult.style.padding='10px 10px';
    tryAgain.style.display='flex';
   
}
 }

 function countDown(duration,count){
    if(currentIndex < count){
        let m;
        let s;
        countDownInterval=setInterval( function (){
             m =parseInt(duration/60);
             s =parseInt(duration%60);
            m= m < 10 ? `0${m}`: m;
            s= s < 10 ? `0${s}`: s;
            countDownElement.innerHTML =`${m}:${s}`;
            if(--duration < 0){
                clearInterval(countDownInterval);
                submitBtn.click();
            }
        },1000);
        




    }

 }
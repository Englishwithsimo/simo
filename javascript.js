<script type="text/javascript">
var clickedWord=""
var ans1=["school","areas","illiteracy","literacy","equality","gap","justice","awareness","school","language","areas","humor","fashioned","concepts","language","degree"]
var ans2=["private schools","universal values","gender equality","raise","fight","rural","native","foreign","university graduates","compulsory","drop-outs/drop outs/dropouts"]
              // JS Code for checking the answers

function checkAnsBoxAnswersV2(ansCode,exNum){ 
  var ca=0
  for(var c=0;c<ansCode.length;c++){
    var guess=doSpaces(exNum,c);
    var  multians = guess.split("/");
    var ans;
    
    for (var j=0; j<multians.length; j++)
    {
      ans=doAnswers(multians[j],ansCode[c]);
      if( ans == "yes") break;
    }

    if(ans=="yes"){
      document.getElementById("ex"+exNum+"AnsBox"+c).style.color="green"
      document.getElementById("ex"+exNum+"AnsBox"+c).style.fontWeight="bold"
      ca++
    }
    else{
      document.getElementById("ex"+exNum+"AnsBox"+c).style.color="red" 
    } 
  }
  showScoreV2(ansCode,exNum,ca) 
}

function checkAnsBoxInvisibleAnswersScoreV2(ansCode,exNum){
  var ca=0
  for(var c=0;c<ansCode.length;c++){
    var guess=doSpaces(exNum,c)
    var ans=doAnswers(guess,ansCode[c])
    if(ans=="yes"){
      document.getElementById("ex"+exNum+"TickBox"+c).innerHTML=getInvisibleAnswersSign(1)
    document.getElementById("ex"+exNum+"AnsBox"+c).style.color="green"
      document.getElementById("ex"+exNum+"AnsBox"+c).style.fontWeight="bold"
      ca++
    }
    else if(guess==""){
      document.getElementById("ex"+exNum+"TickBox"+c).innerHTML=getInvisibleAnswersSign(3)
    }
    else{
      document.getElementById("ex"+exNum+"TickBox"+c).innerHTML=getInvisibleAnswersSign(2)
    document.getElementById("ex"+exNum+"AnsBox"+c).style.color="red"
      document.getElementById("ex"+exNum+"AnsBox"+c).style.fontWeight="bold"
    }
  }
  showScoreV2(ansCode,exNum,ca) 
}

function doAnswers(guess,ans){
if(ans.indexOf("/")==-1)
{
if(guess.toUpperCase()==ans.toUpperCase()){
txt="yes";
}
else{
txt="no";
}
}
else
{
var multians = ans.split("/");
for (var j=0; j<multians.length; j++)
{
if(multians[j].toUpperCase() === guess.toUpperCase()) {
txt = "yes";
return txt;
}
else{
txt ="no";
}
}
}
return txt;
}
    
function getInvisibleAnswersSign(x){
  if(x==1){
    var txt='<span style="color:green;font-weight:bold;">Y</span>'
  }
  else if(x==2){ 
    var txt='<span style="font-size: 100%;color:red;font-weight:bold;">X</span>'
  }
  else if(x==3){ 
    var txt='<span style="font-size: 100%;color:orange;font-weight:bold;">?</span>'
  }
  return txt  
}


function showScoreV2(ansCode,exNum,ca){
  var qlen=ansCode.length
  var pc=ca/qlen*100
  pc=Math.round(pc)
  var txt="<span style='color:green;font-weight:bold;'>You have scored "+pc+" percent ( "+ca+" / "+qlen+" )</span>"
  document.getElementById("messageArea"+exNum).innerHTML=txt
}


function doSpaces(exNum,qNum){
  var txt=document.getElementById("ex"+exNum+"AnsBox"+qNum).value
  if(txt.charAt(txt.length-1)==" "){
    txt=txt.slice(0,txt.length-1)
    document.getElementById("ex"+exNum+"AnsBox"+qNum).value=txt
  }
  return txt
}
// JS Code for showing the answers
function showAnsBoxAnswersV2(ansCode,exNum){
  for(var c=0;c<ansCode.length;c++){
  if(document.getElementById("ex"+exNum+"AnsBox"+c).value==ansCode[c]){
    document.getElementById("ex"+exNum+"AnsBox"+c).style.color="green"
    document.getElementById("ex"+exNum+"AnsBox"+c).style.fontWeight="bold"
  }
  else{
    document.getElementById("ex"+exNum+"AnsBox"+c).value=ansCode[c]
    document.getElementById("ex"+exNum+"AnsBox"+c).style.color="red"
    document.getElementById("ex"+exNum+"AnsBox"+c).style.fontWeight="bold"
    }
  }
}
// JS Code for clearing the answers
function clearAnsBoxAnswersV2(ansCode,exNum){
  for(var c=0;c<ansCode.length;c++){
  document.getElementById("ex"+exNum+"AnsBox"+c).value=""
  document.getElementById("ex"+exNum+"AnsBox"+c).style.color="black"
  document.getElementById("ex"+exNum+"AnsBox"+c).style.fontWeight="normal"
  }
  clearMessageArea(exNum)
}


function clearAnsBoxInvisibleAnswersV2(ansCode,exNum){
  for(var c=0;c<ansCode.length;c++){
    document.getElementById("ex"+exNum+"AnsBox"+c).value=""
    document.getElementById("ex"+exNum+"AnsBox"+c).style.color="black"
    document.getElementById("ex"+exNum+"AnsBox"+c).style.fontWeight="normal"
    document.getElementById("ex"+exNum+"TickBox"+c).innerHTML=""
  }
  clearMessageArea(exNum)
}

function clearMessageArea(exNum){
  document.getElementById("messageArea"+exNum).innerHTML=""
}
// Optional JS Code for Click and Drop
function makeClickedWord(exNum,x){
  var txt=document.getElementById("ex"+exNum+"Word"+x).innerHTML
  clickedWord=txt
}


function enterClickedWord(exNum,x){
  var txt=clickedWord
  document.getElementById("ex"+exNum+"AnsBox"+x).value=txt
  clickedWord=""
}


function enterClickedWordCap(exNum,x){
  var txt=clickedWord
  var firstLetter=txt.slice(0,1)
  firstLetter=firstLetter.toUpperCase()
  var rest=txt.slice(1,txt.length)
  txt=firstLetter+rest
  document.getElementById("ex"+exNum+"AnsBox"+x).value=txt
  clickedWord=""
}
</script>
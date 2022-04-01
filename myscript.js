const employees=[{name:'Anna',email:'Anna45@email.com',age:27,dept:'Technology',gradCourse:'B.Tech',gradYear:2015,gradPerf:'Good',postgrad:false,workBefore:true,workEx:'0-1 year'},{name:'John',email:'john@email.com',age:24,dept:'Technology',gradCourse:'B.Tech',gradYear:2015,gradPerf:'Good',postgrad:false,workBefore:false,workEx:'None'},{name:'Edwards',email:'edwards@email.com',age:29,dept:'Accounts',gradCourse:'B.Com',gradYear:2015,gradPerf:'Excellent',postgrad:true,workBefore:true,workEx:'3+ years'},{name:'Julia',email:'julia@email.com',age:28,dept:'Technology',gradCourse:'B.Tech',gradYear:2015,gradPerf:'Excellent',postgrad:true,workBefore:true,workEx:'1-3 years'}];
const expenses=[{name:'John',category:'Local Travel',billId:'NP7561',amount:64,payment:'Self',approved:true},{name:'Anna',category:'Communication',billId:'BN8561',amount:39,payment:'Self',approved:false},{name:'Edwards',category:'Local Travel',billId:'AT5461',amount:58,payment:'Corporate Card',approved:true},{name:'Julia',category:'Local Travel',billId:'RR5492',amount:71,payment:'Self',approved:true},{name:'Julia',category:'Out of City Travel',billId:'KT8785',amount:277,payment:'Bill to Company',approved:true},{name:'Edwards',category:'Others',billId:'UR0400',amount:25,payment:'Corporate Card',approved:false},{name:'Edwards',category:'Out of City Travel',billId:'CC6586',amount:305,payment:'Corporate Card',approved:false},{name:'Julia',category:'Communication',billId:'DL3425',amount:43,payment:'Self',approved:false},{name:'Julia',category:'Out of City Travel',billId:'MW65775',amount:248,payment:'Bill to Company',approved:true},{name:'Edwards',category:'Others',billId:'JR56732',amount:52,payment:'Corporate Card',approved:true},{name:'Julia',category:'Out of City Travel',billId:'BK0074',amount:405,payment:'Bill to Company',approved:false},{name:'Edwards',category:'Communication',billId:'JR56732',amount:72,payment:'Corporate Card',approved:true}];
let dupDb=[];
const departments=['Technology','Accounts','Gov'];
const Categories =['Local Travel','Communication','Out of City Travel','Others'];



function doUpdate(){
	
	let name=document.getElementById('name').value;
	let email=document.getElementById('email').value;
	let age=document.getElementById('age').value;
	let dept=document.getElementById('mySelectDept').value;
	let degree=document.getElementById('degree').value;
	let year=document.getElementById('mySelectYear').value;
	let postChh=document.getElementById('post').checked;
	let workChh=document.getElementById('workChk').checked;
	let gradE=document.getElementsByName('grad');
	let grad="";
	for(let i=0;i<gradE.length;i++){
		if(gradE[i].checked)grad=gradE[i].value;
	}
	let expE=document.getElementsByName('exp');
	let exp="";
	for(let i=0;i<expE.length;i++){
		if(expE[i].checked)exp=expE[i].value;
	}

	if (parseInt(age)==NaN) {
		alert('Age should be digit only');
	}else{
		let ind=employees.findIndex(emp=>emp.name==name);
		employees[ind]['email']=email;
		employees[ind]['age']=age;
		employees[ind]['dept']=dept;
		employees[ind]['gradCourse']=degree;
		employees[ind]['gradYear']=year;
		employees[ind]['gradPerf']=grad;
		employees[ind]['postgrad']=postChh;
		employees[ind]['workBefore']=workChh;
		employees[ind]['workEx']=exp;
		alert('Employee Uppdate Success');
		showEmpForm();
	}

}

function clickOnEdit(nam){
	showAddEmpForm('Edit Employee Details','Update','doUpdate');
	let emp=employees.find(em=>em.name==nam);
	let {name,email,age,dept,gradCourse,gradYear,gradPerf,postgrad,workBefore,workEx}=emp;
	document.getElementById('name').disabled=true;
	document.getElementById('name').value=name;
	document.getElementById('email').value=email;
	document.getElementById('age').value=age;
	document.getElementById('mySelectDept').value=dept;
	document.getElementById('degree').value=gradCourse;
	document.getElementById('mySelectYear').value=parseInt(gradYear);
	document.getElementById('post').checked=postgrad;
	document.getElementById('workChk').checked=workBefore;

	let gradE= document.getElementsByName('grad');
	for(let i=0;i<gradE.length;i++){
		if(gradE[i].value==gradPerf){
			gradE[i].checked=true;
			break;
		}
	}

	let expE=document.getElementsByName('exp');
	for(let i=0;i<expE.length;i++){
		if(expE[i].value==workEx){
			expE[i].checked=true;
			break;
		}
	}

}
/*---------------------------------Expen Operation---------------------------*/

function addNewExpence(){
	let empName=document.getElementById('mySelectEmp').value;
	let expn=document.getElementById('mySelectExpense').value;
	let billId=document.getElementById('billid').value;
	let amount=document.getElementById('amount').value;
	let approve=document.getElementById('approve').checked;
	let elePad=document.getElementsByName('paid');
	let paid="";
	for(let i=0;i<elePad.length;i++){
		if(elePad[i].checked)paid=elePad[i].value;
	}
	//console.log(empName,expn,billId,amount,approve,paid);
	let nameflag=expnflag=billidflag=amountflag=paidflag=false;
	//console.log(nameflag,expnflag,billidflag,amountflag,paidflag);
	if(empName=='0'){
		alertFun('empError','Select the Employee Name');
	}else{
		nameflag=true;
	}
	if(expn=='0'){
		alertFun('expnError','Select the Category');
	}else{
		expnflag=true;
	}
	if(billId==''){
		alertFun('billError','Bill Id is Mandatory');
	}else{
		billidflag=true;
	}
	if(amount==''){
		alertFun('amountError','Amount is Mandatory');
	}else{
		amountflag=true;
	}
	if(paid==''){
		alertFun('paidError','Choose the applicable payment mode');
	}else{
		paidflag=true;
	}
	if(nameflag && expnflag && billidflag && amountflag && paidflag){
		let json={'name':empName,'category':expn,'billId':billId,'amount':amount,'payment':paid,'approved':approve};
		expenses.push(json);
		alert('Expense add success');
		showExpensesForm();
	}
}

function showAddExpencFrom(){
	
	let txt='<h2 align="center">Add a new Expense</h2>';
	txt+='<div class="form-group">';
   
    txt+='<select class="form-control" id="mySelectEmp" onchange="alertFun(\'empError\')">';
  	txt+='<option value="0" selected disabled>Select the Employee</option>';
  	let emp=employees.map(em=>{
  		return '<option>'+em.name+'</option>';
  	});
  	txt+=emp.join('');
	txt+='</select>';
	txt+='<div class="rr" id="empError"></div><br>';

    txt+='<select class="form-control" id="mySelectExpense" onchange="alertFun(\'expnError\')">';
  	txt+='<option value="0" selected disabled>Select the Expense Category</option>';
  	let arr=Categories.map(aa=>{
  		return '<option>'+aa+'</option>';
  	});
  	txt+=arr.join('');
	txt+='</select>';
	txt+='<div class="rr" id="expnError"></div><br>';

	txt+='<label for="formGroupExampleInput">Bill Id</label>';
    txt+='<input type="text" class="form-control" id="billid" placeholder="Enter the Bill Id" onchange="alertFun(\'billError\')">';
    txt+='<div id="billError" class="rr"></div>';

    txt+='<label for="formGroupExampleInput">Amount</label>';
    txt+='<input type="number" class="form-control" id="amount" placeholder="Enter the Expense Amount" onchange="alertFun(\'amountError\')">';
    txt+='<div id="amountError" class="rr"></div><br>';

	txt+='<p >How was the bill paid <input type="radio" name="paid" value="Corporate Card" onchange="alertFun(\'paidError\')"> Corporate Card <input type="radio" name="paid" value="Bill to Company" onchange="alertFun(\'paidError\')"> Bill to Company <input type="radio" name="paid" value="Self" onchange="alertFun(\'paidError\')"> Self</p>';
	txt+='<div id="paidError" class="rr"></div><br>';

	txt+='<p><input type="checkbox" name="" id="approve"> Has the expenses been approved</p>';
	
	txt+='<button type="button" class="btn btn-primary" onclick="addNewExpence()">Submit</button>';

	txt+='</div>';
	document.getElementById('show').innerHTML=txt;

}

function showExpensesForm(){
	dupDb=expenses;
	showExpense();
}

function doApproved(billId){
	let ind=expenses.findIndex(ex=>ex.billId==billId);
	expenses[ind].approved=true;
	showExpense(dupDb);
}
function showExpense(db=expenses){
	let txt='<h2 align="center">List of Expenses for all Employees</h2>';
	txt+='<table class="table table-sm">';
  	txt+='<thead class="thead-dark">';
    txt+='<tr>';
    txt+='  <th scope="col">Name</th>';
    txt+='  <th scope="col">Category</th>';
    txt+='  <th scope="col">Bill Id</th>';
    txt+='  <th scope="col">Amount</th>';
    txt+='  <th scope="col">Payment</th>';
    txt+='  <th scope="col">Approved Ex</th>';
    txt+='  <th scope="col"></th>';
    txt+='</tr>';
  	txt+='</thead>';
  	txt+='<tbody>';
  	let arr=db.map(emp=>{
  		let str='<tr>';
  		let {name,category,billId,amount,payment,approved} = emp;
  		str+='<td>'+name+'</td>';
      	str+='<td>'+category+'</td>';
      	str+='<td>'+billId+'</td>';
      	str+='<td>'+amount+'</td>';
      	str+='<td>'+payment+'</td>';
      	str+='<td>'+approved+'</td>';
      	if(approved){
      		str+='<td></td>';
      	}else{
      		str+='<td>';
      		str+='<button  type="button" class="btn btn-secondary btn-sm"  onclick="doApproved(\''+billId+'\')">Approved';
			str+='</button>';
			str+='</td>';
      	}
  		str+='</tr>';
  		return str;
  	});
  	txt+=arr.join('');
  	txt+='</tbody>';
	txt+='</table>';
	document.getElementById('show').innerHTML=txt;
	
}
/*----------------------------------------------Dept-----------------------------------*/

function showDeptform(){
	
	let txt='<table class="table" align="center">';
	let arr=departments.map(dep=>{
		return '<tr><td>'+dep+'</td></tr>';
	});
	txt+=arr.join('');
	txt+='</table>'
	document.getElementById('show').innerHTML=txt;
}
function showAddDeptform(){
	let txt='<h2 align="center">Add Department</h2>';
	txt+='<div class="form-group">';
    txt+='<label for="formGroupExampleInput">Department Name</label>';
    txt+='<input onchange="alertFun(\'deptError\')" type="text" class="form-control" id="deptName" placeholder="Enter department name">';
    txt+='<div class="rr" id="deptError"></div><br>';
    txt+='<button type="button" class="btn btn-primary" onclick="addDeptClicked()">Submit</button>';
	txt+='</div>';
	document.getElementById('show').innerHTML=txt;

}
function addDeptClicked() {
	let dept=document.getElementById('deptName').value;
	if(dept==''){
		alertFun('deptError','Department name is mandatory');
	}else{
		let ind=departments.findIndex(de=>de==dept);
		if(ind==-1){
			departments.push(dept);
			alert('Depertment add success');
			showDeptform();
		}else{
			alert('Depertment is already exists');
			showAddDeptform();
		}
		
	}
}
/*------------------------------------Add Emp Form----------------------------------*/

function addNewEmployee(){
	let name=document.getElementById('name').value;
	let email=document.getElementById('email').value;
	let age=document.getElementById('age').value;
	let dept=document.getElementById('mySelectDept').value;
	let degree=document.getElementById('degree').value;
	let year=document.getElementById('mySelectYear').value;
	let postChh=document.getElementById('post').checked;
	let workChh=document.getElementById('workChk').checked;
	let gradE=document.getElementsByName('grad');
	let grad="";
	for(let i=0;i<gradE.length;i++){
		if(gradE[i].checked)grad=gradE[i].value;
	}
	let expE=document.getElementsByName('exp');
	let exp="";
	for(let i=0;i<expE.length;i++){
		if(expE[i].checked)exp=expE[i].value;
	}
	let nameflag=emailflag=ageflag=deptflag=degreeflag=yearflag=gradflag=expflag=false;
	if(name==""){
		alertFun('nameError',"Name is Mandatory");
	}else{
		nameflag=true;
	} 
	if(email==""){
		alertFun('emailError',"Email is Mandatory");
	}else{
		emailflag=true;
	}
	 if(age==""){
		alertFun('ageError',"Age is Mandatory");
	}else{
		ageflag=true;
	}
	 if(dept=="0"){
		alertFun('deptError',"Department is Mandatory");
	}else{
		deptflag=true;
	} 
	if(degree==""){
		alertFun('degreeError',"Degree is Mandatory");
	}else{
		degreeflag=true;
	}
	 if(year=="0"){
		alertFun('yearError',"Year is Mandatory");
	}else{
		yearflag=true;
	} if(grad==''){
		alertFun('gradError',"Grade is Mandatory");
	}else{
		gradflag=true;
	} 
	if(exp==''){
		alertFun('expError','Experience is Mandatory');
	}else{
		expflag=true;
	}
	if(nameflag && emailflag && ageflag && deptflag && degreeflag && yearflag && gradflag && expflag){
		let json={'name':name,'email':email,'age':age,'dept':dept,'gradCourse':degree,'gradYear':year,'gradPerf':grad,'postgrad':postChh,'workBefore':workChh,'workEx':exp};
		employees.push(json);
		alert('Employee Add Success');
		showEmpForm();
	}
}
function alertFun(id,msg='') {
	document.getElementById(id).innerHTML=msg;
}


function showAddEmpForm(msg='Add a new Employee',bt='Submit',fun='addNewEmployee'){
	let txt='<h2 align="center">'+msg+'</h2>';
	txt+='<div class="form-group">';
    txt+='<label for="formGroupExampleInput">Employee Name</label>';
    txt+='<input onchange="alertFun(\'nameError\')" type="text" class="form-control" id="name" placeholder="Enter emp name">';
    txt+='<div class="rr" id="nameError"></div>';

    txt+='<label for="formGroupExampleInput">Email</label>';
    txt+='<input onchange="alertFun(\'emailError\')" type="text" class="form-control" id="email" placeholder="Enter email">';
    txt+='<div class="rr" id="emailError"></div>';

    txt+='<label for="formGroupExampleInput">Age</label>';
    txt+='<input onchange="alertFun(\'ageError\')" type="number" class="form-control" id="age" placeholder="Enter age">';
    txt+='<div class="rr" id="ageError"></div><br>';

    txt+='<select class="form-control" id="mySelectDept" onchange="alertFun(\'deptError\')">';
  	txt+='<option value="0" selected disabled>Select the Department</option>';
  	let arr=departments.map(de=>{
  		return '<option>'+de+'</option>';
  	});
  	txt+=arr.join('');
	txt+='</select>';
	txt+='<div class="rr" id="deptError"></div><br>';

    txt+='<label for="formGroupExampleInput">Graduation Degree</label>';
    txt+='<input type="text" class="form-control" id="degree" placeholder="Enter Degree" onchange="alertFun(\'degreeError\')">';
    txt+='<div id="degreeError" class="rr"></div><br>';

    txt+='<select class="form-control" id="mySelectYear" onchange="alertFun(\'yearError\')">';
  	txt+='<option value="0" selected disabled >Select the year</option>';
  	for(let i=2000;i<=2022;i++){
  		txt+='<option>'+i+'</option>';
  	}
	txt+='</select>';
	txt+='<div id="yearError" class="rr"></div><br>';

	txt+='<p>Overall Grade in Gradution <input type="radio" name="grad" value="Excellent" onchange="alertFun(\'gradError\')"> A <input type="radio" name="grad" value="Good" onchange="alertFun(\'gradError\')"> B <input type="radio" name="grad" value="Fine" onchange="alertFun(\'gradError\')"> C <input type="radio" name="grad" value="Poor" onchange="alertFun(\'gradError\')"> D</p>';
	txt+='<div id="gradError" class="rr"></div>';

	txt+='<p><input type="checkbox" name="" id="post"> Are you a post graduate</p>';
	
	txt+='<p><input type="checkbox" name="" id="workChk"> Do you have prior work experience</p>	';
	
	txt+='<p>Year of Work Experience <input onchange="alertFun(\'expError\')" type="radio" name="exp" value="None"> None <input type="radio" name="exp" value="0-1 year" onchange="alertFun(\'expError\')"> 0-1 year <input type="radio" name="exp" value="1-3 year" onchange="alertFun(\'expError\')"> 1-3 year <input type="radio" name="exp" value="3+ years" onchange="alertFun(\'expError\')"> 3+ year</p>';
	txt+='<div id="expError" class="rr"></div>';
	txt+='<button type="button" class="btn btn-primary" onclick="'+fun+'()">'+bt+'</button>';

	txt+='</div>';
	document.getElementById('show').innerHTML=txt;
}

/*--------------------------------show Emp Form Opertion--------------------------*/

function clickOnChangeView(){
	let arr=employees.map(emp=>{
		let {name,email,age,dept,gradCourse,workEx}=emp;
		txt='<div class="card bg-light" style="width: 18rem;">';
  		txt+='<div class="card-body">';
    	txt+='<h5 class="card-title"><span>Name: </span>'+name+'</h5>';
    	txt+='<h6 class="card-subtitle mb-2 text-muted"><span>Email: </span>'+email+'</h6>';
    	txt+='<h6 class="card-subtitle mb-2 text-muted"><span>Age: </span>'+age+'</h6>';
    	txt+='<h6 class="card-subtitle mb-2 text-muted"><span>Dept: </span>'+dept+'</h6>';
    	txt+='<h6 class="card-subtitle mb-2 text-muted"><span>Degree: </span>'+gradCourse+'</h6>';
    	txt+='<h6 class="card-subtitle mb-2 text-muted"><span>Experience: </span>'+workEx+'</h6>';
  		txt+='</div>';
		txt+='</div>';
		return txt;
	});
	let str='<br><br><table>';
	str+='<tr>';
	let arr2=arr.map((ee,i)=>{
		let txt='';
		if(i!=0 && i%3==0){
			return '</tr><tr><td>'+ee+'</td>';
		}else{
			return'<td>'+ee+'</td>';
		}
	});
	str+=arr2.join('');
	str+='</tr></table><br>';
	str+='<button type="button" class="btn btn-primary" onclick="showEmpForm()">Original View</button>';
	document.getElementById('show').innerHTML=str;
}

function clickOnDelete(name){
	let ind=employees.findIndex(emp=>emp.name==name);
	employees.splice(ind,1);
	showEmpForm();

}
function clickOnCar(name){
	console.log('car icon clicked')
	dupDb=[];
	dupDb=expenses.filter(ex=>ex.name==name);
	showExpense(dupDb);

}
/*--------------------Show Emp------------------------------------*/

function showEmpForm(){
	show();
}

function show(){
	let txt='<table class="table table-sm">';
  	txt+='<thead class="thead-dark">';
    txt+='<tr>';
    txt+='  <th scope="col">Name</th>';
    txt+='  <th scope="col">Email</th>';
    txt+='  <th scope="col">Age</th>';
    txt+='  <th scope="col">Dept</th>';
    txt+='  <th scope="col">Graduation</th>';
    txt+='  <th scope="col">Work Ex</th>';
    txt+='  <th scope="col"></th>';
    txt+='</tr>';
  	txt+='</thead>';
  	txt+='<tbody>';
  	let arr=employees.map(emp=>{
  		let str='<tr>';
  		let {name,email,age,dept,gradCourse,workEx} = emp;
  		str+='<td>'+name+'</td>';
      	str+='<td>'+email+'</td>';
      	str+='<td>'+age+'</td>';
      	str+='<td>'+dept+'</td>';
      	str+='<td>'+gradCourse+'</td>';
      	str+='<td>'+workEx+'</td>';
      	str+='<td>';
      	str+='<button type="button" class="close" onclick="clickOnCar(\''+name+'\')">';
  		str+='	<img src="icons8-car-30.png" alt="icon name">';
		str+='</button>';
		str+='<button type="button" class="close" onclick="clickOnDelete(\''+name+'\')">';
  		str+='	<img src="icons8-delete-24.png" alt="icon name">';
		str+='</button>';
      	str+='<button type="button" class="close" onclick="clickOnEdit(\''+name+'\')">';
  		str+='	<img src="icons8-edit-50.png" alt="icon name">';
		str+='</button>';
		
		
		str+='</td>';
  		str+='</tr>';
  		return str;
  	});
  	txt+=arr.join('');
  	txt+='</tbody>';
	txt+='</table>';
	txt+='<button type="button" class="btn btn-primary" onclick="clickOnChangeView()">Change View</button>';
	document.getElementById('show').innerHTML=txt;
}

/*---------------------------------------------NAV------------------*/

showNavbar();

function showNavbar() {
	let txt='<nav class="navbar navbar-expand-lg navbar-light bg-light">';
  	txt+='<a class="navbar-brand" href="#">Employee System</a>';
  	txt+='<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">';
    txt+='<span class="navbar-toggler-icon"></span>';
  	txt+='</button>';
  	txt+='<div class="collapse navbar-collapse" id="navbarNav">';
    txt+='<ul class="navbar-nav">';
    txt+='  <li class="nav-item active">';
    txt+='   <a class="nav-link" href="#" onclick="showEmpForm()">Show Employee<span class="sr-only">(current)</span></a>';
    txt+='  </li>';
    txt+='  <li class="nav-item">';
    txt+='    <a class="nav-link" href="#" onclick="showAddEmpForm()">Add an Employee</a>';
    txt+='  </li>';
    txt+='  <li class="nav-item">';
    txt+='    <a class="nav-link" href="#" onclick="showDeptform()">Departments</a>';
    txt+='  </li>';
    txt+='  <li class="nav-item">';
    txt+='    <a class="nav-link " href="#" tabindex="-1"  onclick="showAddDeptform()">Add a Dept</a>';
    txt+='  </li>';
    txt+='  <li class="nav-item">';
    txt+='    <a class="nav-link " href="#" tabindex="-1" onclick="showExpensesForm()">Expenses</a>';
    txt+='  </li>';
    txt+='  <li class="nav-item">';
    txt+='    <a class="nav-link " href="#" tabindex="-1" onclick="showAddExpencFrom()">Add an Expense</a>';
    txt+='  </li>';
    txt+='</ul>';
  	txt+='</div>';
	txt+='</nav>';
	let ele=document.getElementById('navShow').innerHTML=txt;

}
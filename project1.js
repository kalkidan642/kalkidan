let weight=prompt("Enter your weight\n");
let height=prompt("Enter your height\n");

let BMI=weight/(height*height);
if(BMI<18.5)
    alert("your BMI is = " + BMI+ "underweight");
else if(BMI<25)
    alert("your BMI is = " +BMI.toFixed(2)+ "\n normal");
else if(BMI<30)
    alert("overweight");
else if(BMI>30)
    alert("obese");
else
    alert('envalid number');

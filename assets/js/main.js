console.log("Hello World!");
var counter = 20;
while (counter < 30){
    console.log(`Counter: ${counter}`);
    counter++
    $("#counter").html(counter);
}
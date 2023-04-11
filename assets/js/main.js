console.log("Hello World!");
var counter = 20;
while (counter < 30){
    counter++
    console.log(`Counter: ${counter}`);
    $("#counter").html(counter);
}
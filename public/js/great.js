let mDate = new Date();
var hour = mDate.getHours();
var greet;

if(hour < 12)
greet = 'Good morning';
else if(hour >= 12 && hour <= 17)
greet = 'Good afternoon';
else if(hour >= 17 && hour <= 24)
greet = 'Good afternoon';

document.getElementById('#greetings').innerHTML =
        '<b>' + greet + '</b>';
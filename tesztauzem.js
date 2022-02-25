//Akciós tészta lekérése - XMLHttpRequest
let akciosTesztaLekerese = function() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const akcio = JSON.parse(this.responseText);
            const akciosTeszta = document.getElementById("akcios-teszta");
            const akciosAr = document.getElementById("akcios-ar");
            akciosTeszta.innerHTML = akcio.akciosTeszta;
            akciosAr.innerHTML = akcio.akciosAr;
        }
    };
    xmlhttp.open("GET", "/api/akcio");
    xmlhttp.send();
};

//Akciós tészta lekérése alternatív megoldás - fetch
const akciosTesztaLekerese2 = async () => {
    let akcio = {};
    
    const valasz = await fetch("/api/akcio");
    
    if (valasz.ok) {
        akcio = await valasz.json();
        const akciosTeszta = document.getElementById("akcios-teszta");
        const akciosAr = document.getElementById("akcios-ar");
        akciosTeszta.innerHTML = akcio.akciosTeszta;
        akciosAr.innerHTML = akcio.akciosAr;
    }
};

let jatek = function () {
    let xmlhttp = new XMLHttpRequest();
    let jatekValasz = document.getElementById("jatek-valasz");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            jatekValasz.value = "";
            alert("Köszönjük, hogy részt vesz a játékunkban!");
        }
    };
    xmlhttp.open('POST', '/api/jatek');
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({uzenet: jatekValasz.value}));
};

//Játék beküldése alternatív megoldás - fetch
const jatek2 = async () => {
    const jatekValasz = document.getElementById("jatek-valasz");
    const valasz = await fetch("/api/jatek", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({uzenet: jatekValasz.value})
    });
    
    if (valasz.ok) {
        jatekValasz.value="";
        alert("Köszönjük, hogy részt vesz a játékunkban!");
    }
};

window.onload = function () {
    akciosTesztaLekerese();
    //akciosTesztaLekerese2();
};

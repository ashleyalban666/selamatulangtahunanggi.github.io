// Date & Time
function displayHariTanggalBulanTahun() {
    var HariIni = new Date();

    var Hari = HariIni.getDay();
    var Tanggal = HariIni.getDate();
    var Bulan = HariIni.getMonth();
    var Tahun = HariIni.getFullYear();

    var NamaHari = new Array("Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu");
    var NamaBulan = new Array("Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember");

    document.getElementById("hari-ini").innerHTML = NamaHari[Hari] + ", " + Tanggal + " " + NamaBulan[Bulan] + " " + Tahun;
    document.getElementById("hari-ini").innerText = NamaHari[Hari] + ", " + Tanggal + " " + NamaBulan[Bulan] + " " + Tahun;
    document.getElementById("hari-ini").textContent = NamaHari[Hari] + ", " + Tanggal + " " + NamaBulan[Bulan] + " " + Tahun;

    setTimeout(displayHariTanggalBulanTahun, 3000);
}
displayHariTanggalBulanTahun();

function displayJamMenitDetik() {
    var JamBerapa = new Date();
    var MenitBerapa = new Date();
    var DetikBerapa = new Date();

    var jam = JamBerapa.getHours();
    var menit = MenitBerapa.getMinutes();
    var detik = DetikBerapa.getSeconds();

    if (jam < 10) {
        jam = '0' + jam;
    }
    if (menit < 10) {
        menit = '0' + menit;
    }
    if (detik < 10) {
        detik = '0' + detik;
    }

    document.getElementById("jam-berapa").innerHTML = jam + " : " + menit + " : " + detik;
    document.getElementById("jam-berapa").innerText = jam + " : " + menit + " : " + detik;
    document.getElementById("jam-berapa").textContent = jam + " : " + menit + " : " + detik;

    setTimeout(displayJamMenitDetik, 1000);
}
displayJamMenitDetik();

// Scroll Otomatis
function mulaiScroll() {
    var Yuk = document.getElementById('termynal')
    Yuk.scrollTop = Yuk.scrollHeight;
    setTimeout(mulaiScroll, 1000);
}
mulaiScroll();


// Background Animation
var canvas, gl;

var shaderScript;
var shaderSource;
var vertexShader;
var fragmentShader;
var buffer;

var locationOfTime;
var locationOfResolution;

var startTime = new Date().getTime();
var currentTime = 0;

function init() {
    canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            -1.0, 1.0,
            1.0, -1.0,
            1.0, 1.0
        ]),
        gl.STATIC_DRAW
    );

    shaderScript = document.getElementById("2d-vertex-shader");
    shaderSource = shaderScript.text;
    vertexShader = gl.createShader(gl.VERTEX_SHADER);

    gl.shaderSource(vertexShader, shaderSource);
    gl.compileShader(vertexShader);

    shaderScript = document.getElementById("2d-fragment-shader");
    shaderSource = shaderScript.text;
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, shaderSource);
    gl.compileShader(fragmentShader);

    program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);


    locationOfResolution = gl.getUniformLocation(program, "u_resolution");
    locationOfTime = gl.getUniformLocation(program, "u_time");

    gl.uniform2f(locationOfResolution, canvas.width, canvas.height);
    gl.uniform1f(locationOfTime, currentTime);

    render();
}

function render() {
    var now = new Date().getTime();
    currentTime = (now - startTime) / 1000;

    gl.uniform1f(locationOfTime, currentTime);

    window.requestAnimationFrame(render, canvas);

    positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

window.addEventListener('load', function (event) {
    init();
});

window.addEventListener('resize', function (event) {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    locationOfResolution = gl.getUniformLocation(program, "u_resolution");
});
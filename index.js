const [ALP, ALPCAP] = ["abcdefghijklmnopqrstuvwxyz".split(""), "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

var [cip, cipcap, shf, chr] = [[], [], 7];

sort(algorithm(shf), ALP, ALPCAP, cip, cipcap);
document.getElementById("shift").textContent = shf;
chr = document.getElementById("inp").value;
document.getElementById("out").textContent = Encipher(ALP, cip, ALPCAP, cipcap, chr);

document.getElementById("copy").addEventListener("click", function(){
  function temp() {
    document.getElementById("copy").textContent = "Copy Output";
  }
  navigator.clipboard.writeText(document.getElementById("out").innerHTML);
  document.getElementById("copy").textContent = "Copied to clipboard!";
  setTimeout(temp, 1000);
  });

document.getElementById("TextToCaesar").addEventListener("click", function() {
  chr = document.getElementById("inp").value;
  sort(algorithm(shf), ALP, ALPCAP, cip, cipcap);
  document.getElementById("out").textContent = Encipher(ALP, cip, ALPCAP, cipcap, chr);
});

document.getElementById("CaesarToText").addEventListener("click", function() {
  chr = document.getElementById("inp").value;
  sort(algorithm(shf), ALP, ALPCAP, cip, cipcap);
  document.getElementById("out").textContent = Decipher(ALP, cip, ALPCAP, cipcap, chr);
});

document.getElementById("plus").addEventListener("click", function() {
  shf += 1;
  short()
});

document.getElementById("minus").addEventListener("click", function() {
  shf -= 1;
  short()
});

document.getElementById("inp").oninput = function() {
  chr = document.getElementById("inp").value;
  if(document.getElementById("TextToCaesar").checked) {
    document.getElementById("out").textContent = Encipher(ALP, cip, ALPCAP, cipcap, chr);
  }
  else if(document.getElementById("CaesarToText").checked) {
    document.getElementById("out").textContent = Decipher(ALP, cip, ALPCAP, cipcap, chr);
  }
}

function sort(shf, ALP, ALPCAP, cip, cipcap) {
  for(var i = shf; i < ALP.length + shf; i++) {
    if(i < ALP.length) {
      cip.push(ALP[i]);
      cipcap.push(ALPCAP[i]);
    }
    else {
      cip.push(ALP[Math.abs(i - ALP.length)]);
      cipcap.push(ALPCAP[Math.abs(i - ALP.length)]);
    }
  }
}

function Encipher(ALP, cip, ALPCAP, cipcap, chr) {
  var oupt = "";
  for(var k = 0; k < chr.length; k++) {
    if(ALP.includes(chr[k])) {
      oupt += cip[ALP.indexOf(chr[k])];
    }
    else if(ALPCAP.includes(chr[k])) {
      oupt += cipcap[ALPCAP.indexOf(chr[k])];
    }
    else {
      oupt += chr[k];
    }
  }
  return oupt;
}

function Decipher(ALP, cip, ALPCAP, cipcap, chr) {
  var oupt = "";
  for(var k = 0; k < chr.length; k++) {
    if(cip.includes(chr[k])) {
      oupt += ALP[cip.indexOf(chr[k])];
    }
    else if(cipcap.includes(chr[k])) {
      oupt += ALPCAP[cipcap.indexOf(chr[k])];
    }
    else {
      oupt += chr[k];
    }
  }
  return oupt;
}

function short() {
  [cip, cipcap] = [[], []]
  document.getElementById("shift").textContent = shf;
  sort(algorithm(shf), ALP, ALPCAP, cip, cipcap);

  if(document.getElementById("TextToCaesar").checked) {
    document.getElementById("out").textContent = Encipher(ALP, cip, ALPCAP, cipcap, chr);
  }
  else if(document.getElementById("CaesarToText").checked) {
    document.getElementById("out").textContent = Decipher(ALP, cip, ALPCAP, cipcap, chr);
  }
}

function algorithm(shf) {
  var temp = shf;
  if(temp >= 0) {
    temp = temp % 26;
    return temp;
  }
  else {
    while(temp < 0) {
      temp = (26 + temp) % 26;
    }
    return temp;
  }
}

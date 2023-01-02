const parOuImpar = process.argv[2]
const numero = process.argv[3]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10)
console.log(numeroAleatorioEntreZeroeDez)

let result = Number(numero) + numeroAleatorioEntreZeroeDez

if(!parOuImpar && !numero){
    console.log("Escolha um número entre 0 e 10")
} else if(parOuImpar === "par" && numeroAleatorioEntreZeroeDez %2 !== 0 && result %2 ===0){
    console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${result}. Você ganhou!`)
}else if(parOuImpar === "ímpar" && numeroAleatorioEntreZeroeDez %2 === 0 && result %2 ===0){
    console.log(`Você escolheu ímpar e o computador escolheu par. O resultado foi ${result}. Você perdeu!`)
}else if (parOuImpar === "par" && numeroAleatorioEntreZeroeDez %2 !== 0 && result %2 !==0){
    console.log(`Você escolheu par e o computador escolheu ímpar. O resultado foi ${result}. Você perdeu!`)
}else if(parOuImpar === "ímpar" && numeroAleatorioEntreZeroeDez %2 === 0 && result %2 !==0){
    console.log(`Você escolheu ímpar e o computador escolheu par. O resultado foi ${result}. Você ganhou!`)
}else if(parOuImpar === "ímpar" && numeroAleatorioEntreZeroeDez %2 !== 0 && result %2 !==0){
    console.log(`Você escolheu ímpar e o computador escolheu ímpar. O resultado foi ${result}. Empate!`)
}else if(parOuImpar === "par" && numeroAleatorioEntreZeroeDez %2 === 0 && result %2 ===0){
    console.log(`Você escolheu par e o computador escolheu par. O resultado foi ${result}. Empate!`)
}else{
    console.log("Escolha um número entre 0 e 10")
}

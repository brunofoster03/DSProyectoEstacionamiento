let entrada = 1930
let salida = 0900
let parcial;
horas1 = 19
horas2 = 09
minutos1 = 30
minutos2 = 00

const calcular = () => {
    const sumar = () => {
        if(minutos1 == 30){
            horas1 += 2
            minutos1 = 00
        }
        if(minutos1 == 00){
            horas1 += 1
            minutos1 = 30
        }
        if(horas1 == 24){
            horas1 = 00
        }
        entrada = parseInt(horas1.toString() + minutos1.toString())
    }
    sumar()
    if(entrada == salida){
        console.log('fin')
    }else{
        sumar()
    }
}

calcular()
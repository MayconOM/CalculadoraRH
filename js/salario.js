function Calculadora(salarioBruto) {    

let inss= 0;

this.valorInss = function(){

    if(salarioBruto<=1302.00) {
        inss = salarioBruto*0.075;  
    }
    else if (salarioBruto<=2571.29) {
        inss = (1302.01*0.075) + ((salarioBruto - 1302.00)*0.09);
    } 
    else if (salarioBruto<=3856.94) {
        inss = (2571.30*0.09) + ((salarioBruto - 2571.30)*0.12); 
    } 
    else if (salarioBruto<=7507.49) {
        inss = (3856.95*0.12) + ((salarioBruto - 3856.95)*0.14); 
    } 
    else if (salarioBruto>7507.50) {
        inss = (7507.50*0.125) + ((salarioBruto - 7507.50)*0.14);    
    }

    return inss
}

let valIrrf = 0;

this.valorIrrf = function(){

    if(salarioBruto-inss<=1903.98) {
        valIrrf = 0;
    }
    else if(salarioBruto-inss>1904){
        valIrrf = (salarioBruto-inss) * 0.075 - 142.80;
    } 
    else if(salarioBruto-inss<=2826.65) {
        valIrrf = (salarioBruto-inss)*0.075 - 142.80;
    } 
    else if(salarioBruto-inss<=3751.05) {
        valIrrf = (salarioBruto-inss)*0.15 - 354.80;
    } 
    else if(salarioBruto-inss<=4664.68) {
        valIrrf = (salarioBruto-inss)*0.225 - 636.13;
    } 
    else if(salarioBruto-inss>4664.68) {
        valIrrf = (salarioBruto-inss)*0.275 - 869.36;
    }

    return valIrrf
}

this.salarioLiquido = function() {
    return salarioBruto - (valIrrf + inss);
}

let ferias = 0;
let tFerias = 0;

this.valorFerias = function() {
    ferias = ((salarioBruto / 30)*diasFerias);
    return ferias;
}

this.tercFerias = function() {
    tFerias = ferias / 3;
    return tFerias;
}

this.totalFerias = function() {
    salarioBruto = ferias + tFerias;
    this.valorInss();
    this.valorIrrf();
    ferias = salarioBruto - (inss + valIrrf);
    return ferias; 
}

this.valorDecimo = function() {
    salarioBruto = (salarioBruto/12)*mesDecimo;
    this.valorInss();
    this.valorIrrf();
    Decimo = salarioBruto  - (inss + valIrrf); 
    return Decimo;
}
let saldoSalario = 0;
let saldoDecimo = 0;
let fgts = 0;
let multaFgts = 0;
let totalRescisao = 0;

this.valorRescisao = function() {
    saldoSalario = (salarioBruto/30)*tempDias;
    saldoDecimo = (salarioBruto/12)*tempMes;
    fgts = ((salarioBruto*0.08)*tempTrab);
    multaFgts = fgts*0.40;

    let totaResc = saldoSalario+saldoDecimo+fgts+multaFgts;
    salarioBruto = totaResc;
    this.valorInss();
    this.valorIrrf();
    totalRescisao = salarioBruto - (inss+valIrrf);

    return totalRescisao;
}

}

function calcularSalario() {
    resultado = new Calculadora(salarioBruto = parseFloat(document.getElementById("salarioBruto").value));

    document.getElementById("inss").innerHTML = ("Desconto INSS: ") + resultado.valorInss().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });

    document.getElementById("irrf").innerHTML = ("Desconto IRRF: ") + resultado.valorIrrf().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });

    document.getElementById("resposta").innerHTML = ("Salário Líquido: ") + resultado.salarioLiquido().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });
}

function calcularFerias() {
    resultado = new Calculadora(
        salarioBruto = parseFloat(document.getElementById("salarioBruto").value),
        diasFerias = parseFloat(document.getElementById("diasFerias").value)
        );
    
    document.getElementById("respFerias").innerHTML = ("Férias: ") +  resultado.valorFerias().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });

    document.getElementById("tercoFerias").innerHTML = ("1/3 das Férias: ") + resultado.tercFerias().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });
    
    document.getElementById("totalFerias").innerHTML = ("Total à Receber: ") + resultado.totalFerias().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });

        document.getElementById("inss").innerHTML = ("Desconto INSS: ") + resultado.valorInss().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });
    
    document.getElementById("irrf").innerHTML = ("Desconto IRRF: ") + resultado.valorIrrf().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });

    
}

function calcularDecimo() {
    resultado = new Calculadora(
        salarioBruto = parseFloat(document.getElementById("salarioBruto").value),
        mesDecimo = parseFloat(document.getElementById("mesDecimo").value)
        );

    document.getElementById("resultDecimo").innerHTML = ("Décimo Total à Receber: ") + resultado.valorDecimo().toLocaleString('pt-BR', { 
            style: 'currency', currency: 'BRL' 
    });

    document.getElementById("inss").innerHTML = ("Desconto INSS: ") + resultado.valorInss().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });
    
    document.getElementById("irrf").innerHTML = ("Desconto IRRF: ") + resultado.valorIrrf().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });

}

function calcularRescisao() {
    resultado = new Calculadora(
        salarioBruto = parseFloat(document.getElementById("salarioBruto").value,
        tempDias = parseFloat(document.getElementById("tempDias").value),
        tempMes = parseFloat(document.getElementById("tempMes").value),
        tempTrab = parseFloat(document.getElementById("tempTrab").value)
        ));

    document.getElementById("totalResci").innerHTML = ("Total a receber: ") + resultado.valorRescisao().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });
    document.getElementById("inss").innerHTML = ("Desconto INSS: ") + resultado.valorInss().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });
    document.getElementById("irrf").innerHTML = ("Desconto IRRF: ") + resultado.valorIrrf().toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
    });
}
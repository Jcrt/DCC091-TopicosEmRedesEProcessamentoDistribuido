function AddInfo(_info, _array){

    const MAX_GRAPH_LEN = 20;
    
    if(!Array.isArray(_array)){
        alert("Objeto passado como parâmetro 2 da função AddInfo() não é um array! É obrigatório que este objeto seja um array");
        return;
    }

    if(_array.length > MAX_GRAPH_LEN){
        _array.shift();
    }

    if(String.trim(_info).length > 0){
        _array.push(_info);
    } 

    return _array;
}

function getRandomInt(){
    return Math.floor(((Math.random() * 10) % 10) + 1);
}

function RebuildPieChart(lectureNumbers, inDataArray, outDataArray){
   
    lectureNumbers.splice(0, 2);

    if(inDataArray.length > 0)
        lectureNumbers.push(inDataArray[inDataArray.length - 1]);

    if(outDataArray.length > 0)
        lectureNumbers.push(outDataArray[inDataArray.length - 1]);

    return lectureNumbers;
}

function CalcPeopleIn(inDataArray, outDataArray){
    var peopleIn = 0;
    var peopleOut = 0;

    if(Array.isArray(inDataArray) && inDataArray.length > 0)
        peopleIn = inDataArray[inDataArray.length - 1];
    
    if(Array.isArray(outDataArray) && outDataArray.length > 0)
        peopleOut = outDataArray[outDataArray.length - 1];

    return (peopleIn - peopleOut);
}

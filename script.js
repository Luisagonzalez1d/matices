/**
 * Crear matriz con n elementos
 * @param {number} length - Cantidad de elementos
 */
function createMatrix(length) {
	var newMatrix = new Array (length);
	for(var i = 0; i<length; i++) {
		newMatrix[i] = new Array (length);
	}
	return newMatrix;
};

/**
 * Transpuesta de una matriz
 * @param {*} matrix - Matriz
 */
function tranposer(matrix) {
	var newMatrix = createMatrix(matrix.length);
	for(var x = 0; x<matrix.length; x++) {
		for(var y = 0; y<matrix.length; y++) {
			newMatrix[y][x] = matrix[x][y]
		}
	}
	return newMatrix;
}

/**
 * Validar si dos elementos son igaules
 * @param {*} value1 - Primer valor a comparar
 * @param {*} value2 - Segundo valor a comparar
 */
function isEqual(value1, value2) {
    if (value1 instanceof Array && value2 instanceof Array) {
        if (value1.length!=value2.length)  {
            return false;
        }
            
        for(var i=0; i<value1.length; i++) {
            if (!isEqual(value1[i],value2[i])) {
                return false;
            }
        }     
        return true;
    }

    if(value1 instanceof Array && typeof value2 === "number") {
        for(var i=0; i<value1.length; i++) {
            if (!isEqual(value1[i],value2)) {
                return false;
            }
        }
        return true;
    }
    return value1 === value2
}

/**
 * Multiplicar matriz por una constante
 * @param {*} matrix - Matrix
 * @param {*} number - Constante
 */
function multiply (matrix, number) {
    var newMatrix = createMatrix(matrix.length);
	for(var x = 0; x<matrix.length; x++) {
		for(var y = 0; y<matrix.length; y++) {
			newMatrix[x][y] = ( matrix[x][y] !== 0 ) ? number * (matrix[x][y]) : 0
		}
	}
	return newMatrix;
}
/**
 * Validar si una matriz es simetrica
 * @param {*} matrix - Matriz
 */
function symmetrical (matrix) {
    return isEqual(matrix, tranposer(matrix))
}

/**
 * Obtener la diagonal de una matriz
 * @param {*} matrix - Matriz
 */
function diagonal (matrix) {
    var newVector = []
    for(var x = 0; x<matrix.length; x++) {
		for(var y = 0; y<matrix.length; y++) {
            if (x === y) {
                newVector.push(matrix[x][y])
            }
        }
    }
    return newVector;
}
/**
 * Validar si una matriz es reflexiva
 * @param {*} matrix - Matriz
 */
function reflexive (matrix) {
    return isEqual(diagonal(matrix),1);
}

/**
 * Validar is una matriz es irreflexiva
 * @param {*} matrix - Matriz
 */
function irreflexive (matrix) {
    return isEqual(diagonal(matrix),0);
}

/**
 * Validar si una matriz es antisimetrica
 * @param {*} matrix - Matriz
 */
function antisymmetric(matrix) {
   const transposerMatrix = tranposer(matrix);
   const tranposerMultiplyNegative = multiply(transposerMatrix, -1);
   return isEqual(matrix, tranposerMultiplyNegative)
}


/**
 * Evaluar las opciones de matrices
 * @param {*} matrix - Matriz
 */
function evaluate(matrix) {
    var results = {
        'Reflexiva': reflexive(matrix) ? 'Sí': 'No',
        'Irreflexiva': irreflexive(matrix) ? 'Sí': 'No',
        'Simetrica': symmetrical(matrix) ? 'Sí' : 'No',
        'Asimetrica': '',
        'Antisimetrica': antisymmetric(matrix) ? 'Sí' : 'No',
        'Transitiva': ''
    }
}


function execMatrix(){
    var matrixRef = document.getElementById('append');
    var matrix = createMatrix(matrixRef.childNodes.length)
    for (var x = 0; x < matrixRef.childNodes.length; x++) {
        for(var y = 0; y< matrixRef.childNodes[x].childNodes.length; y++) { 
            var value = matrixRef.childNodes[x].childNodes[y];
            var [xP, yP] = value.id.split('-');
            matrix[xP][yP] = Number(value.value);
        }
    }
    evaluate(matrix)
}

function create(e) {
    e.preventDefault();
    var matrixRef = document.getElementById('matrix');
    var appendRef = document.getElementById('append');
    var btnRef    = document.getElementById('btn-evaluate');
    btnRef.className = 'show'
    if (appendRef) {
        appendRef.remove();
    }
    var createAppend = document.createElement("div");
    createAppend.id = 'append';
    matrixRef.appendChild(createAppend);
    var matrixLength = document.getElementById('matrixLength').value;
    for(var x=0; x< matrixLength; x++) {
        var newDiv = document.createElement("div");
        for(var y=0; y< matrixLength; y++) {
            var newInput = document.createElement("input");
            newInput.type = "number";
            newInput.id = `${x}-${y}`
            newDiv.appendChild(newInput);
        }
        createAppend.appendChild(newDiv);
    }
    
}
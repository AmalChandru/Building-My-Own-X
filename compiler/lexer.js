const lexer = (code) => {
    const sourceCode = code + '\n';
    let currentCharacter = '';
    let currentPosition = -1;

    const lexerObject = {
    "sourceCode": sourceCode,
    "currentCharacter": currentCharacter,
    "currentPosition": currentPosition
    };

    while(peek(lexerObject) != '\0'){
        console.log(lexerObject.currentCharacter);
        nextCharacter(lexerObject);
    }
};

const peek = (_inputObject) => {
    if (_inputObject.currentPosition + 1 >= _inputObject.sourceCode.length){
        return '\0';
    };
    return _inputObject.sourceCode[_inputObject.currentPosition+1];
};

const nextCharacter = (_inputObject) => {
    _inputObject.currentPosition += 1;
    if (_inputObject.currentPosition >= _inputObject.sourceCode.length) {
        _inputObject.currentCharacter = '\0';
    } else {
        _inputObject.currentCharacter = _inputObject.sourceCode[_inputObject.currentPosition];
    };
};

lexer("LET foobar = 123");

const { tokenTypes } = require("./token-types-helper");

const lexer = (_code) => {
    const sourceCode = _code + '\n';
    let currentCharacter = '';
    let currentPosition = -1;

    const lexerObject = {
    "sourceCode": sourceCode,
    "currentCharacter": currentCharacter,
    "currentPosition": currentPosition
    };
    
    let tokenObject = getToken(lexerObject);
    while(tokenObject.tokenType != tokenTypes.get(-1)){
        if(tokenObject.tokenType == tokenTypes.get(301)){
        console.log('Unknown token');
        }
        console.log(tokenObject.tokenType);
        tokenObject = getToken(lexerObject)
    }
};

const getToken = (_lexerObject) => {
    let tokenObject = {
        "tokenText": _lexerObject.currentCharacter
    };
    skipSpace(_lexerObject);
    skipComments(_lexerObject);
    switch(_lexerObject.currentCharacter) {
        case '+':
            tokenObject.tokenType = tokenTypes.get(202);
            break;
        case '-':
            tokenObject.tokenType = tokenTypes.get(203);
            break;
        case '*':
            tokenObject.tokenType = tokenTypes.get(204);
            break;
        case '/':
            tokenObject.tokenType = tokenTypes.get(205);
            break;
        case '\n':
            tokenObject.tokenType = tokenTypes.get(0);
            break;
        case '\0':
            tokenObject.tokenType = tokenTypes.get(-1);
            break;
        case '=':
            if(peek(_lexerObject) == '='){
                tokenObject.tokenType = tokenTypes.get(206);
                nextCharacter(_lexerObject);
                break;
            } else {
                tokenObject.tokenType = tokenTypes.get(201);
                break;
            }
        case '>':
            if(peek(_lexerObject) == '='){
                tokenObject.tokenType = tokenTypes.get(211);
                nextCharacter(_lexerObject);
                break;
            } else {
                tokenObject.tokenType = tokenTypes.get(210);
                break;
            }
        case '<':
            if(peek(_lexerObject) == '='){
                tokenObject.tokenType = tokenTypes.get(209);
                nextCharacter(_lexerObject);
                break;
            } else {
                tokenObject.tokenType = tokenTypes.get(208);
                break;
            }
        case '!':
            if(peek(_lexerObject) == '='){
                tokenObject.tokenType = tokenTypes.get(207);
                nextCharacter(_lexerObject);
                break;
            } else {
                tokenObject.tokenType = tokenTypes.get(301);
                break;
            }
        case '\"':
            nextCharacter(_lexerObject);
            let startPosition = _lexerObject.currentPosition;
            while(_lexerObject.currentCharacter != '\"'){
                if(_lexerObject.currentCharacter == '\r' || _lexerObject.currentCharacter == '\n' || _lexerObject.currentCharacter == '\t' || _lexerObject.currentCharacter == '\\' || _lexerObject.currentCharacter == '%'){
                    tokenObject.tokenType = tokenTypes.get(301);
                    break;
                }
                nextCharacter(_lexerObject);
            }
            tokenObject.tokenText = _lexerObject.sourceCode.slice(startPosition,_lexerObject.currentPosition);
            tokenObject.tokenType = tokenTypes.get(3);
        default:
            tokenObject.tokenType = tokenTypes.get(301);
            break;
    }
    nextCharacter(_lexerObject);
    return tokenObject;
};

const nextCharacter = (_inputObject) => {
    _inputObject.currentPosition += 1;
    if (_inputObject.currentPosition >= _inputObject.sourceCode.length) {
        _inputObject.currentCharacter = '\0';
    } else {
        _inputObject.currentCharacter = _inputObject.sourceCode[_inputObject.currentPosition];
    };
};

const peek = (_inputObject) => {
    if (_inputObject.currentPosition + 1 >= _inputObject.sourceCode.length){
        return '\0';
    };
    return _inputObject.sourceCode[_inputObject.currentPosition+1];
};

const skipSpace = (_inputObject) => {
    if(_inputObject.currentCharacter == '' || _inputObject.currentCharacter == ' '){
        nextCharacter(_inputObject);
    }
};

const skipComments = (_inputObject) => {
    if (_inputObject.currentCharacter == '#') {
        while(_inputObject.currentCharacter != "\n"){
            nextCharacter(_inputObject);
        }
    };
};

lexer("+- \"This is a string\" # This is a comment!\n */");

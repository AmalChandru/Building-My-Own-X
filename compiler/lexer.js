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
    while(tokenObject.tokenType != tokenTypes.EOF){
        if(tokenObject.tokenType == tokenTypes.UKNWT){
        console.log('Unknown token');
        }
        console.log(tokenObject);
        tokenObject = getToken(lexerObject)
    }
};

const getToken = (_lexerObject) => {
    let tokenObject = {
        "tokenText": _lexerObject.currentCharacter
    };
    skipSpace(_lexerObject);
    switch(_lexerObject.currentCharacter) {
        case '+':
            tokenObject.tokenType = tokenTypes.PLUS;
            break;
        case '-':
            tokenObject.tokenType = tokenTypes.MINUS;
            break;
        case '*':
            tokenObject.tokenType = tokenTypes.ASTERISK;
            break;
        case '/':
            tokenObject.tokenType = tokenTypes.SLASH;
            break;
        case '\n':
            tokenObject.tokenType = tokenTypes.NEWLINE;
            break;
        case '\0':
            tokenObject.tokenType = tokenTypes.EOF;
            break;
        case '=':
            if(peek(_lexerObject) == '='){
                tokenObject.tokenType = tokenTypes.EQEQ;
                nextCharacter(_lexerObject);
                break;
            } else {
                tokenObject.tokenType = tokenTypes.EQ;
                break;
            }
        default:
            tokenObject.tokenType = tokenTypes.UKNWT;
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

lexer("+-=*/");

const tokenTypes = new Map([
	[ -1, 'EOF' ],     [ 0, 'NEWLINE' ],
	[ 1, 'NUMBER' ],   [ 2, 'IDENT' ],
	[ 3, 'STRING' ],   [ 101, 'LABEL' ],
	[ 102, 'GOTO' ],   [ 103, 'PRINT' ],
	[ 104, 'INPUT' ],  [ 105, 'LET' ],
	[ 106, 'IF' ],     [ 107, 'THEN' ],
	[ 108, 'ENDIF' ],  [ 109, 'WHILE' ],
	[ 110, 'REPEAT' ], [ 111, 'ENDWHILE' ],
	[ 201, 'EQ' ],     [ 202, 'PLUS' ],
	[ 203, 'MINUS' ],  [ 204, 'ASTERISK' ],
	[ 205, 'SLASH' ],  [ 206, 'EQEQ' ],
	[ 207, 'NOTEQ' ],  [ 208, 'LT' ],
	[ 209, 'LTEQ' ],   [ 210, 'GT' ],
	[ 211, 'GTEQ' ],   [ 301, 'UKNWT' ]
  ]);

module.exports = {
    tokenTypes: tokenTypes
}
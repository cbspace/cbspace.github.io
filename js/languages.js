// Stores langauge syntax in structs

const boundary_chars = ['.', ',', '(', ')', '[', ']','{', '}', ':', ';']

const python_lang = {
    imports: ['from', 'import', 'as'],
    keywords: ['class', 'def', 'return', 'if', 'for', 'in', 'not', 'or', 'and', 'assert',
                    'continue', 'del', 'elif', 'else', 'except', 'finally', 'global', 'lambda',
                    'nolocal', 'pass', 'raise', 'while', 'try', 'with', 'yield'],
    operators: ['=', '*', '/', ,'%', '+', '-', '|', '^', '<', '>', '&'],
    functions: ['int', 'str'],
    literals: ['True', 'False']
};
// Stores langauge syntax in structs

const boundary_chars = ['.', ',', '(', ')', '[', ']','{', '}', ':', ';']

const python_lang = {
    name: 'python',
    comments: ['#'],
    imports: ['from', 'import', 'as'],
    keywords: ['class', 'def', 'return', 'if', 'for', 'in', 'not', 'or', 'and', 'assert',
                    'continue', 'del', 'elif', 'else', 'except', 'finally', 'global', 'lambda',
                    'nolocal', 'pass', 'raise', 'while', 'try', 'with', 'yield'],
    operators: ['=', '*', '/', ,'%', '+', '-', '|', '^', '<', '>', '&'],
    functions: ['abs', 'aiter', 'all', 'anext', 'any', 'ascii', 'bin', 'bool', 'breakpoint', 
                'bytearray', 'bytes', 'callable', 'chr', 'classmethod', 'compile', 'complex', 
                'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec', 'filter', 
                'float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 'help', 
                'hex', 'id', 'input', 'int', 'isinstance', 'issubclass', 'iter', 'len', 'list', 
                'locals', 'map', 'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open', 
                'ord', 'pow', 'print', 'property', 'range', 'repr', 'reversed', 'round', 'set', 
                'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 
                'type', 'vars', 'zip', '__import__'],
    literals: ['True', 'False'], 
    definitions: ['def', 'class']
};

const cpp_lang = {
    name: 'cpp',
    comments: ['//'],
    imports: ['#include'],
    keywords: ['class', 'return', 'if', 'for', 'in', 'assert', 'continue', 'else', 'except', 
                'finally','while', 'try', 'with', 'int'],
    operators: ['=', '*', '/', ,'%', '+', '-', '|', '^', '<', '>', '&'],
    functions: [],
    literals: ['true', 'false'], 
    definitions: ['int', 'class']
};

const js_lang = {
    name: 'js',
    comments: ['//'],
    imports: ['import'],
    keywords: ['class', 'return', 'if', 'for', 'in', 'assert', 'continue', 'else', 'except', 
                'finally','while', 'try', 'with', 'int', 'function', 'let', 'var'],
    operators: ['=', '*', '/', ,'%', '+', '-', '|', '^', '<', '>', '&'],
    functions: ['parseInt'],
    literals: ['true', 'false'], 
    definitions: ['function', 'class']
};
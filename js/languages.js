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

// Need to fix comment operation for cpp, currenly using single slash
const cpp_lang = {
    name: 'cpp',
    comments: ['/'],
    imports: ['#include', 'using'],
    keywords: ['public:', 'private:', 'alignas', 'alignof', 'and', 'and_eq', 'asm', 'atomic_cancel', 
                'atomic_commit', 'atomic_noexcept', 'auto', 'bitand', 'bitor', 'bool', 'break', 'case', 
                'catch', 'char', 'char8_t', 'char16_t', 'char32_t', 'class', 'compl', 'concept', 'const', 
                'consteval', 'constexpr', 'constinit', 'const_cast', 'continue', 'co_await', 'co_return', 
                'co_yield', 'decltype', 'default', 'delete', 'do', 'double', 'dynamic_cast', 'else', 'enum', 
                'explicit', 'export', 'extern', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 
                'mutable', 'namespace', 'new', 'noexcept', 'not', 'not_eq', 'nullptr', 'operator', 'or', 'or_eq', 
                'private', 'protected', 'public', 'reflexpr', 'register', 'reinterpret_cast', 'requires', 'return', 
                'short', 'signed', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'synchronized', 
                'template', 'this', 'thread_local', 'throw', 'try', 'typedef', 'typeid', 'typename', 'union', 
                'unsigned', 'using', 'virtual', 'void', 'volatile', 'wchar_t', 'while', 'xor', 'xor_eq'],
    operators: ['=', '*', '%', '+', '-', '|', '^', '<', '>', '&', '{', '}', ':', '!'], // "/"
    functions: ['std', 'string', 'int', 'bool', 'void', 'vector', 'iostream', 'queue', 'memory', 'cout', 'endl', 
                'shared_ptr', 'unique_ptr', 'make_shared', 'make_unique', 'auto', 'break', 'continue'],
    literals: ['true', 'false'], 
    definitions: ['class', 'int','bool', 'void']
};

const js_lang = {
    name: 'js',
    comments: ['//'],
    imports: ['import'],
    keywords: ['class', 'return', 'if', 'for', 'in', 'assert', 'continue', 'else', 'except', 
                'finally','while', 'try', 'with', 'int', 'function', 'let', 'var'],
    operators: ['=', '*', '/', '%', '+', '-', '|', '^', '<', '>', '&'],
    functions: ['parseInt'],
    literals: ['true', 'false'], 
    definitions: ['function', 'class']
};
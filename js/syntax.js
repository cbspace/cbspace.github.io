////////////////////////////////////////////////
// Syntax Highlighting for Python code blocks //
////////////////////////////////////////////////

const ParserContext = Object.freeze({
    None:                 0,
    InStringSingleQuote:  1,
    InStringDoubleQuote:  2,
    InComment:            3
});

// Syntax highlighting for Python code blocks
// Need to use buffer as the browswer checks for
// HTML tag completion with each write
function syntax_highlight() {
    let lf = '\n';
    let context = ParserContext.None;
    let imports = ['from', 'import', 'as']
    let keywords = ['class', 'def', 'return', 'if', 'for', 'in', 'not', 'or', 'and', 'assert',
                    'continue', 'del', 'elif', 'else', 'except', 'finally', 'global', 'lambda',
                    'nolocal', 'pass', 'raise', 'while', 'try', 'with', 'yield']
    let operators = ['=', '*', '/', ,'%', '+', '-', '|', '^'] // Need to add <, >, &

    let code_block = document.getElementById('python');
    let lines = code_block.innerHTML.split(lf);
    let buffer = '';

    for (line_idx in lines) {
        let words = lines[line_idx].split(' ');

        for (word_idx in words) {
            let word = words[word_idx];

            if (imports.includes(word)) {
                if (context == ParserContext.None) {
                    buffer += '<import>' + word + '</import>';
                } else { 
                    buffer += word; 
                }
            } else if (keywords.includes(word)) {
                if (context == ParserContext.None) {
                    buffer += '<keyword>' + word + '</keyword>';
                } else { 
                    buffer += word; 
                }
            } else {
                for (char_idx in word) {
                    let char = word[char_idx];

                    // Look for operators
                    if (operators.includes(char)) {
                        if (context == ParserContext.None) {
                            buffer += '<operator>' + char + '</operator>';
                        } else {
                            buffer += char;
                        }
                    }
                    // Look for comment character
                    else if (char == '#') {
                        if (context == ParserContext.None) {
                            context = ParserContext.InComment;
                            buffer += '<comment>#';
                        } else {
                            buffer += char;
                        }
                    }
                    // Look for integer constants
                    else if (is_int(word, char_idx)) {
                        if (context == ParserContext.None) {
                            buffer += '<number>' + char + '</number>';
                        } else {
                            buffer += char;
                        }
                    }
                    // Look for strings 
                    else if (char == '\'') {
                         switch (context) {
                            case ParserContext.None:
                                context = ParserContext.InStringSingleQuote;
                                buffer += '<string>\'';
                                break;
                            case ParserContext.InStringSingleQuote: 
                                if (!(is_escaped(word, char_idx))) {
                                    context = ParserContext.None;
                                    buffer += '\'</string>';
                                } else {
                                    buffer += '\'';
                                }
                                break;
                            case ParserContext.InStringDoubleQuote:
                                buffer += '\'';
                                break;
                            default:
                                buffer += char;
                         }
                    } else if (char == '\"') {
                        switch (context) {
                            case ParserContext.None:
                                context = ParserContext.InStringDoubleQuote;
                                buffer += '<string>\"';
                                break;
                            case ParserContext.InStringDoubleQuote:
                               if (!(is_escaped(word, char_idx))) {
                                    context = ParserContext.None;
                                    buffer += '\"</string>';
                                } else {
                                   buffer += '\"';
                                }
                                break;
                            case ParserContext.InStringSingleQuote:
                                buffer += '\"';
                                break;
                            default:
                                    buffer += char;
                        }
                    } else {
                         buffer += char;
                    }
                }
            }
            buffer += ' ';
        }
        // Reset the context when we are in comment and reach end of line
        if (context == ParserContext.InComment) {
            context = ParserContext.None
            buffer += '</comment>';
        }
        buffer += lf;
    }
    code_block.innerHTML = buffer;
}

// Check if a character is escaped
function is_escaped(word, char_idx) {
    if (char_idx == 0) {
        return false;
    } else if (!(word[char_idx-1] == '\\')) {
        return false;
    }
    return true;
}

// Check if an integer or float is found
// Ensures previous character is not
// part of a variable name
function is_int(word, char_idx) {
    if (word[char_idx] == '.') {
        if (!(char_idx == 0)) {
            prev_char = word[char_idx-1];
            return !prev_char.match(/[a-z_)]/i);
        } else { return true; }
    }
    if (isNaN(word[char_idx])) {
        return false;
    }
    if (char_idx == 0) {
        return true
    } else {
        prev_char = word[char_idx-1];
        return !prev_char.match(/[a-z_]/i);
    }
}
////////////////////////////////////////////////
// Syntax Highlighting for Python code blocks //
////////////////////////////////////////////////

const ParserContext = Object.freeze({
    None: 0,
    InStringSingleQuote: 1,
    InStringDoubleQuote: 2
});

// Syntax highlighting for Python code blocks
// Need to use buffer as the browswer checks for
// HTML tag completion with each write
function syntax_highlight() {
    let lf = '\n';
    let context = ParserContext.None;
    let keywords = ['from', 'import', 'return']
    let declarations = ['class', 'def']
    let operators = ['=']

    let code_block = document.getElementById('python');
    let lines = code_block.innerHTML.split(lf);
    let buffer = '';

    for (line_idx in lines) {
        let words = lines[line_idx].split(' ');

        for (word_idx in words) {
            let word = words[word_idx];

            if (keywords.includes(word)) {
                if (context == ParserContext.None) {
                    buffer += '<keyword>' + word + '</keyword>';
                } else { 
                    buffer += word; 
                }
            } else if (declarations.includes(word)) {
                if (context == ParserContext.None) {
                    buffer += '<declaration>' + word + '</declaration>';
                } else { 
                    buffer += word; 
                }
            } else {
                for (char_idx in word) {
                    let char = word[char_idx];
                    
                    // Look for integer constants
                    if (is_int(word, char_idx)) {
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
                        }
                    } else {
                         buffer += char;
                    }
                }
            }
            buffer += ' ';
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
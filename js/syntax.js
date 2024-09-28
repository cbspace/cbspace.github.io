////////////////////////////////////////////////
// Syntax Highlighting for Python code blocks //
////////////////////////////////////////////////

const ParserContext = Object.freeze({
    None:                 0,
    InStringSingleQuote:  1,
    InStringDoubleQuote:  2,
    InComment:            3
});

// Set up language syntax and call highlighting function
// TODO: Scan the page for code blocks
function syntax_highlight() {
    code_block_language = 'python';
    element_id = 'python';

    if (code_block_language == 'python') {
        language = python_lang;
    }

    // Perform the syntax highlighting on code block named 'python'
    write_syntax_highlight(element_id, language);
}

// Syntax highlighting for code block 'element_id'
// Need to use buffer as the browswer checks for
// HTML tag completion with each write
function write_syntax_highlight(element_id, langauge) {
    let context = ParserContext.None;
    let code_block = document.getElementById(element_id);
    let lines = html_unescape(code_block.innerHTML).split('\n');
    let buffer = '';

    for (line_idx in lines) {
        let words = lines[line_idx].split(' ');

        for (word_idx in words) {
            let word = words[word_idx];

            if (langauge.imports.includes(word)) {
                if (context == ParserContext.None) {
                    buffer += '<import>' + word + '</import>';
                } else { 
                    buffer += word; 
                }
            } else if (langauge.keywords.includes(word)) {
                if (context == ParserContext.None) {
                    buffer += '<keyword>' + word + '</keyword>';
                } else { 
                    buffer += word; 
                }
            } else {
                for (char_idx in word) {
                    let char = word[char_idx];

                    // Look for operators
                    if (langauge.operators.includes(char)) {
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
        buffer += '\n';
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

// Convert html codes to characters
function html_unescape(str) {
    return str.replaceAll('&lt;','<')
              .replaceAll('&gt;','>')
              .replaceAll('&amp;','&')
              .replaceAll('&quot;','\"')
              .replaceAll('&#39;','\'')
              .replaceAll('&nbsp;',' ');
}
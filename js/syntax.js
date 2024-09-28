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
    let block_buffer = '';
    let line_buffer = '';

    for (line_idx in lines) {
        let words = lines[line_idx].split(' ');

        for (word_idx in words) {
            let word = words[word_idx];

            if (langauge.imports.includes(word)) {
                if (context == ParserContext.None) {
                    line_buffer += '<import>' + word + '</import>';
                } else { 
                    line_buffer += word; 
                }
            } else if (langauge.keywords.includes(word)) {
                if (context == ParserContext.None) {
                    line_buffer += '<keyword>' + word + '</keyword>';
                } else { 
                    line_buffer += word; 
                }
            } else {
                for (char_idx in word) {
                    let char = word[char_idx];

                    // Look for operators
                    if (langauge.operators.includes(char)) {
                        if (context == ParserContext.None) {
                            line_buffer += '<operator>' + char + '</operator>';
                        } else {
                            line_buffer += char;
                        }
                    }
                    // Look for comment character
                    else if (char == '#') {
                        if (context == ParserContext.None) {
                            context = ParserContext.InComment;
                            line_buffer += '<comment>#';
                        } else {
                            line_buffer += char;
                        }
                    }
                    // Look for integer constants
                    else if (is_int(word, char_idx)) {
                        if (context == ParserContext.None) {
                            line_buffer += '<number>' + char + '</number>';
                        } else {
                            line_buffer += char;
                        }
                    }
                    // Look for strings 
                    else if (char == '\'') {
                         switch (context) {
                            case ParserContext.None:
                                context = ParserContext.InStringSingleQuote;
                                line_buffer += '<string>\'';
                                break;
                            case ParserContext.InStringSingleQuote: 
                                if (!(is_escaped(word, char_idx))) {
                                    context = ParserContext.None;
                                    line_buffer += '\'</string>';
                                } else {
                                    line_buffer += '\'';
                                }
                                break;
                            case ParserContext.InStringDoubleQuote:
                                line_buffer += '\'';
                                break;
                            default:
                                line_buffer += char;
                         }
                    } else if (char == '\"') {
                        switch (context) {
                            case ParserContext.None:
                                context = ParserContext.InStringDoubleQuote;
                                line_buffer += '<string>\"';
                                break;
                            case ParserContext.InStringDoubleQuote:
                               if (!(is_escaped(word, char_idx))) {
                                    context = ParserContext.None;
                                    line_buffer += '\"</string>';
                                } else {
                                   line_buffer += '\"';
                                }
                                break;
                            case ParserContext.InStringSingleQuote:
                                line_buffer += '\"';
                                break;
                            default:
                                    line_buffer += char;
                        }
                    } else {
                        line_buffer += char;
                    }
                }
            }
            line_buffer += ' ';
        }
        // Reset the context when we are in comment and reach end of line
        if (context == ParserContext.InComment) {
            context = ParserContext.None
            line_buffer += '</comment>';
        }
        block_buffer += line_buffer + '\n';
        line_buffer = '';
    }
    code_block.innerHTML = block_buffer;
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
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
    let current_ident = '';

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
                for (i in word) {
                    let char_idx = parseInt(i);
                    let char = word[char_idx];

                    // Perform highlighting of functions and literals
                    if (context == ParserContext.None) {
                        if (is_name_char(char)) {
                            current_ident += char;
                        } else if (boundary_chars.includes(char)) {
                            line_buffer = update_for_identity(langauge, line_buffer, current_ident);
                            current_ident = '';
                        }
                    }
                    // Look for operators
                    if (langauge.operators.includes(char)) {
                        if (context == ParserContext.None) {
                            line_buffer = update_for_identity(langauge, line_buffer, current_ident);
                            current_ident = '';
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
                    } // Look for strings 
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
                line_buffer = update_for_identity(langauge, line_buffer, current_ident);
                current_ident = '';
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

// Boundary of an identity name is reached
// Returns the modified line buffer
function update_for_identity(langauge, line_buffer, current_ident) {
    if (!current_ident.length) { return line_buffer; }

    // Update buffer for function or literal keywords
    if (langauge.functions.includes(current_ident)) {
        let word_start = line_buffer.length - current_ident.length
        line_buffer = line_buffer.slice(0, word_start) + '<function>' + current_ident + '</function>';
    } else if (langauge.literals.includes(current_ident)) {
        let word_start = line_buffer.length - current_ident.length
        line_buffer = line_buffer.slice(0, word_start) + '<literal>' + current_ident + '</literal>';
    }

    return line_buffer;
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
// If character is a dot then ensure
// the next character is a number
function is_int(word, char_idx) {
    if (word[char_idx] == '.') {
        if (char_idx < word.length-1) {
            next_char = word[char_idx+1];
            return !isNaN(next_char);
        } else { return false; }
    }
    if (isNaN(word[char_idx])) {
        return false;
    }
    if (char_idx == 0) {
        return true
    } else {
        prev_char = word[char_idx-1];
        return !is_name_char(prev_char);
    }
}

// Char is a-z, A-Z, 0-9, or _
function is_name_char(str) {
    return !(str.match(/[a-z_]/i) === null)
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
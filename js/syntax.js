// Syntax highlighting for Python code blocks
function syntax_highlight() {
    var lf = '\n';
    var keywords = ['from', 'import', 'return']
    var declarations = ['class', 'def']
    var operators = ['=']

    var code_block = document.getElementById('python');
    var lines = code_block.innerHTML.split(lf);
    code_block.innerHTML = '';

    for (line_idx in lines) {
        words = lines[line_idx].split(' ');

        for (word_idx in words) {
            word = words[word_idx];

            if (keywords.includes(word)) {
                code_block.innerHTML += '<keyword>' + word + '</keyword>';
            } else if (declarations.includes(word)) {
                    code_block.innerHTML += '<declaration>' + word + '</declaration>';
            } else if (operators.includes(word)) {
                    code_block.innerHTML += '<operator>' + word + '</operator>';
            } else {
                code_block.innerHTML += word;
            }

            code_block.innerHTML += ' ';
        }
        code_block.innerHTML += lf;
    }
}
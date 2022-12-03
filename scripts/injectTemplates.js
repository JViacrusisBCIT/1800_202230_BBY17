// Injects the navbar, and footer into the HTML doc
function injectTemplates() {
    console.log($('#nav').load('../text/navTemplate.html'));
    console.log($('#foot').load('../text/footTemplate.html'));
}

// Calls the inject_navfoot function
injectTemplates();



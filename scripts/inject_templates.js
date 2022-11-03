// Injects the navbar, and footer into the HTML doc
function inject_templates() {
    console.log($('#nav').load('../text/nav_template.html'));
    console.log($('#foot').load('../text/foot_template.html'));
}

// Calls the inject_navfoot function
inject_templates();
var fs = require("fs");
var Handlebars = require("handlebars");

function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

function exportHTML() {
  var file = process.cwd() + '/resume.json';
  fs.readFile(file, function(err, resumeJson) {
    var resumeJson;
    if (err) {
      console.log(chalk.yellow('resume.json does not exist'));
      return;
    } else {
      resumeJson = JSON.parse(resumeJson);
    }
    var render = require(process.cwd() + '/index').render;
    fs.writeFileSync(process.cwd() + '/index.html', render(resumeJson));
  });
}

module.exports = {
	render: render,
  exportHTML: exportHTML,
};

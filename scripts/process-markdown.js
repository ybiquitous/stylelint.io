const fs = require("fs");
const glob = require("glob");
const remark = require("remark");
const frontmatter = require("remark-frontmatter");
const stylelintUrl = require("../plugins/remark-stylelint-url");
const stylelintPatternValidity = require("../plugins/remark-stylelint-pattern-validity");

const basedir = process.argv[2];
if (!basedir) {
  throw new Error("Missing basedir!");
}

const processor = remark()
  .use(frontmatter)
  .use(stylelintUrl)
  .use(stylelintPatternValidity);

glob.sync("/**/*.md", { root: basedir }).forEach(file => {
  const data = fs.readFileSync(file, "utf8");
  processor.process(data, (err, newData) => {
    if (err) throw err;
    fs.writeFileSync(file, newData);
  });
});

const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");

const basedir = process.argv[2];
if (!basedir) {
  throw new Error("Missing basedir!");
}

const extractTitleFromMarkdown = str => str.match(/\n?# ([^\n]+)\n/)[1];

// Copy /docs
fs.copySync("node_modules/stylelint/docs", basedir);

// Insert common frontmatter
glob.sync("/**/*.md", { root: basedir }).forEach(file => {
  const data = fs.readFileSync(file, "utf8");
  const title = extractTitleFromMarkdown(data);
  fs.writeFile(
    file,
    `---
title: ${title}
sidebar_label: ${title}
hide_title: true
---

${data}`
  );
});

// Copy rule READMEs
const rules = glob.sync("node_modules/stylelint/lib/rules/**/README.md");

// Create array of rules in a right order
const listOfRulesPath = `${basedir}/user-guide/rules.md`;
const ruleRegex = /(- *\[`.*?])/g;
let rulesInOrder = [];

fs.readFile(listOfRulesPath, "utf8", function(err, data) {
  if (err) throw err;

  rulesInOrder = data.match(ruleRegex);

  rulesInOrder = rulesInOrder.map(function(item) {
    return item.substring(item.indexOf("`") + 1, item.lastIndexOf("`"));
  });

  rules.forEach(function(file) {
    const fileName = path
      .dirname(file)
      .split("/")
      .pop();
    const rulePath = `${basedir}/user-guide/rules/${fileName}.md`;
    const ruleIndex = rulesInOrder.indexOf(fileName);
    const nextRuleName = rulesInOrder[ruleIndex + 1];
    const prevRuleName = rulesInOrder[ruleIndex - 1];
    let nextRulePath = null;
    let prevRulePath = null;

    if (nextRuleName) {
      nextRulePath = `/user-guide/rules/${nextRuleName}/`;
    }

    if (prevRuleName) {
      prevRulePath = `/user-guide/rules/${prevRuleName}/`;
    }

    fs.copySync(file, rulePath);

    fs.readFile(rulePath, "utf8", function(err, data) {
      if (err) throw err;

      fs.writeFile(
        rulePath,
        `---\nlayout: RulePage\nnext: ${nextRulePath}\nprev: ${prevRulePath}\n---\n\n` +
          data
      );
    });
  });
});

// Copy root files (README, CHANGELOG, VISION etc)
const rootFiles = glob.sync("node_modules/stylelint/*.md");
rootFiles.forEach(function(file) {
  const data = fs.readFileSync(file, "utf8");
  const title = file.endsWith("README.md")
    ? "Home"
    : extractTitleFromMarkdown(data);
  fs.writeFile(
    `${basedir}/${path.basename(file)}`,
    `---
title: ${title}
sidebar_label: ${title}
hide_title: true
---

${data}`
  );
});

// Rename main readme
fs.renameSync(`${basedir}/README.md`, `${basedir}/index.md`);

// Create demo.md
const demo = `---
title: Demo
description: Try stylelint in your browser
layout: DemoPage
---
`;
const demoPath = `${basedir}/demo`;
if (!fs.existsSync(demoPath)) {
  fs.mkdirSync(demoPath);
}
fs.writeFileSync(`${demoPath}/index.md`, demo);

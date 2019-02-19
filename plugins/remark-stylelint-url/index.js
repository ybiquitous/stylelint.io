/**
 * Remark plugin to process urls.
 *
 * Some links within the documentation need to be rewritten as the
 * directory structure is different between the github repo and the website
 */

const visit = require("unist-util-visit");

module.exports = function attacher() {
  function visitor(node) {
    // Only change relative or absolute urls
    if (!node.url.startsWith("http") && !node.url.startsWith("#")) {
      // Common URL replacements
      node.url = node.url
        // rule README paths as moved from src folder to within user-guide folder
        .replace("../../lib/rules/", "rules/")
        // rule README filename as now index.html
        .replace("/README", "")
        // Urls from within root markdown files (e.g. changelog and README) can
        // include path to "docs" directory, which is removed for the website
        .replace("docs/", "");
    }
  }

  return ast => visit(ast, "link", visitor);
};

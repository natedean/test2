System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  },
  "babelOptions": {
    "blacklist": [],
    "optional": [
      "runtime"
    ]
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.4.0",
    "bootstrap": "github:twbs/bootstrap@3.3.4",
    "lodash": "npm:lodash@3.9.3",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:twbs/bootstrap@3.3.4": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:lodash@3.9.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});


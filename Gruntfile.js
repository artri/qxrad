// requires
var util = require('util');
var qx = require("../../../../qooxdoo-4.0.1-sdk/tool/grunt");

// grunt
module.exports = function(grunt) {
  var config = {

    generator_config: {
      let: {
      }
    },

    common: {
      "APPLICATION" : "qxrad",
      "QOOXDOO_PATH" : "../../../../qooxdoo-4.0.1-sdk",
      "LOCALES": ["en"],
      "QXTHEME": "qxrad.theme.Theme"
    }

    /*
    myTask: {
      options: {},
      myTarget: {
        options: {}
      }
    }
    */
  };

  var mergedConf = qx.config.mergeConfig(config);
  // console.log(util.inspect(mergedConf, false, null));
  grunt.initConfig(mergedConf);

  qx.task.registerTasks(grunt);

  // grunt.loadNpmTasks('grunt-my-plugin');
};

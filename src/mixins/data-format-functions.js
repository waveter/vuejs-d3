import Vue from "vue";
import { REGEX_STRING_FORMAT_PATTERN } from "../constants/regex.js";

Vue.mixin({
  methods: {
    formatString(stringFormat, ...args) {
      return stringFormat.replace(REGEX_STRING_FORMAT_PATTERN, function(
        curlyBracket,
        index
      ) {
        return curlyBracket == "{{"
          ? "{"
          : curlyBracket == "}}"
          ? "}"
          : args[index];
      });
    }
  }
});

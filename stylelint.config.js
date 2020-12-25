module.exports = {
  "extends": ["stylelint-config-recommended"],
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "extends",
        "tailwind",
        "apply",
        "variants",
        "responsive",
        "screen",
      ]
    }],
    "declaration-block-trailing-semicolon": null,
    "block-no-empty": null,
    "declaration-block-no-duplicate-properties": null,
    "no-duplicate-selectors": null,
    "font-family-no-duplicate-names": null,
    "no-descending-specificity": null
  }
}
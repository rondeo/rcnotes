module.exports = {
    "extends": "airbnb",
    env: {
        browser: true,
    },
    settings: {
        "import/resolver": "webpack",
    },
    rules: {
        "import/extensions": false,
        "import/no-unresolved": false,
    }
};
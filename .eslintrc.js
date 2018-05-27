module.exports = {
    "extends": "airbnb",
    parser: "babel-eslint",
    env: {
        browser: true,
    },
    settings: {
        "import/resolver": "webpack",
    },
    rules: {
        "import/extensions": false,
        "array-callback-return": 0,
        "default-case": 0,
    }
};
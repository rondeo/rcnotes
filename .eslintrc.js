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
    }
};
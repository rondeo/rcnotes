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

        // react
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ]
        }],
        "react/sort-comp": [1, {
            order: [
                'static-methods',
                'lifecycle',
                'render',
                'everything-else'
            ]
        }]
    }
};
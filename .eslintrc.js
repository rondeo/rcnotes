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
        "no-plusplus": 0,
        "import/extensions": false,
        "array-callback-return": 0,
        "default-case": 0,
        "no-return-assign": 0,
        "no-restricted-syntax": 0,

        "jsx-a11y/label-has-for": 0,

        // react
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ]
        }],
        "react/sort-comp": [1, {
            order: [
                'constructor',
                'state',
                'instance-variables',
                'static-variables',
                'static-methods',
                'lifecycle',
                'render',
                'everything-else'
            ]
        }]
    }
};
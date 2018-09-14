module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        node: true
    },
    rules: {
        'semi' : 0,
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    }
}

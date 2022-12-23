module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                "> 1%",
                "last 105 versions",
                "not ie <= 8",
                "ios >= 8",
                "android >= 4.0"
            ]
        })
    ]
};
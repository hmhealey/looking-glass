module.exports = function(api) {
    api.cache.never();

    const presets = [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-react',
    ];

    const plugins = [
        '@babel/plugin-transform-async-to-generator',
        ['module-resolver', {root: ['./src', './node_modules']}],
        ['@babel/plugin-proposal-class-properties', {loose: false}],
    ];
    
    return {
        plugins,
        presets,
    };
};

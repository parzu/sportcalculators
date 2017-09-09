// module.exports = {
//   webpack: (config, { dev }) => {
//     // Perform customizations to webpack config
//     // config.module.loaders = [{
//     //     test: /\.css$/,
//     //     loader: 'style-loader!css-loader',
//     //     include: /flexboxgrid/
//     // }];
//     config.require.extensions['.css'] = () => {
//         return;
//     };
//     config.module.rules.push({ test: /\.css$/, loader: ['style-loader', 'css-loader'] });
//     // Important: return the modified config
//     return config
//   }
// }
export const clearCache = (watcher, regex) => {
    watcher.on('ready', () => {
        watcher.on('all', () => {
            console.log('Clearing server module cache from server');
            Object.keys(require.cache).forEach(id => {
                if (regex.test(id)) {
                    delete require.cache[id];
                }
            });
        });
    });
};

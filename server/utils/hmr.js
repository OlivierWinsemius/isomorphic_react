/* eslint-disable import/prefer-default-export */
export const clearCache = (watcher, regex) => {
    watcher.on('ready', () => {
        watcher.on('all', () => {
            console.clear();
            Object.keys(require.cache).forEach((id) => {
                if (regex.test(id)) {
                    delete require.cache[id];
                }
            });
        });
    });
};

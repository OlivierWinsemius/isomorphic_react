import * as React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import DispatchMonitor from 'redux-devtools-dispatch';
import MultipleMonitors from 'redux-devtools-multiple-monitors';

export default createDevTools(
    <DockMonitor
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
        defaultPosition="bottom"
        defaultIsVisible
    >
        <MultipleMonitors>
            <LogMonitor />
            <DispatchMonitor
                actionCreators={
                    {
                        // ...authActions,
                    }
                }
            />
        </MultipleMonitors>
    </DockMonitor>
);

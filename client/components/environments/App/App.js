import { useState } from 'react';

export default function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div>
            <span>You clicked {count} times</span>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}

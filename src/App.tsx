import React, { useState } from "react";
import Todo from "./components/Todo";
function App() {
    const [todos, setTodos] = useState([
        { index: 1, todo: "Sleep" },
        { index: 4, todo: "Study" },
    ]);

    return (
        <div>
            <Todo
                onSubmit={(newTodo) =>
                    setTodos([
                        ...todos,
                        { ...newTodo, index: todos.length + 1 },
                    ])
                }
                todos={todos}
                heading='TO-DO'
                onDelete={(index) =>
                    setTodos(todos.filter((e) => e.index != index))
                }
            ></Todo>
        </div>
    );
}

export default App;

import React, { FormEvent, useRef } from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    todo: z.string().min(1),
});

type TodoFormData = z.infer<typeof schema>;

const Div = styled.div`
    color: red;
    font-size: 2rem;
`;

const DivWidth = styled.div`
    width: 26.5rem;
`;
interface TodoList {
    index: number;
    todo: string;
}
interface Props {
    todos: TodoList[];
    onDelete: (index: number) => void;
    heading: string;
    onSubmit: (data: TodoFormData) => void;
}

function Todo({ todos, heading, onDelete, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<TodoFormData>({ resolver: zodResolver(schema) });

    return (
        <>
            <DivWidth>
                <div className='card'>
                    <div className='card-header p-3 ' key={heading}>
                        <div className='d-flex justify-content-center'>
                            <Div>
                                <AiOutlineCheckCircle />
                                {heading}
                            </Div>
                        </div>
                    </div>
                    {/* Input field to add to to-do list */}
                    <form
                        onSubmit={handleSubmit((data) => {
                            onSubmit(data);
                            reset();
                        })}
                    >
                        <div className='mb-3'>
                            <label
                                htmlFor='what'
                                className='d-flex justify-content-center p-3 m-2 font-monospace'
                            >
                                What Do you want to add to your TO-DO?
                            </label>
                            <div className='m-3'>
                                <input
                                    {...register("todo")}
                                    placeholder='to-do'
                                    id='what'
                                    type='text'
                                    className='form-control p-2'
                                />
                                {errors.todo && (
                                    <p className='text-danger'>
                                        {errors.todo.message}
                                    </p>
                                )}
                            </div>
                            <div className='d-grid gap-2 m-3'>
                                <button
                                    disabled={!isValid}
                                    className='btn btn-primary p-3  '
                                    type='submit'
                                >
                                    <BiBookAdd />
                                    ADD
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className='card-body'>
                        <div className='list-group '>
                            {todos.map((todos) => (
                                <>
                                    <div
                                        className='alert alert-light fade show alert-dismissible'
                                        role='alert'
                                        key={todos.todo}
                                    >
                                        {todos.todo}
                                        <button
                                            onClick={() =>
                                                onDelete(todos.index)
                                            }
                                            type='button'
                                            className='btn-close'
                                            aria-label='Close'
                                        ></button>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </DivWidth>
        </>
    );
}

export default Todo;

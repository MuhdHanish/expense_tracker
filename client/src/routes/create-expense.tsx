import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
            ) : null}
        </>
    );
};


export const Route = createFileRoute('/create-expense')({
    component: CreateExpense
});

function CreateExpense() {
    const form = useForm({
        defaultValues: {
            title: '',
            amount: 0,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })
    return (
        <div className="p-2">
            <h2>Create Expense</h2>
            <form className="max-w-xl m-auto"
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}

            >
                <form.Field
                    name="title"
                    children={(field) => {
                        return (
                            <>
                                <Label htmlFor={field.name}>Title</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <FieldInfo field={field} />
                            </>
                        )
                    }}
                />
                <form.Field
                    name="amount"
                    children={(field) => {
                        return (
                            <>
                                <Label htmlFor={field.name}>Amount</Label>
                                <Input
                                    id={field.name}
                                    type="number"
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(Number(e.target.value))}
                                />
                                <FieldInfo field={field} />
                            </>
                        )
                    }}
                />
                <Button className="mt-4" type="submit">Create Expense</Button>
            </form>
        </div>
    );
};
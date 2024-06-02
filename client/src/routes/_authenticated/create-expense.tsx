import { api } from "@/lib";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated/create-expense')({
    component: CreateExpense
});

function CreateExpense() {
    const naviagte = useNavigate();
    const form = useForm({
        defaultValues: {
            title: '',
            amount: 0,
        },
        onSubmit: async ({ value }) => {
            const response = await api.expenses.$post({ json: value });
            if (!response.ok) throw new Error("The server may be experiencing issues, Please try again later.");
            naviagte({ to: "/expenses" });
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
                                {field.state.meta.touchedErrors ? (
                                    <em>{field.state.meta.touchedErrors}</em>
                                ) : null}
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
                                {field.state.meta.touchedErrors ? (
                                    <em>{field.state.meta.touchedErrors}</em>
                                ) : null}
                            </>
                        )
                    }}
                />
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button className="mt-4" type="submit" disabled={!canSubmit}>
                            {isSubmitting ? '...' : 'Submit'}
                        </Button>
                    )}
                />
            </form>
        </div>
    );
};
import { Link } from "@tanstack/react-router";

export function NavBar() {
    return (
        <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>{" "}
            <Link to="/about" className="[&.active]:font-bold">
                About
            </Link>
            <Link to="/expenses" className="[&.active]:font-bold">
                Expenses
            </Link>
            <Link to="/create-expense" className="[&.active]:font-bold">
                Create
            </Link>
        </div>
    );
};
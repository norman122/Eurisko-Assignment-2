import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router";
import { TailwindCss } from "../components/pages/TailwindCss";
import { Layout } from "../components/layouts/layout";
import NotFound from "../components/pages/not-found.tsx";
import Login from "../components/pages/login.tsx"
import AuthRoute from "./AuthRoute.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<AuthRoute><Login /></AuthRoute>} />

            <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />

            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="dashboard" element={<TailwindCss />} />
            </Route>

            <Route path="/*" element={<NotFound />} />
        </>,
    ),
);

export default function Router() {
    return <RouterProvider router={router} />;
}  
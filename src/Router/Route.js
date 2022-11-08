import { createBrowserRouter } from "react-router-dom";
import Main from '../../src/Layout/Main'
import Home from "../Components/Home/Home/Home";
import ServiceDetails from "../Components/ServiceDetails/ServiceDetails";
import Services from "../Components/Services/Services";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/services',
                element: <Services></Services>,
                loader: () => fetch('http://localhost:5000/services')
            },
            {
                path: '/details/:id',
                element: <ServiceDetails></ServiceDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
            }
        ]
    }
])

export default router;

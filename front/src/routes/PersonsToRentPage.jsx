import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function PersonsToRentPage() {
    const [personToRent, setPeronToRent] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/employees")
            .then((response) => response.json())
            .then((json) => setPeronToRent(json))
    }, [])

    return (
        <>
            <h1>Person to rent</h1>
            <ul>
                {personToRent.map((person) => (
                    <li key={person.id} className={'bg-gray-300 mt-5 mx-auto'}>
                        <Link to={`/persons-to-rent/${person.id}`}>{person.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

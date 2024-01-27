import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import toTranslate from "@/utils/translate";

export default function PersonToRentPage() {
    const [person, setPerson] = useState(null);
    const params = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/employees/${params.id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setPerson(data);
            })
            .then(res => res.json())
            .then(data => {
                setPerson(data);
            })
    }, [])
    return (
        <div className={'ml-10 w-full'}>
            <h1>PersonToRentPage</h1>
            <br/>
            <p>Firstname : {person?.firstname}</p>
            <p>Lastname : {person?.lastname}</p>
            <p>Email : {person?.email}</p>
            <p>Phone: {person?.phone}</p>

            <div className={'mt-5'}>
                <Link to={'/persons-to-rent'} className={'btn'}>
                    {toTranslate('Return to the list')}
                </Link>
            </div>
        </div>
    )
}

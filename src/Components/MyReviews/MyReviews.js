import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import MyReviewsCard from './MyReviewsCard';

const MyReviews = () => {
    const { user } = useContext(AuthContext)
    const [myReviews, setMyReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/myReviews?email=${user?.email}`)
            .then(response => response.json())
            .then(data => setMyReviews(data))
    }, [])

    // for delete
    const handleDelete = id => {
        const proceed = window.confirm("Are you sure want to cancel this order?");
        if (proceed) {
            fetch(`http://localhost:5000/myReviews/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully');
                        const remaining = myReviews.filter(myRev => myRev._id !== id);
                        setMyReviews(remaining)
                    }
                })
        }
    }

    return (
        <div className="overflow-x-auto w-full my-12">
                <h2 className='text-2xl font-bold text-center mb-5'>My Review</h2>
                <table className="table mx-auto w-4/5 text-center mb-12">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email ID</th>
                            <th>Service name</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myReviews.map(myReview => <MyReviewsCard
                                key={myReview._id}
                                myReview={myReview}
                                handleDelete={handleDelete}
                            ></MyReviewsCard>)
                        }
                    </tbody>
                </table>
            </div>
    );
};

export default MyReviews;
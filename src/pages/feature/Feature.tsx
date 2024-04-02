import React, { useEffect, useState } from 'react'
import "./feature.scss"
import axios from 'axios';
export default function Feature() {
    const [hotelCounts, setHotelCounts] = useState([]);



    useEffect(() => {
        async function fetchHotelCounts() {
            try {
                const response = await axios.get('http://127.0.0.1:4000/api/v1/hotel/countByCity?cities=tphcm,hanoi,vungtau');
                setHotelCounts(response.data);

            } catch (error) {
                console.error('Error fetching hotel counts:', error);
            }
        }

        fetchHotelCounts();
    }, []);
    return (
        <div>
            <div className="featured">
                <>
                    <div className="featuredItem">
                        <img
                            src="https://cdn.tuoitre.vn/471584752817336320/2023/4/25/base64-16824135725928834051.png"
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Hồ Chí Minh</h1>
                            <h2>{hotelCounts.length >= 3 ? hotelCounts[0].count + ' properties' : 'No data'}</h2>
                        </div>
                    </div>

                    <div className="featuredItem">
                        <img
                            src="https://photo-cms-baophapluat.epicdn.me/w840/Uploaded/2024/athlraqhpghat/2023_06_25/ho-hoan-kiem-7185.jpg"
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Hà Nội</h1>
                            <h2>{hotelCounts.length >= 3 ? hotelCounts[1].count + ' properties' : 'No data'}</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img
                            src="https://qltt.vn/stores/news_dataimages/hanhnth3/012024/04/15/5522_Vuon-quoc-gia-Con-Dao-3.jpg?rt=20240104155523"
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Vũng Tàu</h1>
                            <h2>{hotelCounts.length >= 3 ? hotelCounts[2].count + ' properties' : 'No data'}</h2>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

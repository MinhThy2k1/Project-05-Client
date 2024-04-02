import React from 'react'
import { Link } from "react-router-dom";
import "./searchitem.scss"
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
export default function Searchitem({ }) {

    const hotelStore = useSelector((store: StoreType) => store.hotelStore)


    return (
        <div className="searchItem">
            <img src="" alt="" className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">{ }</h1>
                <span className="siDistance">{ }</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="siFeatures">upload sau</span>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="siDetails">
                <div className="siDetailTexts">
                    <span className="siPrice">${ }</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotel/`}>
                        <button className="siCheckButton">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
